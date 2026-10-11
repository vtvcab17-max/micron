// Micron cho PC (Windows) và macOS — vỏ Electron quanh đúng bản web trong ../web
"use strict";
const { app, BrowserWindow, protocol, net, session, shell } = require("electron");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

// Khi đã đóng gói, thư mục web nằm trong resources/web; khi phát triển thì là ../web
const WEB = app.isPackaged ? path.join(process.resourcesPath, "web") : path.join(__dirname, "..", "web");
const ORIGIN = "app://micron";

// app:// là nguồn an toàn (secure context): IndexedDB, crypto.subtle (kiểm tra license), fetch đều chạy
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true, stream: true } },
]);

if (!app.requestSingleInstanceLock()) app.quit();

let win = null;
function createWindow() {
  win = new BrowserWindow({
    width: 1400, height: 900, minWidth: 900, minHeight: 600,
    title: "Micron", backgroundColor: "#0E1016",
    icon: path.join(__dirname, "build", "icon.png"),
    titleBarStyle: process.platform === "darwin" ? "hiddenInset" : "default",
    webPreferences: { preload: path.join(__dirname, "preload.js"), contextIsolation: true, sandbox: true, spellcheck: false },
  });
  // Link ngoài (Bravin, trang hướng dẫn…) mở bằng trình duyệt mặc định của máy
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url)) shell.openExternal(url);
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (e, url) => {
    if (!url.startsWith(ORIGIN)) { e.preventDefault(); if (/^https?:/i.test(url)) shell.openExternal(url); }
  });
  win.loadURL(ORIGIN + "/index.html");
}

app.on("second-instance", () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });

app.whenReady().then(() => {
  // Phục vụ thư mục web qua app://micron/…
  protocol.handle("app", req => {
    let p = decodeURIComponent(new URL(req.url).pathname);
    if (!p || p === "/") p = "/index.html";
    const file = path.normalize(path.join(WEB, p));
    if (!file.startsWith(WEB)) return new Response("Không tìm thấy", { status: 404 });
    return net.fetch(pathToFileURL(file).toString());
  });

  // Bản PC tự gỡ rào CORS: gọi thẳng Ollama, LM Studio, ComfyUI trên máy (không cần OLLAMA_ORIGINS
  // hay --enable-cors-header) và cả các API chưa bật CORS cho trình duyệt.
  const isLocal = u => /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?(\/|$)/i.test(u);
  const ses = session.defaultSession;
  ses.webRequest.onBeforeSendHeaders((d, cb) => {
    const h = d.requestHeaders;
    if (isLocal(d.url)) for (const k of Object.keys(h)) if (/^(origin|referer)$/i.test(k)) delete h[k];
    cb({ requestHeaders: h });
  });
  ses.webRequest.onHeadersReceived((d, cb) => {
    if (!/^https?:/i.test(d.url) || d.resourceType === "mainFrame") return cb({});
    const h = { ...(d.responseHeaders || {}) };
    const has = k => Object.keys(h).some(x => x.toLowerCase() === k);
    if (!has("access-control-allow-origin")) h["Access-Control-Allow-Origin"] = ["*"];
    if (!has("access-control-allow-headers")) h["Access-Control-Allow-Headers"] = ["*"];
    if (!has("access-control-allow-methods")) h["Access-Control-Allow-Methods"] = ["GET, POST, PUT, PATCH, DELETE, OPTIONS"];
    if (isLocal(d.url)) h["Access-Control-Allow-Private-Network"] = ["true"];
    if (d.method === "OPTIONS" && d.statusCode >= 400) return cb({ responseHeaders: h, statusLine: "HTTP/1.1 204 No Content" });
    cb({ responseHeaders: h });
  });

  createWindow();
  app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
