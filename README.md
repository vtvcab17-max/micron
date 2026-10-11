<p align="center">
  <img src="web/assets/brand/micron-logo-light.svg#gh-light-mode-only" alt="Micron" height="64">
  <img src="web/assets/brand/micron-logo-dark.svg#gh-dark-mode-only" alt="Micron" height="64">
</p>

<p align="center"><b>Canvas AI mở: bạn mang AI của mình, Micron nối chúng thành quy trình sáng tạo.</b><br>
Một sản phẩm của <b>Bravinall</b>.</p>

---

Micron là một không gian làm việc dạng canvas, giống Canva hay TopView, nhưng **không cài sẵn AI nào**. Bạn tự thêm AI bằng API key riêng hoặc dùng AI chạy trên máy, đặt các ô lên canvas, nối chúng bằng dây rồi bấm **Chạy**. Ví dụ một chuỗi: viết kịch bản → tạo ảnh → tạo giọng đọc → tạo nhạc.

## Dùng ngay

- **Online:** https://vtvcab17-max.github.io/micron/
- **Cài như ứng dụng (PWA):** mở link trên bằng Chrome/Edge rồi bấm **⬇ Cài ứng dụng** (hoặc biểu tượng cài trên thanh địa chỉ). Trên iPhone: Safari → Chia sẻ → *Thêm vào Màn hình chính*. Sau khi mở lần đầu, Micron chạy được cả khi mất mạng (riêng việc gọi AI vẫn cần mạng, trừ AI chạy trên máy).
- **Dùng file:** tải `web/index.html` về rồi mở bằng Chrome hoặc Edge (chế độ này không cài được thành ứng dụng).

## Chạy trên mọi thiết bị

| Nền tảng | Cách có Micron | Ghi chú |
| --- | --- | --- |
| 🌐 **Web** (mọi trình duyệt) | `web/`: GitHub Pages hoặc Cloudflare (`npm run deploy`) | Cài được như ứng dụng (PWA), chạy offline |
| 🪟 **PC Windows** | **Actions → PC & macOS** → `Micron-Windows` (bộ cài `.exe` hoặc `.zip` giải nén chạy ngay) | Gọi thẳng AI trên máy (Ollama, LM Studio, ComfyUI) không cần chỉnh CORS |
| 🍎 **macOS** | **Actions → PC & macOS** → `Micron-macOS` (`.dmg` cho chip Apple và Intel) → kéo Micron vào Applications | Lần đầu: chuột phải → *Mở* (app chưa ký Apple) |
| 🤖 **Android (APK)** | Tab **Actions → Android APK** → tải `Micron-Android-APK` | Cho phép “cài từ nguồn không xác định” khi cài |
| 📱 **iPad / iPhone** | Safari → Chia sẻ → *Thêm vào Màn hình chính* (dùng ngay) · hoặc **Actions → iPad / iOS** → `.ipa` chưa ký | `.ipa` cần ký bằng Apple ID (Sideloadly/AltStore) hoặc tài khoản Apple Developer |

Cấu trúc repo:
```
web/        bản web: nguồn chung cho mọi nền tảng
desktop/    vỏ Electron cho Windows & macOS   (npm run desktop · desktop: npm run pack:win / pack:mac)
mobile/     vỏ Capacitor cho Android & iPad   (mobile: npm run android:apk · npm run ios:open trên máy Mac)
.github/workflows/  build APK (Android) và .ipa (iPad/iOS) tự động trên GitHub
wrangler.json       cấu hình Cloudflare (chỉ đưa thư mục web/ lên)
```
Chỉ cần sửa trong `web/`. Các bản PC, Mac, Android, iPad đều lấy lại từ `web/` khi build.

## Tính năng

- **Dự án** dạng lưới thẻ: tạo, đổi tên, nhân bản, xoá, xuất và nhập file `.micron.json`.
- **Canvas ô + dây:** kéo nền để di chuyển, cuộn chuột để thu phóng. Kéo từ chấm ● đầu ra:
  - thả lên một ô AI để nối vào ô đó;
  - thả ra chỗ trống để mở **bảng chọn AI** ngay tại chỗ, ô mới được tạo và tự nối dây.
- **Các loại ô:** AI Văn bản / Ảnh / Âm thanh / Video, Ô văn bản, Ô tải tệp. Dùng `{{input}}` trong prompt để chèn kết quả của ô phía trước.
- **Chạy tất cả:** chạy cả chuỗi theo đúng thứ tự nối.

## 🧩 Extensions & Plugins — cho Bravin & Artifact

Bấm **🧩 Extensions & Plugins** ở trang chủ, hoặc **🧩 Plugin** trong dự án. Khu vực này có hai phần:

**① Cửa hàng Bravinall:** plugin do đội ngũ Bravinall làm.
- Plugin miễn phí: bấm *Cài đặt* là dùng được ngay.
- Plugin trả phí: bấm *Mua*, quét **mã QR ngân hàng** (số tiền và nội dung đã điền sẵn), gửi ảnh giao dịch kèm mã đơn, rồi nhận **mã license**.
- **Mua 1 lần, dùng vĩnh viễn đúng phiên bản đã mua.** License có chữ ký số và hoạt động offline, không cần đăng nhập hay máy chủ.
- Nên *Sao lưu license* để khôi phục khi đổi máy.

**② Do AI của bạn tạo:** mô tả plugin bạn cần, AI của bạn (Claude, Gemini, OpenAI, Ollama…) sẽ dựng **mẫu quy trình**, **ô AI** và **artifact** (ứng dụng nhỏ chạy trong ô). Bạn có thể sửa bằng AI hoặc sửa JSON, xuất file để chia sẻ, nhập file của người khác.

Plugin cài xong sẽ nằm trong menu **＋** ở mục *Từ plugin* (có ô tìm kiếm), và cũng xuất hiện khi bạn kéo dây ra chỗ trống. Artifact chạy trong khung cách ly nên không đọc được API key hay dự án của bạn.

| Plugin có sẵn | Giá | Nội dung |
| --- | --- | --- |
| 📱 Review Công Nghệ Pro | 99.000đ | Thông số, ưu/nhược, kịch bản 60s, caption, thumbnail, so sánh A vs B, đồng hồ kịch bản + teleprompter |
| 🛒 Bravin Bán Hàng | 149.000đ | USP, 3 mẫu quảng cáo, livestream 15 phút, tin nhắn chốt đơn, banner, lịch 7 ngày, máy tính giá bán |
| ⚡ Khởi đầu nhanh | Miễn phí | Tóm tắt, viết lại, dịch, tiêu đề, bài đăng, đếm ký tự mạng xã hội |
| 🎵 Nhạc AI — Lời & phong cách | Miễn phí | Lời bài hát có cấu trúc, mô tả phong cách, chuyển sang AI tạo nhạc |

Muốn tự viết plugin? Xem [web/docs/PLUGIN-FORMAT.md](web/docs/PLUGIN-FORMAT.md).

### ③ Bravin: kết nối với trình dựng video Bravin
- **Plugin “Micron AI” chạy trong Bravin:** viết chữ rồi đặt thẳng lên timeline, tạo ảnh lớp phủ, tạo giọng đọc, chuột phải để viết lại chữ trên clip.
- **Extension “Micron ↔ Bravin”:** nút **🎬 Gửi sang Bravin** dưới mỗi kết quả của Micron đưa ảnh, giọng đọc hoặc video thẳng vào Thư viện hoặc timeline của Bravin.
- Chi tiết xem [web/bravin/README.md](web/bravin/README.md).

## AI hỗ trợ (bạn tự thêm trong “⚙ AI của tôi”)

| Loại kết nối | Dùng cho | Ví dụ |
| --- | --- | --- |
| OpenAI-compatible | Văn bản, ảnh, giọng đọc | OpenAI, OpenRouter, Groq, DeepSeek, LM Studio, Ollama `/v1` |
| Anthropic Claude | Văn bản (đọc được ảnh) | `claude-sonnet-5-5`, `claude-haiku-5-5`, `claude-opus-5-5` |
| Google Gemini | Văn bản, ảnh | các model Gemini |
| Ollama | Văn bản (chạy trên máy) | `llama`, `qwen`… |
| ComfyUI | Ảnh, nhạc, video (chạy trên máy) | Flux, MiniMax Music 3, ACE-Step, Wan… |
| HTTP tuỳ chỉnh | Bất kỳ API nào | API nhạc, video, giọng nói của các hãng |

**Bảo mật:** API key và dự án chỉ lưu trong trình duyệt của bạn (localStorage và IndexedDB). Key chỉ được gửi tới đúng địa chỉ AI mà bạn nhập.

### Lưu ý khi dùng AI chạy trên máy
- **Ollama:** đặt biến môi trường `OLLAMA_ORIGINS=*` rồi khởi động lại Ollama.
- **LM Studio:** bật *Enable CORS* trong phần Server.
- **ComfyUI:** chạy với `--enable-cors-header "*"`. Lấy workflow bằng *Save (API Format)*, rồi thay chữ prompt bằng `{{prompt}}` và giá trị seed bằng `"{{seed}}"`.

## Bộ nhận diện

Logo và biểu tượng nằm trong thư mục [`web/assets/brand/`](web/assets/brand/), gồm bản SVG cho nền sáng/tối, bản một màu và các file PNG.

| Màu | Mã | Dùng cho |
| --- | --- | --- |
| Violet | `#7C5CFF` | Màu nhận diện chính |
| Violet strong | `#6447F0` | Nút chính |
| Indigo | `#4F5BFF` | Chuyển màu trong biểu tượng |
| Cyan | `#2FD4E8` | Chấm cổng “node” |
| Ground | `#0E1016` | Nền tối |

Font chữ: **Space Grotesk** (tiêu đề), **Be Vietnam Pro** (giao diện), **JetBrains Mono** (mã).

## Lộ trình

- [x] Khu vực Extensions & Plugins (cửa hàng + plugin do AI tạo)
- [ ] Ô ghép video theo timeline
- [ ] Hỗ trợ API dạng “gửi yêu cầu rồi chờ kết quả” (video)
- [ ] Bản full-stack: tài khoản, đồng bộ dự án, backend trung gian để tránh lỗi CORS

---
© 2026 Bravinall
