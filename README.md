# 🧂 Làng muối Bình Định 2026 — `binhdinh-salt-village`

Website hỗ trợ diêm dân các làng muối Bình Định sau **mùa mưa lũ 2026**.

## 🌊 Vấn đề

Tháng 11/2026, mưa lũ và bão số 9, số 10 đổ bộ Quy Nhơn – Phù Cát – Hoài Nhơn đã phá hủy nặng nề các làng muối **Cát Minh, Cát Khánh** (huyện Phù Cát): ruộng muối ngập bùn, kho muối tan mất trắng, bờ vùng sạt lở. Lũ sông Kôn dâng cao tràn vào vùng muối ven đầm Thị Nại (Tuy Phước), xói lở bờ biển Cát Tiến lấn vào ruộng muối Cát Hải, mất điện diện rộng 3–7 ngày làm tê liệt bơm nước. Hàng trăm hộ diêm dân mất sinh kế và cần kênh kết nối tiêu thụ muối để phục hồi.

**Cập nhật: 09/11/2026** · ⚠️ Dữ liệu mô phỏng – cập nhật 09/11/2026

## ✨ Tính năng

- **5 làng muối**: Cát Minh, Cát Khánh, Cát Hải (Phù Cát), Xuân Tự (Tuy Phước, ven đầm Thị Nại), Nhơn Hải (Quy Nhơn) — hộ dân, diện tích, sản lượng 2026, mức thiệt hại do mưa lũ 2026.
- **Lịch sản xuất theo mùa**: 12 tháng — mùa nắng làm muối (tháng 1–8, cao điểm 3–5), mùa mưa lũ 2026 ngừng sản xuất và khắc phục thiệt hại (tháng 9–12), bấm từng tháng để xem chi tiết.
- **Form kết nối tiêu thụ**: thương lái/doanh nghiệp/nhà hảo tâm đăng ký thu mua muối hoặc hỗ trợ khắc phục lũ — lưu `localStorage`, hiển thị danh sách, xóa từng đăng ký.
- **Bản đồ SVG**: vị trí 5 làng muối trên sơ đồ mô phỏng Phù Cát – Tuy Phước – Quy Nhơn, bấm điểm để xem thông tin (hỗ trợ bàn phím).
- Dữ liệu tải từ `data/mock.json` bằng `fetch`, UI tiếng Việt, responsive 375px và 1440px, trang 404 có hotline HTK.

## 🛠️ Công nghệ

- **Vanilla JavaScript** (HTML + CSS + JS thuần, KHÔNG framework, KHÔNG build step)
- `localStorage` cho form kết nối tiêu thụ
- SVG thuần cho bản đồ
- Deploy tĩnh trên **Vercel** (`cleanUrls`, `trailingSlash: false`)

## 🚀 Cách chạy local

Không cần cài đặt gì. Mở trực tiếp `index.html`, hoặc chạy static server:

```bash
npx serve .
# hoặc
python -m http.server 8000
```

Kiểm tra syntax JS: `node --check app.js`

## 📁 Cấu trúc

```
index.html        # Trang chủ: vấn đề, 5 làng muối, lịch mùa vụ, bản đồ SVG, form kết nối
about.html        # Giới thiệu + block Liên hệ HTK
404.html          # Trang lỗi có hotline HTK
style.css         # Responsive 375px + 1440px
app.js            # Fetch mock.json, render, form localStorage, bản đồ SVG
data/mock.json    # Dữ liệu mô phỏng – cập nhật 09/11/2026
vercel.json       # {"cleanUrls":true,"trailingSlash":false}
```

## 🔗 Deploy

- Vercel: https://binhdinh-salt-village.vercel.app
- GitHub: https://github.com/shirmtry/binhdinh-salt-village

## 📞 Liên hệ HTK – 0396241674 – 09/11/2026

- Tác giả: **HTK**
- Hotline/Zalo: **0396241674** — [tel:0396241674](tel:0396241674) · [https://zalo.me/0396241674](https://zalo.me/0396241674)
- Email: [htk.contact@gmail.com](mailto:htk.contact@gmail.com)

© 2026 HTK · Hotline/Zalo: 0396241674 · Email: htk.contact@gmail.com