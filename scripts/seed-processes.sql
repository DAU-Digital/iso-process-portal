-- Supabase Seed SQL for ISO Processes

-- Drop the check constraint that restricts department names
ALTER TABLE public.process_groups DROP CONSTRAINT IF EXISTS process_groups_department_check;

-- Department: KHAO THI
INSERT INTO public.process_groups (id, department, label, x, y, width, height) VALUES 
('group-2cfef6473b', 'KHAO THI', 'Danh mục quy trình', 100, 100, 1000, 1650)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-d5ada4d215c32111', 'group-2cfef6473b', '1. XAY DUNG VA QUAN LY NGAN HANG CAU HOI THI', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"KHAO THI"}]'::jsonb, '["QT_XAY DUNG VA QUAN LY NGAN HANG CAU HOI THI.pdf","Quy định về việc xây dựng, quản lý và sử dụng ngân hàng câu hỏi thi kết thúc học phần của Trường Đại học Kiến trúc Đà Nẵng.pdf","QT - NGAN HANG DE THI.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-aeb1fc63909e1686', 'group-2cfef6473b', '10. TO CHUC, HUONG DAN TU DANH GIA CO SO GIAO DUC', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"KHAO THI"}]'::jsonb, '["QT_ TO CHUC, HUONG DAN TU DANH GIA VA CHUAN BI DANH GIA NGOAI CO SƠ GIAO DỤC.pdf","Công văn số 1668-QLCL-KĐCLGD của Cục Quản lý chất lượng - Bộ Giáo dục và Đào tạo.pdf","Công văn số 766 QLCL-KĐCLGD , Hướng dẫn tự đánh giá cơ sở giáo dục đại học.pdf","Công văn số 767 QLCL-KĐCLGD , Hướng dẫn đánh giá ngoài cơ sở giáo dục đại học.pdf","Công văn số 768 QLCL-KĐCLGD , Hướng dẫn theo bộ tiêu chuẩn đánh giá chất lượng cơ sở giáo dục đại học.pdf","Thông tư 04-2016-TT-BGDĐT  ban hành quy định về tiêu chuẩn đánh giá chất lượng chương trình đào tạo trình độ của đại học giáo dục.pdf","Thông tư số 12-2017-TT-BGDĐTban hành quy định về kiểm định chất lượng giáo dục đại học.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-80b818da5386eb03', 'group-2cfef6473b', '11. TO CHUC, HUONG DAN TU DANH GIA CTDT', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"KHAO THI"}]'::jsonb, '["QT_ TO CHUC, HUONG DAN TU DANH GIA VÀ CHUAN BI DANH GIA NGOA CTDT.pdf","Công văn số 1668-QLCL-KĐCLGD  Bảng hướng dẫn đánh giá CTĐT.pdf","Công văn số 1668QLCL-KĐCLGDcủa Cục Quản lý chất lượng - Bộ Giáo dục và Đào tạo.pdf","Công văn số 769 QLCL-KĐCLGD, Hướng dẫn theo bộ tiêu chuẩn đánh giá chất lượng chương trình đào tạo.pdf","Thông tư số 04-2016-TT-BGDĐT ngày 14 tháng 3 năm 2016 của Bộ trưởng Bộ Giáo dục và Đào tạo.pdf","Thông tư số 38-2013-TT-BGDĐT của Bộ Giáo dục và Đào tạo.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-65a7c44d9aa5060b', 'group-2cfef6473b', '2. PHUC KHAO BAI THI KET THUC HOC PHAN', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"KHAO THI"}]'::jsonb, '["QT - PHUC KHAO.pdf","Quy định sửa đổi bổ sung Quy định đánh giá kết quả học tập của sinh viên..pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-af5637b825236986', 'group-2cfef6473b', '4. QUY TRINH CHAM THI BAI THI TU LUAN CO ROC PHACH', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"KHAO THI"}]'::jsonb, '["Quy định đánh giá kết quả học tập của sinh viên..pdf","QT- Cham bai thi tu luan co roc phach.pdf","Quy chế đào tạo.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-e478b81fde8552ce', 'group-2cfef6473b', '3. TO CHUC THI TRAC NGHIEM TREN MAY TINH', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"KHAO THI"}]'::jsonb, '["QT- THI TRAC NGHIEM TREN MAY TINH.pdf","Quy định về Đánh giá kết quả học tập của sinh viên Trường Đại học Kiến trúc Đà Nẵng.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-041f32f881195404', 'group-2cfef6473b', '5. QUY TRINH THI KET THUC HOC PHAN', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"KHAO THI"}]'::jsonb, '["QT _ THI KET THUC HOC PHAN.pdf","Quy trình thi kết thúc học phần.pdf","Quy định về đánh giá kết quả học tập của sv.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-cba2a93a19a9e3a6', 'group-2cfef6473b', '6. QUY TRINH THUC HIEN QUY DINH VE VIEC CONG KHAI TRONG HOAT DONG CUA TRUONG', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"KHAO THI"}]'::jsonb, '["QT- CAP NHAT THONG TIN CONG KHAI THUONG XUYEN TREN CONG TTDT.pdf","QT- CONG KHAI THEO BAO CAO THUONG NIEN.pdf","Quy định về việc Công khai trong hoạt động của trường Đại học Kiến trúc Đà Nẵng.pdf","QT - THUC HIEN QUY DINH VE CONG KHAI TRONG HOAT DONG CUA TRUONG DH.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-848af220983f3aee', 'group-2cfef6473b', '7. THI KHAO SAT DAU VAO', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"KHAO THI"}]'::jsonb, '["QT_ KHAO SAT THI DAU VAO.pdf","Quy định xét miễn HP tiếng anh.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-a6a404150e82fce3', 'group-2cfef6473b', '8. THI KHAO SAT DAU RA', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"KHAO THI"}]'::jsonb, '["QT- KHAO SAT DAU RA.pdf","Thi khảo sát đầu ra.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-409b5318af413690', 'group-2cfef6473b', '9. KHAO SAT CAC BEN LIEN QUAN DEN HOAT DONG CUA NHA TRUONG', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"KHAO THI"}]'::jsonb, '["QT_ KHAO SAT CAC BEN LIEN QUAN DOI VOI HOAT DONG CUA TRUONG.pdf","Quy chế tổ chức và hoạt động của Trường Đại học Kiến trúc Đà Nẵng.pdf","Quy định về công tác khảo sát, lấy ý kiến phản hồi từ các bên liên quan đối với hoạt động của Trường Đại học Kiến trúc Đà Nẵng.pdf","Quyết định số 2702006QĐ-TTg ngày 27 tháng 11 năm 2006 của Thủ tướng Chính phủ về việc thành lập Trường Đại học Kiến trúc Đà Nẵng.pdf","Thông tư số 01-2024- TT-BGDĐT ngày 05 tháng 02 năm 2024 của Bộ Giáo dục và Đào tạo ban hành Chuẩn cơ sở giáo dục đại học.pdf","Thông tư số 04-2016-TT-BGDĐT ngày 14 tháng 3 năm 2016 của Bộ Giáo dục và Đào tạo.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

-- Department: P.CTSV
INSERT INTO public.process_groups (id, department, label, x, y, width, height) VALUES 
('group-e6f04a50aa', 'P.CTSV', 'Danh mục quy trình', 100, 100, 1000, 1800)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-e6caadc31870a9ad', 'group-e6f04a50aa', 'Quy trình cấp Giấy xác nhận sinh viên', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.CTSV"}]'::jsonb, '["Hướng dẫn thao thác đề xuất và cấp biểu mẫu xác nhận sinh viên trực tuyến.pdf","Quy trình cấp Giấy xác nhận sinh viên.pdf","Nghị định số 1312021NĐ-TTg của Chính phủ quy định chi tiết và hướng dẫn thi hành Pháp lệnh Ưu đãi người có công với Cách mạng.pdf","Quyết định số 052022QĐ-TTg sửa đổi bổ sung một số điều của Quyết định số 157QĐ-TTg của Thủ tướng Chính phủ về tín dụng đối với HSSV.pdf","Quyết định số 157QĐ-TTg của Thủ tướng Chính phủ về tín dụng đối với HSSV.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-08e886870cc6e9f0', 'group-e6f04a50aa', 'QUY TRÌNH CẬP NHẬT THÔNG TIN BAN CÁN SỰ - BCH LỚP', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.CTSV"}]'::jsonb, '["QUY TRÌNH CẬP NHẬT THÔNG TIN BAN CÁN SỰ - BCH LỚP.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-7701dd490db6de02', 'group-e6f04a50aa', 'QUY TRÌNH CẬP NHẬT THÔNG TIN GIẢNG VIÊN CHỦ NHIỆMCỐ VẤN HỌC TẬP TRÊN PHẦN MỀM QUẢN LÝ', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.CTSV"}]'::jsonb, '["QUY TRÌNH CẬP NHẬT THÔNG TIN GIẢNG VIÊN CHỦ NHIỆMCỐ VẤN HỌC TẬP TRÊN PHẦN MỀM QUẢN LÝ.pdf","Quy định về công tác cố vấn học tập của trường ĐHKTĐN.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-7ce60d5fafcb9e2d', 'group-e6f04a50aa', 'Quy trình cập nhật thông tin sinh viên', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.CTSV"}]'::jsonb, '["Quy trình cập nhật thông tin sinh viên.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-cd677651f0483de4', 'group-e6f04a50aa', 'QUY TRÌNH CẬP NHẬT TRẠNG THÁI SINH VIÊN TRÊN PHẦN MỀM QUẢN LÝ', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.CTSV"}]'::jsonb, '["QUY TRÌNH CẬP NHẬT TRẠNG THÁI SINH VIÊN TRÊN PHẦN MỀM QUẢN LÝ.pdf","Quy chế công tác sinh viên ĐH Kiến trúc ĐN.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-ed5106e01325160e', 'group-e6f04a50aa', 'Quy trình Khen thưởng và kỷ luật sinh viên', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.CTSV"}]'::jsonb, '["Quy trình Khen thưởng và kỷ luật sinh viên.pdf","Quyết định số 347QĐ-ĐHKTĐN ngày 1182021 của Hiệu trưởng về việc ban hành Quy chế đào tạo trình độ đại học của Trường Đại học Kiến trúc Đà Nẵng.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-cb85a0d29b7bd735', 'group-e6f04a50aa', 'QUY TRÌNH LÀM THẺ SINH VIÊN', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.CTSV"}]'::jsonb, '["QUY TRÌNH LÀM THẺ SINH VIÊN.pdf","Quy chế công tác sinh viên Đại học Kiến trúc Đà Nẵng.pdf","Thông báo về việc đăng ký, sử dụng và bảo quản thẻ sinh viên.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-58a56035a1287eb6', 'group-e6f04a50aa', 'QUY TRÌNH QUẢN LÝ THÔNG TIN VÀ LƯU TRỮ HỒ SƠ SINH VIÊN', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.CTSV"}]'::jsonb, '["QUY TRÌNH QUẢN LÝ THÔNG TIN VÀ LƯU TRỮ HỒ SƠ SINH VIÊN.pdf","Quy định thời hạn bảo quản tài liệu chuyên môn nghiệp vụ của ngành Giáo dục.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-391ec41f23c69878', 'group-e6f04a50aa', 'QUY TRÌNH XÉT GIẢM HỌC PHÍ', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.CTSV"}]'::jsonb, '["QUY TRÌNH XÉT GIẢM HỌC PHÍ.pdf","Quy định Về chế độ giảm học phí đối với sinh viên.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-8015d29035ab17be', 'group-e6f04a50aa', 'QUY TRÌNH XÓA TÊN SINH VIÊN VĂNG NGHỈ HỌC DÀI NGÀY KHÔNG PHÉP', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.CTSV"}]'::jsonb, '["Quy chế công tác sinh viên ĐH Kiến trúc Đà Nẵng.pdf","QUY TRÌNH XÓA TÊN SINH VIÊN VĂNG NGHỈ HỌC DÀI NGÀY KHÔNG PHÉP.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-53aee4dd7e63062d', 'group-e6f04a50aa', 'QUY TRÌNH XỬ LÝ SINH VIÊN THÔI HỌC RÚT HỒ SƠ', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.CTSV"}]'::jsonb, '["QUY TRÌNH XỬ LÝ SINH VIÊN THÔI HỌC RÚT HỒ SƠ.pdf","Quy chế đào tạo trình độ Đại học Đại học Kiến trúc Đà Nẵng.pdf","Quy chế đào tạo trình độ đại học.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-e150dd1ad8126dde', 'group-e6f04a50aa', 'QUY TRÌNH ĐÁNH GIÁ KẾT QUẢ RÈN LUYỆN', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.CTSV"}]'::jsonb, '["QUY TRÌNH ĐÁNH GIÁ KẾT QUẢ RÈN LUYỆN TOÀN KHÓA.pdf","Quy chế đánh giá kết quả rèn luyện của người học được đào tạo trình độ đại học hệ chính quy.pdf","Quy định về tiêu chí, khung điểm, quy trình đánh giá kết quả rèn luyện của sinh viên Trường Đại học Kiến trúc Đà Nẵng.pdf","QUY TRÌNH ĐÁNH GIÁ KẾT QUẢ RÈN LUYỆN.pdf","QUY ĐỊNH VỀ TIÊU CHÍ, KHUNG ĐIỂM, QUY TRÌNH ĐÁNH GIÁ KẾT QUẢ RÈN LUYỆN CỦA SINH VIÊN TRƯỜNG ĐẠI HỌC KIẾN TRÚC ĐÀ NẴNG.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

-- Department: P.DAOTAO
INSERT INTO public.process_groups (id, department, label, x, y, width, height) VALUES 
('group-67842f3a1e', 'P.DAOTAO', 'Danh mục quy trình', 100, 100, 1000, 1500)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-4e84e68d41ca7761', 'group-67842f3a1e', 'Cập nhật, rà soát, điều chỉnh và bổ sung chương trình đào tạo', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.DAOTAO"}]'::jsonb, '["Cập nhật, rà soát, điều chỉnh và bổ sung chương trình đào tạo.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-be6fc5c589778901', 'group-67842f3a1e', 'QUY TRÌNH XỬ LÝ HỌC VỤ SINH VIÊN', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.DAOTAO"}]'::jsonb, '["Thông tư số 082021TT-BGDĐT ngày 1832021 của Bộ trưởng Bộ Giáo dục và Đào tạo ban hành Quy chế đào tạo trình độ đại học..pdf","Bảo lưu kết quả học tập.pdf","Trở lại học tập sau khi bảo lưu.pdf","SV xin chuyển từ trường khác đến Trường Đại học Kiến trúc Đà Nẵng.pdf","SV xin chuyển từ Trường Đại học Kiến trúc Đà Nẵng đến trường khác.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-4162652100f7c844', 'group-67842f3a1e', 'Lập kế hoạch học kỳ theo CTK', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.DAOTAO"}]'::jsonb, '["Phân công giảng dạy.pdf","Tổ chức LHP ngoài kế hoạch.pdf","Lập kế hoạch học kỳ theo CTK.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-47ffcefb92a3ff73', 'group-67842f3a1e', 'Lập kế hoạch năm học', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.DAOTAO"}]'::jsonb, '["Kế hoạch GD&HT năm học cụ thể đã được HT ký ban hành.pdf","Lập kế hoạch năm học.pdf","Quy chế đào tạo 082021 của Bộ GD&ĐT.pdf","Quy chế đào tạo 347QĐ-ĐHKTĐN của Trường Đại học Kiến trúc Đà Nẵng.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-2cec2ef2c7e8fc20', 'group-67842f3a1e', 'Lập thời khóa biểu (TKB)', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.DAOTAO"}]'::jsonb, '["Lập thời khóa biểu (TKB).pdf","Thông báo thời gian ĐK HP học kỳ... 1.pdf","Thông báo thời gian ĐK HP học kỳ... 2.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-b4e26216957c6627', 'group-67842f3a1e', 'QUY TRÌNH THANH TOÁN KHỐI LƯỢNG GIẢNG DẠY VƯỢT GIỜ CHUẨN ĐỊNH MỨC ĐỐI VỚI GIẢNG VIÊN CƠ HỮU', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.DAOTAO"}]'::jsonb, '["QUY TRÌNH THANH TOÁN KHỐI LƯỢNG GIẢNG DẠY VƯỢT GIỜ CHUẨN ĐỊNH MỨC ĐỐI VỚI GIẢNG VIÊN CƠ HỮU.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-ff55d8ec21aef4f0', 'group-67842f3a1e', 'Quản lý hoạt động giảng dạy', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.DAOTAO"}]'::jsonb, '["Quản lý hoạt động giảng dạy.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-b992f74152e0a593', 'group-67842f3a1e', 'Quản lý hoạt động giảng dạy của Giảng viên', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.DAOTAO"}]'::jsonb, '["Quản lý hoạt động giảng dạy của Giảng viên.pdf","Kế hoạch giảng dạy và học tập năm học.pdf","Thông tư 202020TT-BGDĐT ngày 27072020 của Bộ Giáo dục và Đào tạo.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-5e15b40651048515', 'group-67842f3a1e', 'Xử lý kết quả học tập sinh viên', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.DAOTAO"}]'::jsonb, '["Quyết định 347QĐ-ĐHKTĐN ban hành Quy chế đào tạo trình độ đại học của Trường ĐH Kiến trúc ĐN.pdf","HƯỚNG DẪN XỬ LÝ KQHT HỌC KỲ 1.pdf","HƯỚNG DẪN XỬ LÝ KQHT HỌC KỲ 2.pdf","Thông tư 082021TT-BGDĐT.pdf","Xử lý kết quả học tập sinh viên.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-9f3b8b736109a8a9', 'group-67842f3a1e', 'Quản lý viên thính giảng', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.DAOTAO"}]'::jsonb, '["Quản lý viên thính giảng.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

-- Department: P.HC-TH
INSERT INTO public.process_groups (id, department, label, x, y, width, height) VALUES 
('group-f8e6dcb241', 'P.HC-TH', 'Danh mục quy trình', 100, 100, 1000, 3150)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-2d4e5e7f5adfcbe6', 'group-f8e6dcb241', 'QUY TRÌNH  Khám chữa bệnh hằng ngày', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["Khám chữa bệnh hằng ngày.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-0ee8545d23c2ddd5', 'group-f8e6dcb241', 'QUY TRÌNH Khám sức khỏe sinh viên đầu khóa', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["Quy định về công tác y tế trường học trong cơ sở giáo dục đại học và cơ sở giáo dục nghề nghiệp.pdf","Khám sức khỏe sinh viên đầu khóa.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-acbaa24aac6eb73c', 'group-f8e6dcb241', 'QUY TRÌNH  KIỂM KÊ TÀI LIỆU, THIẾT BỊ', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["KIỂM KÊ TÀI LIỆU, THIẾT BỊ.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-61511f4b1a30b7b6', 'group-f8e6dcb241', 'QUY TRÌNH BỔ SUNG TÀI LIỆU (SÁCH, BÁO, TẠP CHÍ) TẠI THƯ VIỆN', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["BỔ SUNG TÀI LIỆU (SÁCH, BÁO, TẠP CHÍ) TẠI THƯ VIỆN.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-d76c1124d5e9061c', 'group-f8e6dcb241', 'QUY TRÌNH MƯỢN - TRẢ TÀI LIỆU TẠI THƯ VIỆN', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["Luật Thư viện.pdf","Thông tư quy định tiêu chuẩn thư viện cơ sở giáo dục đại học.pdf","Thông tư về ban hành chuẩn cơ sở giáo dục đại học.pdf","MƯỢN - TRẢ TÀI LIỆU TẠI THƯ VIÊN.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-e0956fbb7b1190f2', 'group-f8e6dcb241', 'QUY TRÌNH CÔNG VIỆC HÀNH CHÍNH KHÁC', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["CÔNG VIỆC HÀNH CHÍNH KHÁC.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-f025a14407d13e18', 'group-f8e6dcb241', 'QUY TRÌNH Cấp thuốc cho đoàn đi công tác', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["Cấp thuốc cho đoàn đi công tác.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-1d621427dc94fb33', 'group-f8e6dcb241', 'QUY TRÌNH Kiểm tra theo dõi nước uống qua lọc', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["Kiểm tra theo dõi nước uống qua lọc.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-b0a9db546cd474e7', 'group-f8e6dcb241', 'QUY TRÌNH Kiểm tra vệ sinh, môi trường', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["Kiểm tra vệ sinh, môi trường.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-71b9779d88200afe', 'group-f8e6dcb241', 'QUY TRÌNH Mua thuốc, trang thiết bị y tế', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["Mua thuốc, trang thiết bị y tế.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-45d95829252b4e1d', 'group-f8e6dcb241', 'QUY TRÌNH MUA VÀ QUẢN LÝ DỤNG CỤ, TRANG THIẾT BỊ VĂN PHÒNG', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["MUA VÀ QUẢN LÝ DỤNG CỤ, TRANG THIẾT BỊ VĂN PHÒNG.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-e2e42d4b4605496c', 'group-f8e6dcb241', 'QUY TRÌNH PHỤC HỒI TÀI LIỆU', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["PHỤC HỒI TÀI LIỆU.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-56e1023a4d6e2026', 'group-f8e6dcb241', 'QUY TRÌNH Quản lý hồ sơ BHYT, BHTN của sinh viên', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["Quản lý hồ sơ BHYT, BHTN của sinh viên.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-4f2d2257e7e4eaad', 'group-f8e6dcb241', 'QUY TRÌNH QUẢN LÝ PHÔI BẰNG', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["QUẢN LÝ PHÔI BẰNG.pdf","Luật số 34-2028-QH14 - Luật sửa đổi, bổ sung một số điều của Luật giáo dục đại học.pdf","Nghị định 99-2029-NĐ-CP quy định chi tiết và hướng dẫn thi hành một số điều của Luật sửa đổi, bổ sung Luật GDĐH.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-645d9e266f189b13', 'group-f8e6dcb241', 'QUY TRÌNH QUẢN LÝ VĂN BẢN ĐI', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["QUẢN LÝ VĂN BẢN ĐI.pdf","Luật lưu trữ số 33-2024-QH15 ngày 21-6-2024.pdf","Nghị định 30-2020-NĐ-CP ngày 05-3-2020 về công tác văn thư.pdf","Thông tư 01-2024-TT-BGDĐT ngày 05-02-2024 về ban hành Chuẩn cơ sở giáo dục đại học.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-7b6b0d8135e13653', 'group-f8e6dcb241', 'QUY TRÌNH QUẢN LÝ VĂN BẢN ĐẾN', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["Quan ly van ban den.pdf","Luật Lưu trữ.pdf","Nghi định về công tác văn thư.pdf","Thông tư ban hành Chuẩn cơ sở giáo dục đại học.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-f3b163bb5b0055df', 'group-f8e6dcb241', 'QUY TRÌNH QUẢN LÝ WEBSITE THƯ VIỆN', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["QUẢN LÝ WEBSITE THƯ VIỆN.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-6c67fa870038199f', 'group-f8e6dcb241', 'QUY TRÌNH QUẢN LÝ, SỬ DỤNG CON DẤU', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["QUẢN LÝ, SỬ DỤNG CON DẤU.pdf","Nghị định 56-2023-NĐ-CP - Sửa đổi, bổ sung 1 số điều của Nghị định 99.pdf","Nghị định 99-2016-NĐ-CP - Quản lý và sử dụng con dấu.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-c3df946651418060', 'group-f8e6dcb241', 'QUY TRÌNH THANH LÝ TÀI LIỆU', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["THANH LÝ TÀI LIỆU.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-07d0317d1bb46bb8', 'group-f8e6dcb241', 'QUY TRÌNH TRA CỨU TÀI LIỆU', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["TRA CỨU TÀI LIỆU.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-3fab7b044b4feab6', 'group-f8e6dcb241', 'QUY TRÌNH TỔ CHỨC HỘI NGHỊ, HỘI THẢO, CHƯƠNG TRÌNH', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HC-TH"}]'::jsonb, '["TỔ CHỨC HỘI NGHỊ, HỘI THẢO, CHƯƠNG TRÌNH.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

-- Department: P.HTQT-TT
INSERT INTO public.process_groups (id, department, label, x, y, width, height) VALUES 
('group-676d7ec044', 'P.HTQT-TT', 'Danh mục quy trình', 100, 100, 1000, 2700)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-226726c93abd997e', 'group-676d7ec044', 'Hoạt động phục vụ công tác truyền thông tuyển sinh offline - Quà tặng tuyển sinh', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HTQT-TT"}]'::jsonb, '["Hoạt động phục vụ công tác truyền thông tuyển sinh offline - Quà tặng tuyển sinh.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-ebc8ec3cf2570465', 'group-676d7ec044', 'Hoạt động phục vụ công tác truyền thông tuyển sinh offline - Ấn phẩm tuyển sinh', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HTQT-TT"}]'::jsonb, '["Hoạt động phục vụ công tác truyền thông tuyển sinh offline - Ấn phẩm tuyển sinh.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-23bed36764dc0d0b', 'group-676d7ec044', 'Truyền thông tuyển sinh online', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HTQT-TT"}]'::jsonb, '["Quy chế tuyển sinh.pdf","Quy trình truyền thông, tuyển sinh online.pdf","Báo cáo công tác tuyển sinh 2024, tuyên truyền tuyển sinh 2025.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-2cc48ff7437fde6c', 'group-676d7ec044', 'Ký kết văn bản hợp tác (MoA, MoU)', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HTQT-TT"}]'::jsonb, '["Ký kết văn bản hợp tác (MoA, MoU).pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-f267b3e057497e74', 'group-676d7ec044', 'Tiếp đón đoàn khách quốc tế đến thăm và làm việc tại trường', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HTQT-TT"}]'::jsonb, '["Quy trình Tiếp đón đoàn khách quốc tế đến thăm và làm việc tại trường.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-474690b386c388c9', 'group-676d7ec044', 'Triển khai môn học cộng đồng đến giảng viên và sinh viên', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HTQT-TT"}]'::jsonb, '["Triển khai môn học cộng đồng đến giảng viên và sinh viên.pdf","Quyết định thành lập Trung tâm CELC-DAU.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-00df49056e8c587f', 'group-676d7ec044', 'Truyền thông nội bộ - phát triển học hiệu', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HTQT-TT"}]'::jsonb, '["Truyền thông nội bộ - phát triển học hiệu.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-e04b39ddba7b16c8', 'group-676d7ec044', 'Truyền thông nội bộ - tổ chức sự kiện', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HTQT-TT"}]'::jsonb, '["Truyền thông nội bộ - tổ chức sự kiện.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-90bc58233a106824', 'group-676d7ec044', 'Truyền thông nội bộ - Đưa tin sự kiện', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HTQT-TT"}]'::jsonb, '["Truyền thông nội bộ - Đưa tin sự kiện.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-7f56c47f2126f8a3', 'group-676d7ec044', 'Tổ chức chương trình giao lưu văn hóa', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HTQT-TT"}]'::jsonb, '["Tổ chức chương trình giao lưu văn hóa.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-b20985fcb99650ae', 'group-676d7ec044', 'Tổ chức chương trình thực tập Nhật Bản dành cho sinh viên', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HTQT-TT"}]'::jsonb, '["Tổ chức chương trình thực tập Nhật Bản dành cho sinh viên.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-546bdc136ca802eb', 'group-676d7ec044', 'Tổ chức chương trình trao đổi sinh viên 3+1 với Trường Đại học Dân tộc Quảng Tây (Trung Quốc)', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HTQT-TT"}]'::jsonb, '["Tổ chức chương trình trao đổi sinh viên 3+1 với Trường Đại học Dân tộc Quảng Tây (Trung Quốc).pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-f1c14ac6e635a583', 'group-676d7ec044', 'Tổ chức dự án cộng đồng', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HTQT-TT"}]'::jsonb, '["Tổ chức dự án cộng đồng.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-b978520732dd157e', 'group-676d7ec044', 'Tổ chức Hội nghị-Hội thảo quốc tế', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HTQT-TT"}]'::jsonb, '["Quy trình Tổ chức Hội nghị-Hội thảo quốc tế.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-793cbe1d307ac704', 'group-676d7ec044', 'Tổ chức hội thảo, workshop, chương trình tập huấn', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HTQT-TT"}]'::jsonb, '["Tổ chức hội thảo, workshop, chương trình tập huấn.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-b667a1109b6701ce', 'group-676d7ec044', 'Tổ chức đoàn ra dành cho các đoàn đại diện Trường Đại học Kiến trúc Đà Nẵng đi công tác nước ngoài', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HTQT-TT"}]'::jsonb, '["Tổ chức đoàn ra dành cho các đoàn đại diện Trường Đại học Kiến trúc Đà Nẵng đi công tác nước ngoài.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-9a1ba16af363ba1d', 'group-676d7ec044', 'Xin cấp thẻ tạm trú cho người lao động nước ngoài', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HTQT-TT"}]'::jsonb, '["Xin cấp thẻ tạm trú cho người lao động nước ngoài.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-1c47152c08a9ae48', 'group-676d7ec044', 'Xin cấp, gia hạn giấy phép lao động cho người lao động nước ngoài làm việc tại Trường', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.HTQT-TT"}]'::jsonb, '["Xin cấp, gia hạn giấy phép lao động cho người lao động nước ngoài làm việc tại Trường.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

-- Department: P.KH-CN
INSERT INTO public.process_groups (id, department, label, x, y, width, height) VALUES 
('group-1a1fdfe783', 'P.KH-CN', 'Danh mục quy trình', 100, 100, 1000, 1200)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-1addd639005e3489', 'group-1a1fdfe783', '1.Quy trình quản lý đề tài KHCN giảng viên', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.KH-CN"}]'::jsonb, '["Quy trình quản lý đề tài KHCN giảng viên.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-9c537a3c1584a443', 'group-1a1fdfe783', '2.Quy trình quản lý đề tài NCKH của sinh viên', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.KH-CN"}]'::jsonb, '["Quy trình quản lý đề tài NCKH của sinh viên.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-5a29aede3b6cf207', 'group-1a1fdfe783', '3.Quy trình hoạt động của Hội đồng Khoa học & Đào tạo Trường Đại học Kiến trúc Đà Nẵng', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.KH-CN"}]'::jsonb, '["1.Quy trình hoạt động của Hội đồng Khoa học & Đào tạo.pdf","2.Quy chế tổ chức và hoạt động Trường 2019.pdf","3.Quyết định thành lập Hội đồng Khoa học và Đào tạo trường.pdf","4.Luật Giáo dục - 43-2019-QH14.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-3a3c9f7d85e25758', 'group-1a1fdfe783', '4. Quy trình thanh toán giờ Nghiên cứu khoa học', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.KH-CN"}]'::jsonb, '["Quy trình thanh toán giờ Nghiên cứu khoa học.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-dc470ac7c41b94dc', 'group-1a1fdfe783', '5. Quy trình thanh toán công bố quốc tế', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.KH-CN"}]'::jsonb, '["Quy trình thanh toán công bố quốc tế.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-dc31183da2a0df0e', 'group-1a1fdfe783', '6.Quy trình đăng ký tham dự Hội nghị, Hội thảo', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.KH-CN"}]'::jsonb, '["Quy trình đăng ký tham dự Hội nghị, Hội thảo.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-5a28bc73e995be8e', 'group-1a1fdfe783', '7.Quy trình hoạt động của nhóm nghiên cứu, nghiên cứu mạnh ở Trường Đại học Kiến trúc Đà Nẵng', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.KH-CN"}]'::jsonb, '["1.Quy trình hoạt động của nhóm nghiên cứu Trường Đại học Kiến trúc Đà Nẵng.pdf","3.Luật Khoa học công nghệ.pdf","4.Quy chế tổ chức và hoạt động Trường 2019.pdf","5.Nghị định 22.2018.pdf","6.Nghị định 109.2022.pdf","7.Thông tư 08.2021.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-9cdc877b0e9def38', 'group-1a1fdfe783', '8.Quy trình tổ chức Hội nghị, Hội thảo khoa học', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.KH-CN"}]'::jsonb, '["Quy trình tổ chức Hội nghị, Hội thảo khoa học.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

-- Department: P.QLDA và QTTB
INSERT INTO public.process_groups (id, department, label, x, y, width, height) VALUES 
('group-1c20abaffc', 'P.QLDA và QTTB', 'Danh mục quy trình', 100, 100, 1000, 600)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-043651d798aa4389', 'group-1c20abaffc', 'Quy trinh mua sắm vật tư, trang thiết bị', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.QLDA và QTTB"}]'::jsonb, '["QT.TH-02.pdf","TH-02-06.pdf","TH-02-07.pdf","Quy trinh mua sắm vật tư, trang thiết bị.pdf","Kế hoạch, dự trù mua sắm sửa chữa cải tạo cơ sở vật chất và trang thiết bị.pdf","Luật đấu thầu số 222023QH15.pdf","Nghị định 35 - Quản lý chi phí đầu tư xây dựng, chất lượng & bảo trì công trình.pdf","Quy trình lập báo cáo tài chính năm.pdf","Về việc lập kế hoạch tài chính năm của các đơn vị thuộc trường.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-1dbb5ad2baee4a3f', 'group-1c20abaffc', 'Quy trình bảo trì sữa chữa trang thiết bị', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.QLDA và QTTB"}]'::jsonb, '["BM 04-01.pdf","BM 04-02.pdf","BM 04-03.pdf","BM 04-04.pdf","BM 04-05.pdf","BM 04-06.pdf","BM 04-07.pdf","BM 04-08.pdf","Quy trình bảo trì sữa chữa trang thiết bị.pdf","Quy trình bảo trì sửa chữa trang thiết bị (Kèm theo QĐ 568 của Hiệu trưởng).pdf","Quy định chi tiết hợp đồng.pdf","Quy định chi tiết một số nội dung về quản lý dự án đầu tư xây dựng.pdf","Quy định chi tiết một số nộị dung về quản lý chất lượng, thi công xây dựng và bảo trì công trình.pdf","Quy định phân cấp công trình và hướng dẫn áp dụng trong quản lý xây dựng.pdf","Quản lý chi phí đầu tư xây dựng.pdf","Sửa đổi, bổ sung một số điều của các Nghị định thuộc lĩnh vực quản lý nhà nước đầu tư xây dựng.pdf","Sửa đổi, bổ sung một số điều Nghi định 37 về chi tiết hợp đồng.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-83038e80f2a5e637', 'group-1c20abaffc', 'Quy trình quản lý tài sản trang thiết bị', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.QLDA và QTTB"}]'::jsonb, '["BM 03-01.pdf","BM 03-02.pdf","BM 03-03.pdf","BM 03-04.pdf","BM 03-05.pdf","BM 03-06.pdf","BM 03-07.pdf","BM 03-08.pdf","BM 03-09.pdf","BM 03-10.pdf","BM 03-11.pdf","Quy trình quản lý tài sản trang thiết bị.pdf","Phương án kiểm kê tài sản trang thiết bị.pdf","Quy trình quản lý tài sản và trang thiết bị.pdf","Quyết định ban hành quản lý CSVC và trang thiết bị của Hiệu trưởng.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

-- Department: P.TCKT
INSERT INTO public.process_groups (id, department, label, x, y, width, height) VALUES 
('group-f36c1e679a', 'P.TCKT', 'Danh mục quy trình', 100, 100, 1000, 2700)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-092c8c8221538968', 'group-f36c1e679a', 'QUY TRÌNH CHI TRẢ CÁC KHOẢN TIỀN SINH VIÊN NỘP NHẦM-NỘP THỪA', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCKT"}]'::jsonb, '["QUY TRÌNH CHI TRẢ CÁC KHOẢN TIỀN SINH VIÊN NỘP NHẦM-NỘP THỪA.pdf"]'::jsonb, '["QT.TCKT.12 - 2.png","QT.TCKT.12 - 3.png"]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-f594a8ec831f0ecb', 'group-f36c1e679a', 'QUY TRÌNH GIA HẠN HỌC PHÍ', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCKT"}]'::jsonb, '["QUY TRÌNH GIA HẠN HỌC PHÍ.pdf"]'::jsonb, '["QT.TCKT.10 - 03.png","QT.TCKT.10 - 04.png","QT.TCKT.10 - 05.png","QT.TCKT.10 - 06.png"]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-ed425502a47a38b5', 'group-f36c1e679a', 'QUY TRÌNH HẠCH TOÁN BẢO HIỂM XÃ HỘI CỦA NHÂN VIÊN VÀO GIÁ THÀNH', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCKT"}]'::jsonb, '["QUY TRÌNH HẠCH TOÁN BẢO HIỂM XÃ HỘI CỦA NHÂN VIÊN VÀO GIÁ THÀNH.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-a1484f600e88360c', 'group-f36c1e679a', 'QUY TRÌNH KÊ KHAI VÀ NỘP THUẾ TNDN SAU KHI QUYẾT TOÁN TÀI CHÍNH NĂM', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCKT"}]'::jsonb, '["thông tư 2002014BTC áp dụng cho đơn vị kế toán doanh nghiệp.pdf","Quy trình tổng hợp quyết toán tài chính doanh nghiệp.pdf","QUY TRÌNH KÊ KHAI VÀ NỘP THUẾ TNDN SAU KHI QUYẾT TOÁN TÀI CHÍNH NĂM.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-b9fc5a7d9bf10d89', 'group-f36c1e679a', 'Quy trình làm việc của thủ quỹ', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCKT"}]'::jsonb, '["Quy trình làm việc của thủ quỹ.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-61c8979f810805c8', 'group-f36c1e679a', 'QUY TRÌNH PHÂN BỔ TÀI SẢN CỐ ĐỊNH, CÔNG CỤ DỤNG CỤ, PHÂN BỔ DÀI HẠN', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCKT"}]'::jsonb, '["Quy trình phân bổ, xác định TSCĐ.pdf","Quy trình xác định, phân bổ công cụ dụng cụ (CCDC).pdf","Quy trình xác định, phân bổ dài hạn.pdf","QUY TRÌNH PHÂN BỔ TÀI SẢN CỐ ĐỊNH, CÔNG CỤ DỤNG CỤ, PHÂN BỔ DÀI HẠN.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-1f4c1ca56efb1c1b', 'group-f36c1e679a', 'QUY TRÌNH QUẢN LÝ CÔNG NỢ SINH VIÊN', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCKT"}]'::jsonb, '["QT.TCKT.13- 1.pdf","QUY TRÌNH QUẢN LÝ CÔNG NỢ SINH VIÊN.pdf"]'::jsonb, '["QT.TCKT.13- 10.png","QT.TCKT.13- 2.png","QT.TCKT.13- 8.png","QT.TCKT.13- 9.png","QT.TCKT.13-3.png","QT.TCKT.13-7.png"]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-ffc87ecc4b2714b6', 'group-f36c1e679a', 'QUY TRÌNH THU HỌC PHÍ VÀ LỆ PHÍ SINH VIÊN', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCKT"}]'::jsonb, '["Thông báo nộp học phí của mỗi học kỳ trong mỗi năm học.pdf","Nghị định 702025NĐ-Cp sửa đổi một số điều của NĐ số 1232020NĐ-CP ngày 19102020 quy định về hóa đơn, chứng từ.pdf","Quy trình lập kế hoạch thu học phí trong phần mềm thu phí ASC.pdf","Lập kế hoạch thu các khoản lệ phí, bảo hiểm.pdf","Quy trình thu học phí, lệ phí, bảo hiểm y tế, bảo hiểm tai nạn bằng tiền mặt.pdf","QUYTRN~1.PDF","Quy trình thu học phí của Sinh viên nhập học.pdf","QUY TRÌNH THU HỌC PHÍ VÀ LỆ PHÍ SINH VIÊN.pdf","Luật Giáo dục đại học số 342018QH14 (sửa đổi, bổ sung).pdf","Nghị định 1232020NĐ-CP quy định về hóa đơn, chứng từ.pdf","Thông tư 782021TT-BTC về hóa đơn điện tử.pdf"]'::jsonb, '["Màng hình các bước vào Lập kế hoạch thu học phí - Tín chỉ.png","Màng hình khi hoàn thành Lập kế hoạch thu học phí - Tín chỉ.png","Màng hình Tạo kế hoạch thu - Tín chỉ.png","Cách vào màng hình tạo khoản thu ngoài học phí.png","Màng hình hoàn thành việc lập Kế hoạch thu Lệ phí, Bảo hiểm.png","Màng hình lập Kế hoạch thu chung.png","Màng hình tạo mới khoản thu ngoài học phí.png","Màng hình vào kế hoạch thu chung.png","QT.TCKT - 02.03-1.png","QT.TCKT -02.03-2.png","QT.TCKT -02.03-3.png","QT.TCKT -02.03-4.png","QT.TCKT -02.03-5.png","QT.TCKT -02.03-6.png","QT.TCKT -02.03-7.png","QT.TCKT -02.04-1.png","QT.TCKT -02.04-2.png","QT.TCKT -02.04-3.png","QT.TCKT -02.04-4.jpg","QT.TCKT -02.04-5.png","QT.TCKT -02.05-1.png","QT.TCKT -02.05-2.png","QT.TCKT -02.05-3.png"]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-32a34354e9845775', 'group-f36c1e679a', 'QUY TRÌNH QUẢN LÝ TIỀN GỬI TIẾT KIỆM', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCKT"}]'::jsonb, '["Quy trình mở hợp đồng tiền gửi.pdf","Quy trình đóng hợp đồng tiền gửi.pdf","Quy trình tái tục hợp đồng tiền gửi.pdf","QUY TRÌNH QUẢN LÝ TIỀN GỬI TIẾT KIỆM.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-ca30d88d244b6f69', 'group-f36c1e679a', 'QUY TRÌNH THANH QUYẾT TOÁN', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCKT"}]'::jsonb, '["Quy trình tạm ứng.pdf","Quy chế chi tiêu nội bộ của Trường Đại học Kiến Trúc Đà Nẵng năm 2022.pdf","Quy trình thanh toán tham gia hội nghị, hội thảo.pdf","Quy trình thanh toán kinh phí hỗ trợ tham gia bồi dưỡng, tập huấn.pdf","Quy trình thanh toán công tác phí trong nước.pdf","Quy trình thanh toán mua sắm hàng hóa, dịch vụ, sửa chữa thông qua phòng QLTB.pdf","Luật kế toán - Quy định về chứng từ, lưu trữ, kế toán tài sản.pdf","Quy trình thanh toán mua sắm hàng hóa, dịch vụ.pdf","QUY TRÌNH THANH QUYẾT TOÁN.pdf","Bộ luật Lao động 2019 (452019QH14) Quy định về tiền lương, phụ cấp, các khoản thanh toán cho người lao động.pdf","Luật kế toán số 882015QH13.pdf","Luật quản lý thuế số 382019QH14.pdf","Nghị định 1232020NĐ-CP Về hóa đơn – chứng từ điện tử (quy định chung) – đi cùng TT 782021TT-BTC.pdf","Nghị định 174 quy định một số điều của luật kế toán số 882015QH13.pdf","Thông tư 2192013TT-BTC Hướng dẫn thực hiện thuế GTGT, bao gồm nguyên tắc hóa đơn đầu vào.pdf","Thông tư 782021TT-BTC hướng dẫn luật quản lý thuế.pdf","Thông tư 802021TT-BTC hướng dẫn chi tiết thi hành luật quản lý thuế số 382019.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-6296185d7476dffc', 'group-f36c1e679a', 'Quy trình thanh toán kinh phí tổ chức hội nghị, hội thảo', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCKT"}]'::jsonb, '["Thông tư 1112013TT-BTC Hướng dẫn thuế TNCN khấu trừ, giảm trừ gia cảnh, thời điểm kê khai.pdf","Thông tư 962015TT-BTC Hướng dẫn thuế TNDN chi phí hợp lý, khống chế mức chi, các khoản không được tính vào chi phí.pdf","Quy trình thanh toán kinh phí tổ chức hội nghị, hội thảo.pdf","Hướng dẫn luật quản lý thuế.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-9a2c0f6670856e01', 'group-f36c1e679a', 'QUY TRÌNH THU LỆ PHÍ THI CHUẨN ĐẦU RA', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCKT"}]'::jsonb, '["QUY TRÌNH THU LỆ PHÍ THI CHUẨN ĐẦU RA.pdf","Thông báo lịch thi chuẩn đầu ra.pdf"]'::jsonb, '["QT.TCKT .15 - 2.png","QT.TCKT .15- 4.png","QT.TCKT.15 - 5.png","QT.TCKT.15- 3.png","QT.TCKT.15-1.png"]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-9e37e055336054fd', 'group-f36c1e679a', 'Quy trình tiến hành kê khai thuế giá trị gia tăng', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCKT"}]'::jsonb, '["Quy trình tiến hành kê khai thuế giá trị gia tăng.pdf","Cơ sở pháp lý chung cho hoạt động kê khai, hoàn thuế và nộp thuế GTGT.pdf","Hướng dẫn quản lý thuế, mẫu tờ khai thuế GTGT (mẫu 01GTGT, 04GTGT, …).pdf","Hướng dẫn áp dụng hóa đơn điện tử trong kê khai và nộp thuế GTGT.pdf","Nghị định 2092013NĐ-CP (và sửa đổi bởi NĐ 122015, 1462017...).pdf","Quy định chung về đối tượng chịu thuế, phương pháp tính thuế, thuế suất GTGT.pdf","Quy định thời hạn, phương thức kê khai và nộp thuế GTGT theo quý hoặc theo tháng.pdf","Thông tư 2192013TT-BTC (sửa đổi bổ sung bởi Thông tư 262015TT-BTC, TT 782021TT-BTC…).pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-e419a77462680f13', 'group-f36c1e679a', 'Quy trình tiến hành kê khai thuế thu nhập cá nhân hàng năm', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCKT"}]'::jsonb, '["Quy trình tiến hành kê khai thuế thu nhập cá nhân hàng năm.pdf","Hướng dẫn chi tiết giảm trừ, miễn thuế, cư trú.pdf","Hướng dẫn tờ khai quyết toán thuế TNCN năm.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-f0cbdb70a9ffaf0e', 'group-f36c1e679a', 'Quy trình tiến hành kê khai thuế thu nhập cá nhân hàng quý', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCKT"}]'::jsonb, '["Quy định chung về nghĩa vụ kê khai, nộp thuế.pdf","Quy định thời hạn, phương thức kê khai thuế.pdf","Đăng ký mã số thuế.pdf","Đăng ký người phụ thuộc.pdf","Quy trình tiến hành kê khai thuế thu nhập cá nhân hàng quý.pdf","Hướng dẫn chi tiết về giảm trừ, khấu trừ thuế TNCN.pdf","Hướng dẫn về tờ khai thuế TNCN theo quý (Mẫu 05KK-TNCN).pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-6dc9cdaa495fcccd', 'group-f36c1e679a', 'Quy trình tiến hành kê khai thuế thu nhập cá nhân từ đầu tư vốn', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCKT"}]'::jsonb, '["Quy trình tiến hành kê khai thuế thu nhập cá nhân từ đầu tư vốn.pdf","Căn cứ pháp lý chung quy định nghĩa vụ kê khai, nộp thuế TNCN.pdf","Hướng dẫn chi tiết về thu nhập từ đầu tư vốn, thuế suất 5_, miễn giảm thuế.pdf","Hướng dẫn mẫu tờ khai 06KK-TNCN đối với tổ chức trả thu nhập từ đầu tư vốn.pdf","Quy định về thời hạn kê khai và nộp thuế theo quý đối với thuế TNCN khấu trừ tại nguồn.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-973ed4f571773a37', 'group-f36c1e679a', 'QUY TRÌNH TÍNH VÀ THANH TOÁN LƯƠNG', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCKT"}]'::jsonb, '["QUY TRÌNH TÍNH VÀ THANH TOÁN LƯƠNG.pdf","412024QH15 LUẬT BẢO HIỂM XÃ HỘI.pdf","452019QH14 Bộ Luật Lao Động.pdf","Nghị định 1452020NĐ-CP Hướng dẫn tính lương làm thêm giờ.pdf","Nghị định số 742024 Quy định mức lương tối thiểu.pdf","Thông tư 1112013 hướng dẫn thực hiện luật thuế Thu Nhập Cá Nhân.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-392ed47261e14436', 'group-f36c1e679a', 'QUY TRÌNH XÁC NHẬN CÔNG NỢ HỌC PHÍ CHO SINH VIÊN RA TRƯỜNG', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCKT"}]'::jsonb, '["QUY TRÌNH XÁC NHẬN CÔNG NỢ HỌC PHÍ CHO SINH VIÊN RA TRƯỜNG.pdf"]'::jsonb, '["QT.TCKT.11-2.png","QT.TCKT.11-3.png"]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

-- Department: P.TCNS
INSERT INTO public.process_groups (id, department, label, x, y, width, height) VALUES 
('group-60d8bfa7fb', 'P.TCNS', 'Danh mục quy trình', 100, 100, 1000, 1350)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-4d94b8868910c4c1', 'group-60d8bfa7fb', 'QUY TRÌNH GIẢI QUYẾT CHẾ ĐỘ ỐM ĐAU VÀ THAI SẢN', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCNS"}]'::jsonb, '["QUY TRÌNH GIẢI QUYẾT CHẾ ĐỘ ỐM ĐAU VÀ THAI SẢN.pdf","Hướng dẫn Luật Bảo hiểm xã hội về BHXH bắt buộc.pdf","Luật Bảo hiểm xã hội.pdf","NGHỊ ĐỊNH CỦA CHÍNH PHỦ.pdf","QĐ Ban hành Quy trình giải quyết hưởng các chế độ BHXH, chi trả các chế độ BHXH, BHTN.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-6c6060af9ea2e86e', 'group-60d8bfa7fb', 'Quy trình kết thúc Hợp đồng Lao động đối với GVNV', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCNS"}]'::jsonb, '["Quy trình kết thúc Hợp đồng Lao động đối với GVNV.pdf","Bộ luật Lao động năm 2019.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-0b26e71cc2906033', 'group-60d8bfa7fb', 'QUY TRÌNH QUẢN LÝ ĐÓNG BẢO HIỂM XÃ HỘI BẮT BUỘC', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCNS"}]'::jsonb, '["QUY TRÌNH QUẢN LÝ ĐÓNG BẢO HIỂM XÃ HỘI BẮT BUỘC.pdf","Luật Giáo dục đại học số 42-VBHN-VPQH.pdf","Nghị định số 74-CP Quy định MLTT đối với người lao động làm việc theo HĐLĐ.pdf","Quy trình BHXH & Chi tiêu nội bộ 2022 của Trường Đại học Kiến trúc Đà Nẵng.pdf","Quy định chi tiết Luật Giáo dục đại học (Nghị định 99).pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-c060535f5313d1bb', 'group-60d8bfa7fb', 'QUY TRÌNH THANH TOÁN TIỀN LƯƠNG', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCNS"}]'::jsonb, '["QUY TRÌNH THANH TOÁN TIỀN LƯƠNG.pdf","Bộ luật Lao động 2019.pdf","Quy chế chi tiêu nội bộ Năm 2022 của trường ĐHKT Đà Nẵng (Kèm quyết định).pdf","Thông tư hướng dẫn thực hiện Luật thuế TNCN.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-43da4a3c2179d1d1', 'group-60d8bfa7fb', 'Quy trình tuyển dụng nhân viên', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCNS"}]'::jsonb, '["Quy trình tuyển dụng nhân viên.pdf","Bộ Luật Lao động năm 2024.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-012f9026c22de37e', 'group-60d8bfa7fb', 'Quy trình đề nghị được hưởng phụ cấp trình độ', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCNS"}]'::jsonb, '["Quyết định số 2702006QĐ-TTg ngày 27112006 của Thủ tướng Chính phủ về việc thành lập Trường Đại học Kiến trúc Đà Nẵng.pdf","Quy trình đề nghị được hưởng phụ cấp trình độ.pdf","Quy chế chi tiêu nội bộ.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-d0d6ea3dfe4d1e97', 'group-60d8bfa7fb', 'Quy trình tuyển dụng, đào tạo và bồi dưỡng giảng viên cơ hữu', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCNS"}]'::jsonb, '["Quy trình tuyển dụng, đào tạo và bồi dưỡng giảng viên cơ hữu.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-341a6de76fca02fe', 'group-60d8bfa7fb', 'Quy trình về đánh giá mức độ hoàn thành nhiệm vụ đối với cá nhân và tập thể', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCNS"}]'::jsonb, '["Quy trình về đánh giá mức độ hoàn thành nhiệm vụ đối với cá nhân và tập thể.pdf","quyết định số 2702006QĐ-TTg ngày 27112006 của Thủ tướng Chính phủ về việc thành lập Trường Đại học Kiến trúc Đà Nẵng.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-227e8a35dd6d2392', 'group-60d8bfa7fb', 'Quy định về Thi đua Khen thưởng và Kỷ luật đối với cá nhân và Tập thể', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TCNS"}]'::jsonb, '["Quy định về Thi đua Khen thưởng và Kỷ luật đối với cá nhân và Tập thể.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

-- Department: P.TTPC
INSERT INTO public.process_groups (id, department, label, x, y, width, height) VALUES 
('group-dd94d49ad6', 'P.TTPC', 'Danh mục quy trình', 100, 100, 1000, 900)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-a7d2247b8f68eeab', 'group-dd94d49ad6', 'QUY TRÌNH CUỘC TIẾP CÔNG DÂN', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TTPC"}]'::jsonb, '["QUY TRÌNH CUỘC TIẾP CÔNG DÂN.pdf","THÔNG TƯ Số 04.2021.TT-TTCР ngày 01 tháng 10 năm 2021 của Thanh tra Chính phủ.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-0b150221893ecf29', 'group-dd94d49ad6', 'QUY TRÌNH GIẢI QUYẾT KHIẾU NẠI', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TTPC"}]'::jsonb, '["QUY TRÌNH GIẢI QUYẾT KHIẾU NẠI.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-86894a724cdbbeaa', 'group-dd94d49ad6', 'QUY TRÌNH GIẢI QUYẾT TỐ CÁO', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TTPC"}]'::jsonb, '["QUY TRÌNH GIẢI QUYẾT TỐ CÁO.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-a2a42def7938798a', 'group-dd94d49ad6', 'QUY TRÌNH KIỂM TRA', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TTPC"}]'::jsonb, '["QUY TRÌNH KIỂM TRA.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-0c5f5f1958eb5421', 'group-dd94d49ad6', 'QUY TRÌNH THANH TRA', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TTPC"}]'::jsonb, '["QUY TRÌNH THANH TRA.pdf","Thông tư số 06.2021TT-TTCP của Thanh tra Chính phủ.pdf","Thông tư số 28.2024TT-BGDĐT của Bộ Giáo dục và Đào tạo.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-7f207acf7aa1f17b', 'group-dd94d49ad6', 'QUY TRÌNH THANH TRA TUYỂN SINH', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.TTPC"}]'::jsonb, '["QUY TRÌNH THANH TRA TUYỂN SINH.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

-- Department: P.Tuyensinh
INSERT INTO public.process_groups (id, department, label, x, y, width, height) VALUES 
('group-c4952987cf', 'P.Tuyensinh', 'Danh mục quy trình', 100, 100, 1000, 600)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-6abab5fa7ada3373', 'group-c4952987cf', 'Quy trình tổ chức kỳ thi ĐGNLMT (nội dung 1 - Thi trắc nghiệm)', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.Tuyensinh"}]'::jsonb, '["Quy trình tổ chức kỳ thi ĐGNLMT (nội dung 1 - Thi trắc nghiệm).pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-4cc104c083309410', 'group-c4952987cf', 'Soạn công văn gửi các bên liên quan về việc tổ chức kỳ thi ĐGNLMT', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.Tuyensinh"}]'::jsonb, '["Soạn công văn gửi các bên liên quan về việc tổ chức kỳ thi ĐGNLMT.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.processes (id, group_id, title, steps, step_details, documents, forms, status) VALUES 
('proc-2f22e4b64b5b865e', 'group-c4952987cf', 'Xây dựng Đề án tuyển sinh', '["Xem chi tiết quy trình"]'::jsonb, '[{"description":"Đính kèm tài liệu","actor":"P.Tuyensinh"}]'::jsonb, '["Xây dựng Đề án tuyển sinh.pdf"]'::jsonb, '[]'::jsonb, 'completed')
ON CONFLICT (id) DO NOTHING;

