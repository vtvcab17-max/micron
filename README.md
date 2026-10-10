<p align="center">
  <img src="assets/brand/micron-logo-light.svg#gh-light-mode-only" alt="Micron" height="64">
  <img src="assets/brand/micron-logo-dark.svg#gh-dark-mode-only" alt="Micron" height="64">
</p>

<p align="center"><b>Canvas AI mở: bạn mang AI của mình, Micron nối chúng thành quy trình sáng tạo.</b><br>
Một sản phẩm của <b>Bravinall</b>.</p>

---

Micron là một không gian làm việc dạng canvas, giống Canva hay TopView, nhưng **không cài sẵn AI nào**. Bạn tự thêm AI bằng API key riêng hoặc dùng AI chạy trên máy, đặt các ô lên canvas, nối chúng bằng dây rồi bấm **Chạy**. Ví dụ một chuỗi: viết kịch bản → tạo ảnh → tạo giọng đọc → tạo nhạc.

## Dùng ngay

- **Online:** https://vtvcab17-max.github.io/micron/
- **Offline:** tải file `index.html` về rồi mở bằng Chrome hoặc Edge. Không cần cài đặt, không cần máy chủ.

## Tính năng

- **Dự án** dạng lưới thẻ: tạo, đổi tên, nhân bản, xoá, xuất và nhập file `.micron.json`.
- **Canvas ô + dây:** kéo nền để di chuyển, cuộn chuột để thu phóng. Kéo từ chấm ● đầu ra:
  - thả lên một ô AI để nối vào ô đó;
  - thả ra chỗ trống để mở **bảng chọn AI** ngay tại chỗ, ô mới được tạo và tự nối dây.
- **Các loại ô:** AI Văn bản / Ảnh / Âm thanh / Video, Ô văn bản, Ô tải tệp. Dùng `{{input}}` trong prompt để chèn kết quả của ô phía trước.
- **Chạy tất cả:** chạy cả chuỗi theo đúng thứ tự nối.

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

Logo và biểu tượng nằm trong thư mục [`assets/brand/`](assets/brand/), gồm bản SVG cho nền sáng/tối, bản một màu và các file PNG.

| Màu | Mã | Dùng cho |
| --- | --- | --- |
| Violet | `#7C5CFF` | Màu nhận diện chính |
| Violet strong | `#6447F0` | Nút chính |
| Indigo | `#4F5BFF` | Chuyển màu trong biểu tượng |
| Cyan | `#2FD4E8` | Chấm cổng “node” |
| Ground | `#0E1016` | Nền tối |

Font chữ: **Space Grotesk** (tiêu đề), **Be Vietnam Pro** (giao diện), **JetBrains Mono** (mã).

## Lộ trình

- [ ] Ô ghép video theo timeline
- [ ] Hỗ trợ API dạng “gửi yêu cầu rồi chờ kết quả” (video)
- [ ] Bản full-stack: tài khoản, đồng bộ dự án, backend trung gian để tránh lỗi CORS

---
© 2026 Bravinall
