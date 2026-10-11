/* Chạy trên trang Micron (world riêng của extension). Chỉ chuyển tiếp yêu cầu từ chính trang Micron
   (không nhận từ khung artifact hay trang khác) sang extension → Bravin. */
(() => {
  const ready = () => {
    if (document.documentElement) document.documentElement.dataset.micronBravin = "1";
    window.postMessage({ micronBravin: "ready", v: 1 }, location.origin);
  };
  ready();
  addEventListener("DOMContentLoaded", ready);
  addEventListener("message", e => {
    if (e.source !== window || e.origin !== location.origin) return;
    const m = e.data;
    if (!m || typeof m !== "object") return;
    if (m.micronBravin === "ping") { ready(); return; }
    if (m.micronBravin !== "call" || !m.id) return;
    const reply = r => window.postMessage({ micronBravin: "res", id: m.id, ok: !!(r && r.ok), result: r && r.result, error: r && r.error }, location.origin);
    chrome.runtime.sendMessage({ type: "micron->bravin", method: m.method, params: m.params || {} })
      .then(reply, err => reply({ ok: false, error: { code: "extension", message: String((err && err.message) || err) } }));
  });
})();
