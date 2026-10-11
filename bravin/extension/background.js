"use strict";
/* Micron ↔ Bravin
   1) Trang Micron (micron-content.js) gửi yêu cầu → extension tìm/mở tab Bravin → gọi cầu nối Bravin.
   2) Chuột phải vào video / ảnh / âm thanh / link trên mọi trang → Gửi sang Bravin (như extension mẫu). */
const EXT = { id: "com.bravinall.micron-bravin", name: "Micron ↔ Bravin" };
const MENU = "micron-gui-sang-bravin";
const ALLOWED = ["hello", "app.info", "media.import", "openLink", "media.list", "timeline.addMedia", "plugin.install"];
const fail = (code, message) => ({ ok: false, error: { code, message } });

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({ id: MENU, title: "Gửi sang Bravin", contexts: ["video", "audio", "image", "link"] });
  await syncContentScript();
  const { bravinUrl } = await chrome.storage.sync.get("bravinUrl");
  if (!bravinUrl) chrome.runtime.openOptionsPage();
});
chrome.runtime.onStartup.addListener(syncContentScript);
chrome.storage.onChanged.addListener(c => { if (c.micronUrl) syncContentScript(); });

/* Gắn micron-content.js vào đúng trang Micron người dùng đã khai (và đã cấp quyền) */
async function syncContentScript() {
  try { await chrome.scripting.unregisterContentScripts({ ids: ["micron"] }); } catch (_) {}
  const { micronUrl } = await chrome.storage.sync.get("micronUrl");
  if (!micronUrl) return;
  const origin = new URL(micronUrl).origin;
  if (!(await chrome.permissions.contains({ origins: [origin + "/*"] }))) return;
  await chrome.scripting.registerContentScripts([{ id: "micron", matches: [origin + "/*"], js: ["micron-content.js"], runAt: "document_start" }]);
}

/* Tìm tab Bravin (mở mới nếu chưa có), đưa lên trước và chờ Bravin sẵn sàng */
async function bravinTab() {
  const { bravinUrl = "" } = await chrome.storage.sync.get("bravinUrl");
  if (!bravinUrl) { chrome.runtime.openOptionsPage(); throw Object.assign(new Error("Chưa nhập địa chỉ Bravin — mở Tuỳ chọn của extension Micron ↔ Bravin."), { code: "not_configured" }); }
  const origin = new URL(bravinUrl).origin;
  const tabs = await chrome.tabs.query({ url: origin + "/*" }).catch(() => []);
  let tab = tabs.find(t => t.url && t.url.startsWith(bravinUrl)) || tabs[0];
  if (!tab) tab = await chrome.tabs.create({ url: bravinUrl, active: true });
  await chrome.tabs.update(tab.id, { active: true });
  if (tab.windowId != null) chrome.windows.update(tab.windowId, { focused: true }).catch(() => {});
  for (let i = 0; i < 60; i++) {
    try {
      const [r] = await chrome.scripting.executeScript({ target: { tabId: tab.id }, func: () => document.documentElement.dataset.bravin === "1" });
      if (r && r.result) return tab;
    } catch (_) {}
    await new Promise(r => setTimeout(r, 500));
  }
  throw Object.assign(new Error("Bravin chưa sẵn sàng (đã chờ 30 giây). Kiểm tra địa chỉ Bravin trong Tuỳ chọn."), { code: "timeout" });
}
async function callBravin(method, params) {
  const tab = await bravinTab();
  await chrome.scripting.executeScript({ target: { tabId: tab.id }, world: "MAIN", files: ["bridge-client.js"] });
  const [res] = await chrome.scripting.executeScript({ target: { tabId: tab.id }, world: "MAIN", func: (e, m, p) => bravinRun(e, m, p), args: [EXT, method, params || {}] });
  return (res && res.result) || fail("unknown", "Không nhận được phản hồi từ Bravin");
}

/* Yêu cầu từ trang Micron */
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || msg.type !== "micron->bravin") return;
  if (msg.method === "ext.ping") { sendResponse({ ok: true, result: { version: chrome.runtime.getManifest().version } }); return; }
  if (!ALLOWED.includes(msg.method)) { sendResponse(fail("bad_params", "Phương thức không được hỗ trợ: " + msg.method)); return; }
  callBravin(msg.method, msg.params).then(sendResponse, e => sendResponse(fail(e.code || "error", e.message || String(e))));
  return true;
});

/* Chuột phải → Gửi sang Bravin (giữ nguyên hành vi của extension mẫu) */
chrome.contextMenus.onClicked.addListener(async info => {
  if (info.menuItemId !== MENU) return;
  const url = info.srcUrl || info.linkUrl || info.pageUrl;
  const { bravinUrl = "", mode = "link" } = await chrome.storage.sync.get(["bravinUrl", "mode"]);
  if (!bravinUrl) { chrome.runtime.openOptionsPage(); return; }
  const origin = new URL(bravinUrl).origin;
  const tabs = await chrome.tabs.query({ url: origin + "/*" }).catch(() => []);
  if (!tabs.length) { chrome.tabs.create({ url: bravinUrl.replace(/#.*$/, "") + "#import=" + encodeURIComponent(url) }); return; }
  let r;
  try { r = await callBravin(mode === "import" ? "media.import" : "openLink", { url }); } catch (e) { r = fail(e.code || "error", e.message); }
  if (r && !r.ok) {
    chrome.action.setBadgeText({ text: "!" }); chrome.action.setTitle({ title: "Bravin: " + (r.error && r.error.message) });
    setTimeout(() => { chrome.action.setBadgeText({ text: "" }); chrome.action.setTitle({ title: "Micron ↔ Bravin" }); }, 6000);
  }
});
