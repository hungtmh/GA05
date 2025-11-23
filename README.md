# GA05 – Enhanced Shipping Form (Vietnam Shipping Address Module)

## 📦 Giới thiệu Dự án

**GA05** là module giao diện client-side được xây dựng bằng **ReactJS**, hỗ trợ nhập địa chỉ giao hàng theo chuẩn địa chính Việt Nam. Dự án cung cấp biểu mẫu thân thiện, có tính năng kiểm tra lỗi tức thì, dropdown phụ thuộc (Tỉnh → Phường), và modal xác nhận thông tin.

Công nghệ sử dụng:

* ⚛ **ReactJS**
* 🎨 **Tailwind CSS**
* 📋 **React Hook Form**
* 📁 Dữ liệu địa chính Việt Nam (Province/Ward) dạng JSON

---

## 🚀 Tính năng chính

### 1. **Form nhập địa chỉ giao hàng**

* Số nhà
* Tên đường
* Tỉnh/Thành phố
* Phường/Xã (phụ thuộc tỉnh/thành)
* Kiểm tra lỗi theo thời gian thực

### 2. **Dropdown phụ thuộc (Dependent Dropdowns)**

* Khi chọn Tỉnh/Thành phố → danh sách Phường/Xã tự động lọc theo `parentCode`
* Danh sách Phường/Xã được sắp xếp theo alphabet tiếng Việt

### 3. **Validation mạnh mẽ (React Hook Form)**

* Số nhà: bắt buộc và chỉ nhận số
* Tên đường: tối thiểu 3 ký tự
* Tỉnh & Phường: bắt buộc chọn

### 4. **Modal xác nhận thông tin**

* Hiển thị tóm tắt toàn bộ thông tin đã nhập
* Tự động tạo **Full Address** dạng:

```
[House Number], [Street], [Ward Name], [Province Name]
```

* Hai hành động: **Cancel** (quay lại chỉnh) / **Confirm** (reset form)

### 5. **Reset form thông minh**

* Sau khi Confirm → form được xóa trắng
* Danh sách Phường được reset về rỗng

---

## 📂 Cấu trúc thư mục dự án

```
GA05/
├── src/
│   ├── components/
│   │   └── EnhancedShippingForm.jsx
│   ├── data/
│   │   ├── provinces.json
│   │   └── wards.json
│   ├── App.jsx
│   └── index.js
├── public/
├── package.json
└── README.md
```

---

## 🛠 Cách chạy dự án

### 1. Cài đặt package

```
npm install
```

### 2. Chạy ứng dụng 

```
npm run dev
```

---

## 🔧 Cách sử dụng module

Import component vào ứng dụng:

```jsx
import EnhancedShippingForm from "./components/EnhancedShippingForm";

function App() {
  return <EnhancedShippingForm />;
}

export default App;
```

---

## 🧪 Kiểm thử

* Kiểm tra validation của từng field
* Kiểm tra logic phụ thuộc Tỉnh → Phường
* Kiểm tra hiển thị Full Address
* Kiểm tra reset form sau khi Confirm

---

## 🗺 Roadmap

* Thêm tự động gợi ý địa chỉ (autocomplete)
* Tối ưu hiệu năng render
* Tách dropdown thành component tái sử dụng
* Hỗ trợ thêm Quận/Huyện (nếu mở rộng)

---

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo Pull Request hoặc Issue.

---

## 📄 Giấy phép

Dự án được phát hành theo giấy phép **MIT License**.

---

## 👤 Tác giả

**hungtmh**

* GitHub: [https://github.com/hungtmh](https://github.com/hungtmh)

---

Nếu bạn cần thêm phần **hướng dẫn triển khai**, **screenshot UI**, hoặc **diagram**, hãy yêu cầu để mình bổ sung!
