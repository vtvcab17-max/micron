# Định dạng plugin Micron — `micron-plugin@1`

Một plugin là **một file JSON**, có thể chứa ba loại nội dung:

| Thành phần | Là gì | Xuất hiện ở đâu |
| --- | --- | --- |
| `nodes` | Ô AI dựng sẵn, prompt viết sẵn | Menu ＋ → “Từ plugin” |
| `templates` | Mẫu quy trình: nhiều ô nối dây sẵn | Menu ＋ → 📦 |
| `artifacts` | Ứng dụng nhỏ (HTML) chạy ngay trong một ô | Menu ＋ → 🧩; mở riêng hoặc tải `.html` |

```json
{
  "format": "micron-plugin@1",
  "id": "review-tai-nghe",
  "name": "Review tai nghe",
  "version": "1.0.0",
  "icon": "🎧",
  "author": "Tên bạn",
  "description": "Một – hai câu nói plugin giúp gì.",
  "nodes": [
    { "id": "kich-ban", "title": "Kịch bản 60 giây", "task": "text",
      "description": "Hook → 3 điểm → kết luận",
      "prompt": "Viết kịch bản review 60 giây về: {{input}}",
      "opts": { "temperature": 0.7 } }
  ],
  "templates": [
    { "id": "review", "title": "Review nhanh", "description": "Thông tin → kịch bản → đo thời lượng",
      "nodes": [
        { "key": "a", "type": "text", "text": "Tên tai nghe:\nGiá:\nĐiểm nổi bật:" },
        { "key": "b", "type": "ai", "ref": "kich-ban" },
        { "key": "c", "type": "artifact", "artifact": "dem-thoi-luong" }
      ],
      "edges": [["a", "b"], ["b", "c"]] }
  ],
  "artifacts": [
    { "id": "dem-thoi-luong", "title": "Đếm thời lượng", "height": 300,
      "description": "Ước tính thời lượng đọc",
      "html": "<!doctype html><html><head><meta charset='utf-8'></head><body>…</body></html>" }
  ]
}
```

## Quy tắc

- `id`: chữ thường không dấu, số, gạch nối. `version`: dạng `1.0.0`.
- `task`: `text` | `image` | `audio` | `video`. Ô sẽ tự chọn AI phù hợp trong “AI của tôi” của người dùng — plugin **không** chứa API key hay tên nhà cung cấp.
- Prompt dùng `{{input}}` để chèn kết quả của các ô nối vào. Không có `{{input}}` thì kết quả được đặt trước prompt.
- `opts` (tuỳ chọn): tham số nâng cao gửi kèm cho AI, ví dụ `{"size":"1536x1024"}`.
- Trong `templates`: ô `text` là điểm bắt đầu; ô `ai` dùng `ref` trỏ tới một ô trong `nodes` (hoặc tự ghi `title`, `task`, `prompt`); `edges` là các cặp `[từ, tới]`, chỉ trỏ tới ô `ai` hoặc `artifact`; vòng lặp bị bỏ qua.

## Artifact

Artifact là một trang HTML tự chứa, chạy trong khung **cách ly** (`sandbox="allow-scripts"`): không đọc được API key, dự án hay bộ nhớ của Micron. Micron tự chèn sẵn đối tượng `Micron`:

```js
Micron.onInput(function (d) {
  // d.text  : văn bản ghép từ các ô nối vào
  // d.files : [{ kind: 'image'|'audio'|'video', value: 'data:…' | 'https://…' }]
  Micron.send('text', 'kết quả');      // kind: text | image | audio | video
});
Micron.send('text', '…');   // cũng có thể tự gửi kết quả khi người dùng bấm nút trong artifact
```

- Artifact **phải** gọi `Micron.send(...)` mỗi lần nhận `onInput` (kể cả khi đầu vào trống); quá 20 giây Micron báo lỗi.
- Chiều cao khung tự co theo nội dung (tối đa 640px trong ô).
- Không dùng `alert`, `localStorage`, cookie, `window.open` (bị chặn trong khung cách ly).
- Giao diện gợi ý: nền `#12151b`, chữ `#e6e8ee`, màu nhấn `#7c5cff`, hiển thị tốt khi rộng 280px.

Giao thức gốc (khi không dùng đối tượng `Micron`): nhận `message` `{type:'micron:input', id, text, files}`, trả `parent.postMessage({type:'micron:output', id, kind, value}, '*')`, báo chiều cao bằng `{type:'micron:resize', height}`.

## Plugin trả phí (cửa hàng Bravinall)

Plugin trong cửa hàng được đội ngũ Bravinall đóng gói vào `plugins/catalog.json`. Bản có giá được **mã hoá AES-GCM**; khoá giải mã nằm trong **license** (ký số ECDSA P-256) mà khách nhận sau khi chuyển khoản. Mỗi license mở khoá **đúng một phiên bản**, dùng vĩnh viễn, không cần máy chủ.
