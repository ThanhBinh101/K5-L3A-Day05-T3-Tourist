# Prototype T3 — Tourist

Trạng thái: chưa dựng giao diện. Không có lời gọi AI thật; không cần API key.

## Phạm vi cần dựng

- 1–2 màn hình bấm được, dùng dữ liệu giả ở [fixtures/booking.json](fixtures/booking.json).
- Chọn ca **khách xác nhận mơ hồ** hoặc **trợ lý vừa đổi nhầm**. Không dùng ca “đổi sang sáng mai” của mẫu giảng viên làm demo chính.
- Hiện căn cứ (chuyến, giờ, số chỗ, hành khách), mức tự chủ, xác nhận trước hành động khó đảo, và đường chuyển nhân viên.
- Không hứa hoàn tác việc không thể đảo. Giữ chỗ 20 phút không đồng nghĩa đã đổi vé.
- BM 217 chỉ còn 1 chỗ, không đủ cho cả người lớn và trẻ em trong đặt chỗ.
- Chỉ mô phỏng; không gọi hãng bay, không dùng dữ liệu khách thật.

## Trước khi nộp

- [ ] Thêm `index.html` hoặc link prototype truy cập được tại đây.
- [ ] Thêm 1–2 ảnh có đánh số vị trí và liên kết ảnh vào `spec.md` §5.
- [ ] Mỗi số trỏ tới nguyên tắc HAX/PAIR và mức tự chủ tương ứng.
- [ ] Bấm hết ca khó, rồi thử một ca lạ; ghi kết quả thực tế.
- [ ] Ghi rõ phần mock và việc có/không có AI thật.

Nếu làm HTML tĩnh, chạy tại thư mục repo:

```bash
python3 -m http.server 8000 --directory prototype
```

Sau khi có `index.html`, mở http://localhost:8000. Hiện tại lệnh chỉ phục vụ thư mục tài liệu và fixture.
