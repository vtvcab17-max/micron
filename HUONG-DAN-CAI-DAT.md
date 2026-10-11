# Micron: hướng dẫn cài đặt

Gói này chứa Micron cho mọi thiết bị. Mỗi thư mục là một nền tảng.

| Thư mục | Dành cho | Cách cài |
| --- | --- | --- |
| `Windows/` | PC Windows 10/11 | Chạy `Micron-Setup-….exe` rồi bấm Tiếp. Hoặc giải nén file `.zip` và chạy `Micron.exe` (không cần cài). Nếu Windows hiện cảnh báo SmartScreen: bấm *Thêm thông tin → Vẫn chạy*. |
| `macOS/` | Mac chip Apple (M1–M4): file `…-arm64.dmg` · Mac chip Intel: file `…-x64.dmg` | Mở file `.dmg`, kéo **Micron** vào **Applications**. Lần đầu: chuột phải vào Micron → *Mở* → *Mở*, vì app chưa được Apple ký. |
| `Android/` | Điện thoại, máy tính bảng Android 7 trở lên | Chép file `.apk` vào máy rồi mở. Cho phép *Cài ứng dụng không rõ nguồn gốc* khi máy hỏi. |
| `iPad-iOS/` | iPad / iPhone | **Cách nhanh:** mở bản web bằng Safari → Chia sẻ → *Thêm vào Màn hình chính*. **Cách cài app:** file `.ipa` chưa ký, cần ký bằng Apple ID qua [Sideloadly](https://sideloadly.io) (miễn phí, ký lại sau 7 ngày) hoặc bằng tài khoản Apple Developer. |
| `Web/` | Mọi trình duyệt | Đưa thư mục lên máy chủ bất kỳ (Cloudflare, GitHub Pages, Netlify), hoặc mở `index.html` bằng Chrome/Edge. |
| `Bravin/` | Trình dựng video Bravin | `plugin-Micron-AI/`: plugin chạy trong Bravin (Tiện ích → cài từ link hoặc đóng gói bằng `pack_plugin.py`). `micron-bravin-extension.zip`: extension Chrome/Edge để gửi kết quả từ Micron sang Bravin. Xem `Bravin/README.md`. |
| `Ma-nguon/` | Lập trình viên | Toàn bộ mã nguồn: web, PC/macOS (Electron), Android/iPad (Capacitor). |

## Sau khi cài
1. Mở Micron → **⚙ AI của tôi** → thêm AI bằng API key của bạn (Claude, OpenAI, Gemini…) hoặc AI chạy trên máy (Ollama, LM Studio, ComfyUI).
2. Bấm **＋ Dự án mới**, thêm ô và nối dây, rồi bấm **▶ Chạy tất cả**.
3. Vào **🧩 Extensions & Plugins** để cài thêm mẫu quy trình, ô AI và artifact.

**Bản PC/macOS** gọi được AI chạy trên máy mà không cần chỉnh CORS.
Dự án, API key và license chỉ lưu trên thiết bị của bạn. Hãy bấm **Sao lưu license** nếu bạn đã mua plugin.

© 2026 Bravinall
