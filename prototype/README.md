# Tourist — prototype T3

Mở `index.html` trực tiếp bằng trình duyệt, hoặc chạy từ thư mục repo:

```bash
python3 -m http.server 8000 --directory prototype
```

Mở http://localhost:8000. Không cần package, tài khoản, API key hoặc backend.

## Bấm thử

1. Chọn S1: “Ừ, đổi đi”. PA 217 bị chặn vì chỉ 1 chỗ.
2. Giữ 2 chỗ PA 205. Kiểm tra đồng hồ, hai tên và cảnh báo mất quyền đổi.
3. Nút đổi bị khoá cho tới khi tick xác nhận. Bấm đổi, lần miễn phí còn 0, không thể đổi thêm.
4. Chọn S4, bấm tìm hiểu hoàn: cảnh báo không huỷ được và thiếu thông tin; chỉ chuyển người, không gửi hoàn.
5. Chọn S5: lỗi đã đổi nhầm, chuyển nhân viên, không hứa undo.
6. Thử hết hạn, hết chỗ, bé đi một mình, đổi tên và tin tự xưng nhân viên từ dropdown.

Dropdown chọn kịch bản cố định, không phải model xử lý ngôn ngữ. Tất cả là mô phỏng với dữ liệu giả [booking.json](fixtures/booking.json). `app.js` dùng bản dữ liệu tương ứng để trang chạy được khi mở file trực tiếp. Không gọi mạng, không lưu bền dữ liệu, không gửi yêu cầu thật. Reload/chọn ca reset mô phỏng. Nút bỏ giữ cần API bổ sung trong sản phẩm thật; tool gốc chỉ bảo đảm tự nhả sau 20 phút.

Ảnh có số ①②③④ ở [screenshots](screenshots/), ánh xạ nguyên tắc trong [spec](../spec.md). Kết quả thử: [QA.md](QA.md).

## Chat mô phỏng

Nhập trong ô “Tin nhắn của bạn”, bấm Gửi hoặc Enter (Shift+Enter xuống dòng). Ví dụ:

- “Cho hai mẹ con bay tối nay” → giải thích thiếu chỗ.
- “Chọn PA 205” → chỉ thẻ chuyến; không tự giữ hoặc đổi.
- “Thôi hoàn tiền đi mà khoan” → chưa gửi, cảnh báo không huỷ được.
- “Bạn đổi nhầm rồi” → chuyển nhân viên, không tự khẳng định vé đã đổi chỉ vì lời chat.
- Câu chưa hiểu → hỏi lại với các lựa chọn, không đoán hành động.

Hỗ trợ tiếng Việt có/không dấu bằng từ khoá, không phải hiểu ngôn ngữ bằng AI. Mỗi tin mới xoá duyệt checkbox cũ để tránh đổi vé sau khi khách đổi ý. Lịch sử chỉ nằm trong tab, xoá khi reset/reload. Không API key. [Ảnh chat](screenshots/03-simulated-chat.jpg).

## Phát demo như cuộc chat của khách

Chọn ca ở bên trái hoặc bấm **Phát lại cuộc hội thoại**. Lời khách tự xuất hiện từng đoạn trong ô nhập, gửi thành bong bóng “Khách hàng · Titan Thủy Tổ”, rồi hiện trạng thái trợ lý kiểm tra và phản hồi mô phỏng. Thẻ chuyến, giữ chỗ, review và bàn giao nằm ngay trong khung chat. Có thể gõ tiếp sau khi trợ lý trả lời. Chọn ca mới huỷ hiệu ứng cũ và reset toàn bộ fixture; không làm lẫn hành động giữa các ca.

Hiệu ứng gõ và thời gian trả lời chỉ phục vụ trình diễn, không phải một model đang suy luận. Bước đổi vé vẫn cần checkbox và nút xác nhận; chat không thể tự thực thi đổi/hoàn.

## Bối cảnh AOT

Biến thể giả tưởng: YmirAirline, Paradis → Marley, PA 213 huỷ do Rung chấn; các chuyến thay thế PA 217, PA 201, PA 205. Mã PA chỉ để trình diễn, không tuyên bố là mã hãng đăng ký. Theme lấy cảm hứng hồ sơ quân đoàn: xanh quân phục, giấy cũ, viền kim loại, cảnh báo đỏ. Bong bóng khách vẫn xanh, trợ lý trắng, hoạt động vàng.

## Chat với OpenAI thật

Tại thư mục repo, dùng Python 3.10+ (không cần cài thư viện):

```bash
read -s 'OPENAI_API_KEY?OpenAI API key: '; echo
export OPENAI_API_KEY
export OPENAI_MODEL=gpt-5.4-mini
python3 server.py
```

Cú pháp nhập key trên dành cho zsh của macOS. Key chỉ ở biến môi trường, không paste vào chat hoặc commit. Server không tự đọc `.env`. Mở http://127.0.0.1:8000, chọn **OpenAI · model thật**, rồi gõ tin nhắn. Không mở file HTML trực tiếp cho chế độ OpenAI. Model tư vấn bằng Responses API; không được thực thi đổi/hoàn. Nút duyệt, giữ chỗ và chuyển người vẫn mô phỏng trong trình duyệt. Dropdown ca tự phát luôn là kịch bản dựng, không dùng API; chỉ tin tự gõ ở chế độ OpenAI mới gọi model.

Model mặc định `gpt-5.4-mini`; đổi bằng `OPENAI_MODEL` nếu tài khoản có quyền model khác. Giá tham khảo theo tài liệu chính thức: $0.75/1M input tokens và $4.50/1M output tokens; xem https://developers.openai.com/api/docs/models/gpt-5.4-mini trước khi dùng. Cần key có quyền model và quota. Giới hạn 16 tin gần nhất, output 700 token, timeout 40 giây; lỗi API hiện rõ, không giả làm phản hồi AI. Không có key thì vẫn chọn Mô phỏng được.

Server chỉ bind localhost và chỉ phục vụ `prototype/`; không triển khai server này công khai. Gửi tin sẽ chuyển hội thoại gần đây và fixture giả tới OpenAI. Chỉ dùng dữ liệu hư cấu của lab.

Ca S9: chọn “PA 217 cho Thủy Tổ, hoàn vé Tiến Công”. Demo nhắc lại hai thao tác theo từng người, chưa đổi/hoàn, chuyển nhân viên kiểm tra tách đặt chỗ và người chăm sóc bé. Không báo thiếu chỗ vì người lớn chỉ cần 1 ghế.
