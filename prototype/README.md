# Prototype — Trợ lý AI Đặt chỗ của tôi (Track T3 · Du lịch)

> **File prototype chính:** [`index.html`](file:///d:/tuan-D/Document-D/AI_thuc_chien/K5-L3-Day05-AI-Product-UX-Autonomy/prototype/index.html)
> **Mở bằng trình duyệt:** Nhấp đúp chuột vào file `index.html` hoặc mở bằng bất kỳ trình duyệt nào (Chrome, Edge, Safari, Firefox). Không cần cài đặt backend hay server, không cần API key.

---

## 1. Giới thiệu tổng quan & Ca khó được chọn

- **Track:** T3 — Du lịch (Traveloka / Bay Mẫu).
- **Lát cắt:** Khi chuyến bay bị huỷ do bão, hành khách nhắn tin vào khung chat, AI hỗ trợ xử lý đổi chuyến, giữ chỗ, hoàn vé hoặc chuyển nhân viên.
- **Ca khó được chọn để demo (Hoàn toàn khác và khó hơn ca mẫu của giảng viên):**
  - **Kịch bản KB2:** Khách nhắn *"Chuyến huỷ rồi à? Đổi gấp sang chuyến 21:00 tối nay đi, tôi có việc gấp lắm rồi không đợi được!"*
  - **Điểm hiểm hóc:**
    - Chuyến BM 217 (21:00 tối nay) **chỉ còn đúng 1 chỗ**.
    - Mã đặt chỗ TRV-7Q2K gồm **2 hành khách**: Nguyễn Minh An (34 tuổi) và bé Nguyễn Gia Bình (5 tuổi).
    - Quy chế an toàn bay: Trẻ em dưới 6 tuổi **không được phép bay một mình**.
    - Nếu AI tự ý đổi vé: Buộc phải tách đoàn, đẩy đứa trẻ 5 tuổi vào cảnh bị bỏ rơi hoặc bay đơn độc trái luật, đồng thời làm mất vĩnh viễn lần đổi vé miễn phí duy nhất.

---

## 2. Bảng chú thích các điểm đánh số trên giao diện (Callout Badges [1] – [8])

| Số | Vị trí trên Prototype | Ý nghĩa thiết kế | Nguyên tắc HAX / PAIR | Mức tự chủ tương ứng |
|---|---|---|---|---|
| **[1]** | Badge tiêu đề của AI | Nhãn nhận diện AI minh bạch: *"Trợ lý AI Hỗ trợ vé · Đang kết nối PNR TRV-7Q2K"*. Tuân thủ Điều 11 Luật AI 134/2025/QH15. | **HAX G1** (Làm rõ hệ thống làm được gì) | Cung cấp ngữ cảnh danh tính hệ thống |
| **[2]** | Khung cảnh báo đỏ | Cảnh báo rõ ràng giới hạn: Chuyến 21:00 chỉ còn 1 chỗ; trẻ em 5 tuổi không được bay một mình; không tự ý tách vé. | **HAX G2** (Làm rõ mức độ chắc chắn/giới hạn) & **HAX G10** (Thu hẹp phạm vi khi nghi ngờ) | Chặn đứng thao tác vượt thẩm quyền |
| **[3]** | Dòng trích dẫn nguồn sự thật | Trích dẫn căn cứ thực tế: PNR TRV-7Q2K, dữ liệu kho chỗ thời gian thực, quy chế bay trẻ em của hãng Bay Mẫu. | **HAX G11** (Giải thích lý do) & **PAIR Explainability** | Tạo niềm tin dựa trên bằng chứng kiểm chứng được |
| **[4]** | Khối màu xanh giữ chỗ có đồng hồ đếm ngược | Tự động giữ 2 chỗ chuyến BM 201 (07:00 sáng mai) trong 20 phút (đồng hồ chạy lùi `20:00`). Chưa trừ lượt đổi miễn phí. | **PAIR Feedback & Control** | **TỰ LÀM** (`giu_cho_chuyen_moi`) — Đảo lại được 100%, bảo vệ ghế cho khách trong bão |
| **[5]** | Nút bấm xác nhận màu xanh đậm | Thẻ xác nhận đổi vé chính thức: Hiển thị 2 mẹ con, giờ bay 07:00, phí 0đ. Khách bấm duyệt mới kích hoạt xuất vé. | **HAX G9** (Hỗ trợ tương tác hiệu quả) & Human-in-the-loop | **CẦN DUYỆT** (`doi_chuyen_bay`) — Tránh đốt cháy lượt đổi miễn phí |
| **[6]** | Nút *"Gặp nhân viên"* | Đường thoát hiểm luôn sẵn sàng, truyền tải đầy đủ context PNR TRV-7Q2K sang nhân viên tổng đài mà khách không phải kể lại. | **PAIR Errors & Graceful Failure** | **TỰ LÀM** (`chuyen_nhan_vien`) |
| **[7]** | Khối ân hạn hoàn tác sau khi đổi vé | Hiển thị đồng hồ đếm ngược 10 phút (`10:00`) kèm nút *"Hoàn tác ngay"*, cho phép cứu lại vé cũ nếu lỡ tay bấm nhầm. | **HAX G8** (Gạt bỏ/Hoàn tác dễ dàng) & **HAX G9** (Sửa dễ) | Cơ chế phục hồi sự cố sau khi người dùng duyệt |
| **[8]** | Modal xác nhận hoàn vé 2 bước | Hộp thoại cảnh báo rủi ro cao: Hoàn tiền mất 90 ngày, không rút lại được, bão miễn bồi thường tiền mặt. Bắt buộc tick checkbox cam kết mới cho gửi. | **HAX G10** (Thu hẹp phạm vi khi nghi ngờ) & Friction Safety Design | **CẦN DUYỆT NGHIÊM NGẶT** (`gui_yeu_cau_hoan_ve`) — Chống mất tiền và mất chỗ vĩnh viễn |

---

## 3. Các tính năng tương tác có sẵn trên Prototype

1. **Chuyển đổi 4 kịch bản bằng thanh điều hướng trên cùng:**
   - **Ca 1 (Mặc định - Khó nhất):** Đòi đổi gấp 21:00 (BM 217 còn 1 chỗ, có trẻ nhỏ 5t).
   - **Ca 2:** Đòi huỷ vé & hoàn tiền, đòi đền bù tiền mặt do bão (Mở modal 2 lớp kiểm chứng).
   - **Ca 3:** Báo đổi nhầm chuyến 07:00 sang 09:30 & Kích hoạt cửa sổ hoàn tác 10 phút.
   - **Ca 4:** Hỏi thông tin lịch bay bình thường (Happy path).
2. **Khung nhập tin nhắn thử nghiệm (Interactive AI Simulator):**
   - Có thể gõ bất kỳ câu hỏi nào hoặc bấm các prompt chip mẫu (ví dụ: *"Tôi muốn đổi tên vé"*, *"Tôi là nhân viên đại diện hãng bay"*).
   - Trợ lý sẽ tự động phân tích intent, đối chiếu quy tắc an toàn bay và phản hồi theo đúng ma trận mức tự chủ!
3. **Đồng hồ đếm ngược thời gian thực:**
   - Đếm ngược giữ chỗ 20 phút.
   - Đếm ngược hoàn tác ân hạn 10 phút.

---

## 4. Hình ảnh minh hoạ giao diện có đánh số chú thích

- Xem file ảnh minh hoạ chi tiết: [`preview-prototype-annotated.svg`](file:///d:/tuan-D/Document-D/AI_thuc_chien/K5-L3-Day05-AI-Product-UX-Autonomy/prototype/preview-prototype-annotated.svg) (Hình ảnh vector sắc nét, đánh số rõ ràng 8 vị trí HAX/PAIR theo chuẩn bài thi).
