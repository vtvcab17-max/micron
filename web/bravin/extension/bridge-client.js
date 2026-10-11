/* Tiêm vào TRANG BRAVIN (world MAIN) bằng chrome.scripting.executeScript.
   Nói chuyện với Bravin qua cầu nối window.postMessage — Bravin PLUGIN_SDK v1, mục "Cầu nối extension". */
function bravinBridgeCall(ext, method, params) {
  return new Promise(function (resolve) {
    var id = Math.random().toString(36).slice(2), t = setTimeout(function () { done({ ok: false, error: { code: "timeout", message: "Bravin không trả lời" } }); }, 120000);
    function done(m) { clearTimeout(t); removeEventListener("message", h); resolve({ ok: !!m.ok, result: m.result, error: m.error }); }
    function h(e) { var m = e.data; if (e.source === window && m && m.bravin === "bridge-res" && m.id === id) done(m); }
    addEventListener("message", h);
    postMessage({ bravin: "bridge", v: 1, id: id, ext: ext, method: method, params: params || {} }, location.origin);
  });
}
/* hello trước (lần đầu Bravin hỏi người dùng có cho phép không), rồi gọi phương thức cần dùng */
async function bravinRun(ext, method, params) {
  var hi = await bravinBridgeCall(ext, "hello");
  if (!hi.ok || method === "hello") return hi;
  return bravinBridgeCall(ext, method, params);
}
