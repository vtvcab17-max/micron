"use strict";
const { contextBridge } = require("electron");
// Cho web biết đang chạy trong bản PC/macOS (ẩn nút "Cài ứng dụng", hiện nhãn nền tảng)
contextBridge.exposeInMainWorld("micronDesktop", { platform: process.platform, version: "1.0.0" });
