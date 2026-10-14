<p align="center">
  <img src="web/assets/brand/micron-logo-light.svg#gh-light-mode-only" alt="Micron" height="64">
  <img src="web/assets/brand/micron-logo-dark.svg#gh-dark-mode-only" alt="Micron" height="64">
</p>

<p align="center"><b>Canvas AI mở: bạn mang AI của mình, Micron nối chúng thành quy trình sáng tạo.</b><br>
Kèm chợ extension và plugin cho trình dựng video Bravin.</p>

<p align="center">
  <a href="https://micron.vtvcab17.workers.dev/"><b>🌐 Mở Micron trên web</b></a> ·
  <a href="https://github.com/vtvcab17-max/micron/releases/latest"><b>⬇ Tải bản cài</b></a> ·
  <a href="https://bravinall.vtvcab17.workers.dev/micron.html">Trang giới thiệu</a>
</p>

---

## Làm được gì

- **Canvas AI**: đặt các ô (văn bản, ảnh, âm thanh, video, tải tệp), nối dây, bấm **▶ Chạy tất cả**. Kết quả ô trước tự chèn vào ô sau qua `{{input}}`.
- **AI của bạn**: thêm bằng API key (Claude, OpenAI, Gemini…) hoặc AI chạy trên máy (Ollama, LM Studio, ComfyUI). Micron không cài sẵn AI nào.
- **Chợ Extensions & Plugins**: mẫu quy trình, ô AI, plugin cho Bravin (có Motion Tracking miễn phí). Plugin trả phí mua một lần, license chạy offline.
- **Gửi sang Bravin**: ảnh, giọng đọc, video bay thẳng vào timeline.
- **Mọi thiết bị**: Web, Windows, macOS, Android, iPad.

Dự án, API key và license chỉ lưu trên thiết bị của bạn.

## Bắt đầu trong 3 bước

1. Mở Micron → **⚙ AI của tôi** → thêm AI của bạn.
2. Bấm **＋ Dự án mới**, thêm ô và nối dây.
3. Bấm **▶ Chạy tất cả**.

## Cài đặt

**Trên web:** mở [micron.vtvcab17.workers.dev](https://micron.vtvcab17.workers.dev/) bằng Chrome, Edge hoặc Safari, rồi bấm **⬇ Cài ứng dụng**. Trên iPad/iPhone: *Chia sẻ → Thêm vào Màn hình chính*.

**Bản cài:** [Releases mới nhất](https://github.com/vtvcab17-max/micron/releases/latest) có một tệp zip gồm Windows, macOS, Android, iPad và bản Web.

| Thiết bị | Cách cài nhanh |
|---|---|
| Windows 10/11 | Chạy `Micron-Setup-….exe` |
| macOS | Mở `.dmg` (`arm64` cho chip Apple, `x64` cho chip Intel), kéo Micron vào Applications |
| Android 7+ | Mở tệp `.apk` |
| iPad / iPhone | Dùng bản web, hoặc ký tệp `.ipa` |

Hướng dẫn chi tiết từng thiết bị (cảnh báo SmartScreen, Mac chưa ký, sideload iPad…): **[HUONG-DAN-CAI-DAT.md](HUONG-DAN-CAI-DAT.md)**.

> [!TIP]
> Bản PC/macOS gọi được AI chạy trên máy mà không cần chỉnh CORS.

## Mã nguồn

```
web/       ứng dụng (nguồn chung cho mọi nền tảng)
desktop/   Windows & macOS (Electron)
mobile/    Android & iPad (Capacitor)
.github/   build tự động + "Đóng gói tất cả" → Releases
```

Chỉ cần sửa trong `web/`. Mỗi lần đẩy code lên `main`, Cloudflare tự cập nhật bản web (`wrangler.json`) và GitHub Actions tự build lại các bản cài.

Chạy thử bản web trên máy:

```bash
cd web
python3 -m http.server 8080    # mở http://localhost:8080
```

## Hệ sinh thái Bravinall

| Ứng dụng | Dùng để | Mở ngay |
|---|---|---|
| [Antifact](https://github.com/vtvcab17-max/Antiface) | Thiết kế, chỉnh ảnh | [antiface.vtvcab17.workers.dev](https://antiface.vtvcab17.workers.dev/) |
| [Bravin](https://github.com/vtvcab17-max/Bravin) | Dựng video | [bravin.vtvcab17.workers.dev](https://bravin.vtvcab17.workers.dev/) |
| **Micron** | Canvas AI, plugin cho Bravin | [micron.vtvcab17.workers.dev](https://micron.vtvcab17.workers.dev/) |
| [Micow](https://github.com/vtvcab17-max/Micow) | Làm nhạc trên máy | [micow.vtvcab17.workers.dev](https://micow.vtvcab17.workers.dev/) |

---

<p align="center">© 2026 Phạm Việt Hà · <a href="https://bravinall.vtvcab17.workers.dev/">Bravinall</a></p>
