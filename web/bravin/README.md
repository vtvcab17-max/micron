# Micron ↔ Bravin

Kết nối được viết theo **Bravin Plugin & Extension SDK (API v1)**. Gồm hai phần:

## 1. Plugin “Micron AI” chạy bên trong Bravin (`bravin/plugin/`)
Plugin dùng AI của chính người dùng (Claude, OpenAI-compatible, Gemini) để làm việc ngay trên timeline:
- **✍️ Chữ:** viết các dòng chữ chạy, kịch bản 60 giây, tiêu đề mở đầu, caption + hashtag. Bấm *Đặt lên timeline* để tạo từng clip chữ nối tiếp nhau từ đầu phát, thời lượng mỗi clip tính theo tốc độ đọc. Có thể lấy chữ đang có trên timeline làm ngữ cảnh.
- **🖼 Ảnh:** tạo ảnh rồi đưa vào Thư viện hoặc đặt lên timeline làm lớp phủ. Nút *Gợi ý từ khung hình* chụp khung đang xem rồi nhờ AI đề xuất prompt.
- **🔊 Giọng:** tạo giọng đọc từ chữ trên timeline hoặc từ clip đang chọn, rồi đặt lên timeline.
- **Menu chuột phải:**
  - *Micron: viết lại chữ này* (trên một clip)
  - *Micron: viết lại các chữ đã chọn* (khi chọn nhiều clip)
  - *Micron: viết caption từ timeline*

Mọi thay đổi trên timeline đều hoàn tác được bằng **Ctrl+Z**. Khoá API lưu trong `storage` riêng của plugin.

**Quyền:** `timeline.read`, `timeline.write`, `media.import`, `project.read`, `ui`, `network`. Mạng chỉ được gọi tới `api.anthropic.com`, `api.openai.com`, `generativelanguage.googleapis.com`, `openrouter.ai`, `api.groq.com`, `api.deepseek.com`.

**Cách cài:**
- **Từ link** (Tiện ích → Từ link): `https://vtvcab17-max.github.io/micron/bravin/plugin/manifest.json`
- **Link chia sẻ:** `https://<bravin>/#plugin=https%3A%2F%2Fvtvcab17-max.github.io%2Fmicron%2Fbravin%2Fplugin%2Fmanifest.json`. Trong Micron, mục ③ Bravin có sẵn nút **Cài vào Bravin** làm việc này.
- **Gói một file:** `python3 tools/pack_plugin.py bravin/plugin` (công cụ có trong SDK Bravin).

## 2. Extension Chrome/Edge “Micron ↔ Bravin” (`bravin/extension/`, bản đóng gói: `micron-bravin-extension.zip`)
Extension này phát triển từ extension mẫu của đội Bravin:
- Trên trang Micron, nút **🎬 Gửi sang Bravin** dưới mỗi kết quả (ảnh, âm thanh, video) sẽ gửi qua extension sang tab Bravin (mở tab mới nếu chưa có), gọi `hello` rồi `media.import`. Có thể chọn đặt luôn lên timeline và cho ảnh làm lớp phủ.
- Chuột phải vào video, ảnh, âm thanh hoặc link trên mọi trang → **Gửi sang Bravin**, giống extension mẫu.
- Extension chỉ nhận yêu cầu từ trang Micron mà người dùng đã khai trong Tuỳ chọn, và chỉ những phương thức có trong cầu nối: `hello`, `app.info`, `media.import`, `openLink`, `media.list`, `timeline.addMedia`, `plugin.install`.

**Cài đặt:** `chrome://extensions` → bật *Chế độ dành cho nhà phát triển* → *Tải tiện ích đã giải nén* → vào *Tuỳ chọn*, nhập địa chỉ Bravin và địa chỉ Micron → *Lưu và cấp quyền* → tải lại trang Micron.

**Không cài extension:**
- Kết quả có link https: Micron mở `https://<bravin>/#import=<link>`.
- Kết quả là tệp trên máy: Micron tải tệp về và mở Bravin để người dùng kéo tệp vào.

**Bravin bản Windows/Android** không nhận cầu nối từ trình duyệt. Trên các bản này hãy dùng plugin Micron AI, hoặc tải tệp về rồi kéo vào.
