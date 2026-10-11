const $ = id => document.getElementById(id);
const DEFAULT_MICRON = "https://vtvcab17-max.github.io/micron/";
chrome.storage.sync.get(["bravinUrl", "micronUrl", "mode"]).then(v => {
  $("u").value = v.bravinUrl || ""; $("mu").value = v.micronUrl || DEFAULT_MICRON; $("m").value = v.mode || "link";
});
const parse = s => { const u = new URL(s.trim()); if (!/^https?:$/.test(u.protocol)) throw 0; if (!u.pathname.endsWith("/") && !/\.[a-z]+$/i.test(u.pathname)) u.pathname += "/"; return u; };
$("s").onclick = async () => {
  let b, m;
  try { b = parse($("u").value); } catch (_) { $("st").textContent = "Địa chỉ Bravin không hợp lệ."; return; }
  try { m = parse($("mu").value || DEFAULT_MICRON); } catch (_) { $("st").textContent = "Địa chỉ Micron không hợp lệ."; return; }
  const ok = await chrome.permissions.request({ origins: [b.origin + "/*", m.origin + "/*"] });
  if (!ok) { $("st").textContent = "Cần cấp quyền truy cập trang Bravin và Micron."; return; }
  await chrome.storage.sync.set({ bravinUrl: b.href, micronUrl: m.href, mode: $("m").value });
  $("st").textContent = "Đã lưu. Tải lại trang Micron (F5) để bắt đầu gửi sang Bravin.";
};
