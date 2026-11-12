# Tourist — prototype T3

Mở `index.html` trực tiếp bằng trình duyệt, hoặc chạy từ thư mục repo:

```bash
python3 -m http.server 8000 --directory prototype
```

Mở http://localhost:8000. Không cần package, tài khoản, API key hoặc backend.

## Bấm thử

1. Chọn S1: “Ừ, đổi đi”. BM 217 bị chặn vì chỉ 1 chỗ.
2. Giữ 2 chỗ BM 205. Kiểm tra đồng hồ, hai tên và cảnh báo mất quyền đổi.
3. Nút đổi bị khoá cho tới khi tick xác nhận. Bấm đổi, lần miễn phí còn 0, không thể đổi thêm.
4. Chọn S4, bấm tìm hiểu hoàn: cảnh báo không huỷ được và thiếu thông tin; chỉ chuyển người, không gửi hoàn.
5. Chọn S5: lỗi đã đổi nhầm, chuyển nhân viên, không hứa undo.
6. Thử hết hạn, hết chỗ, bé đi một mình, đổi tên và tin tự xưng nhân viên từ dropdown.

Dropdown chọn kịch bản cố định, không phải model xử lý ngôn ngữ. Tất cả là mô phỏng với dữ liệu giả [booking.json](fixtures/booking.json). `app.js` dùng bản dữ liệu tương ứng để trang chạy được khi mở file trực tiếp. Không gọi mạng, không lưu bền dữ liệu, không gửi yêu cầu thật. Reload/chọn ca reset mô phỏng. Nút bỏ giữ cần API bổ sung trong sản phẩm thật; tool gốc chỉ bảo đảm tự nhả sau 20 phút.

Ảnh có số ①②③④ ở [screenshots](screenshots/), ánh xạ nguyên tắc trong [spec](../spec.md). Kết quả thử: [QA.md](QA.md).

## Chat mô phỏng

Nhập trong ô “Tin nhắn của bạn”, bấm Gửi hoặc Enter (Shift+Enter xuống dòng). Ví dụ:

- “Cho hai mẹ con bay tối nay” → giải thích thiếu chỗ.
- “Chọn BM 205” → chỉ thẻ chuyến; không tự giữ hoặc đổi.
- “Thôi hoàn tiền đi mà khoan” → chưa gửi, cảnh báo không huỷ được.
- “Bạn đổi nhầm rồi” → chuyển nhân viên, không tự khẳng định vé đã đổi chỉ vì lời chat.
- Câu chưa hiểu → hỏi lại với các lựa chọn, không đoán hành động.

Hỗ trợ tiếng Việt có/không dấu bằng từ khoá, không phải hiểu ngôn ngữ bằng AI. Mỗi tin mới xoá duyệt checkbox cũ để tránh đổi vé sau khi khách đổi ý. Lịch sử chỉ nằm trong tab, xoá khi reset/reload. Không API key. [Ảnh chat](screenshots/03-simulated-chat.jpg).

## Phát demo như cuộc chat của khách

Chọn ca ở bên trái hoặc bấm **Phát lại cuộc hội thoại**. Lời khách tự xuất hiện từng đoạn trong ô nhập, gửi thành bong bóng “Khách hàng · Titan Thủy Tổ”, rồi hiện trạng thái trợ lý kiểm tra và phản hồi mô phỏng. Thẻ chuyến, giữ chỗ, review và bàn giao nằm ngay trong khung chat. Có thể gõ tiếp sau khi trợ lý trả lời. Chọn ca mới huỷ hiệu ứng cũ và reset toàn bộ fixture; không làm lẫn hành động giữa các ca.

Hiệu ứng gõ và thời gian trả lời chỉ phục vụ trình diễn, không phải một model đang suy luận. Bước đổi vé vẫn cần checkbox và nút xác nhận; chat không thể tự thực thi đổi/hoàn.
