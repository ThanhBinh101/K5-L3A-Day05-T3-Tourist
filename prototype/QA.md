# Kiểm tra prototype — 12/11/2026

Đã bấm trực tiếp trên trình duyệt local qua CUA. Mọi tác động đều mô phỏng; không API hoặc giao dịch thật.

| Ca | Quan sát | Kết quả |
|---|---|---|
| S1 mơ hồ | Ban đầu chưa đổi; chọn BM 205 hiện hai tên, ngày giờ và hậu quả; nút đổi disabled trước checkbox; sau duyệt đổi đúng BM 205, chặn đổi lần hai | Pass |
| S2 thiếu chỗ | BM 217 hiện 1 chỗ; nút “Không đủ 2 chỗ” disabled; không tự tách trẻ | Pass |
| S3 bồi thường | Chỉ nêu đổi/hoàn, không bồi thường tiền mặt do nạnka | Pass |
| S4 hoàn rồi rút ý | Chưa gửi hoàn; nút tìm hiểu hiện không huỷ được, thiếu thông tin; chuyển người mô phỏng, không hứa đã nhận | Pass |
| S5 đổi nhầm | Fixture đã đổi BM 201; chặn đổi/hoàn; chuyển người ngay, không hứa undo | Pass |
| S6/S7 | Trẻ đi một mình / đổi tên: hiện giới hạn, chuyển người; chưa đổi vé | Pass |
| S8 tự xưng nhân viên | Không bỏ duyệt, không gửi hoàn | Pass |
| Hết hạn | Sau chọn và tick, bấm mô phỏng hết hạn: review ẩn, không giữ xác nhận cũ | Pass |
| Hết chỗ | Biến thể BM 201 còn 0: bị chặn; BM 205 vẫn cho chọn | Pass |
| Đổi phương án | Tick BM 201 rồi chọn BM 205: checkbox reset và nút đổi lại disabled | Pass |
| Bỏ giữ | Review/hold ẩn; thông báo chưa đổi và chưa dùng quyền miễn phí | Pass |
| Luồng thường | BM 201 → giữ → duyệt → đổi đúng 2 người; chỉ dùng một lần miễn phí | Pass |

Kiểm tra thêm: `node --check prototype/app.js`, JSON fixture hợp lệ, `git diff --check`. Hai ảnh toàn trang đã được chụp, ảnh review đã kiểm tra trực quan, không chồng chữ trong kích thước chụp. Chưa kiểm thử riêng trên thiết bị mobile hoặc thời gian chờ tự nhiên đủ 20 phút; đường hết hạn được kích qua nút mô phỏng và có kiểm tra thời hạn ngay trong handler xác nhận.

Giới hạn: không thử backend, tồn chỗ thật, staff thật, hoặc AI hiểu câu tự do. Không dùng kết quả này thay cho ca lạ do TA/nhóm bạn đưa tại demo.

## Bổ sung chat mô phỏng

Đã bấm trình duyệt: gửi “Cho hai me con bay toi nay” → báo thiếu 2 chỗ; Enter gửi “Thôi hoàn tiền đi mà khoan” → chưa gửi hoàn; giữ BM 205 rồi gửi “đồng ý đổi đi” → nút đổi vẫn disabled. Có lịch sử khách/trợ lý và nhãn không AI thật. Ảnh `screenshots/03-simulated-chat.jpg`. Kiểm tra classifier bằng Node cho câu có/không dấu, nhiều chuyến, phủ định, ngoài phạm vi và injection; không có lời gọi model.

## Bổ sung phát hội thoại demo

Đã quan sát trạng thái “Khách đang nhập tin nhắn”, ô input tạm khoá; sau đó lời khách và phản hồi mô phỏng xuất hiện. Thử S1 → giữ BM 205, review vẫn yêu cầu xác nhận. Chuyển nhanh S5 sang S4 khi đang gõ không để lại phản hồi S5 hoặc chuyển người sai ca. S4 → tìm hiểu hoàn hiện bàn giao trong chat. S2 chạy xong rồi gõ “Chọn BM 205” nhận phản hồi theo chuyến, không tự đổi vé. Đã cập nhật ảnh 01/02/03 cho bố cục chat mới. Kiểm tra trực quan không chồng chữ ở kích thước chụp.
