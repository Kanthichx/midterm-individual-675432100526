# Library Management System - Layered Architecture

## 📋 Project Information
- **Student Name:** [นางสาว กันติชา เกิดสี]
- **Student ID:** [675432100526]
- **Course:** ENGSE207 Software Architecture

## 🏗️ Architecture Style
Layered Architecture (3-tier)
```
## 📂 Project Structure
[อธิบายโครงสร้างโฟลเดอร์]
midterm-individual-675432100526/
├── server.js                  # Entry point ของระบบ
├── package.json
├── library.db                 # SQLite Database
├── public/                    # Frontend (Presentation UI)
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── api.js             # API Client
│       └── app.js             # UI Logic
└── src/
    ├── presentation/
    │   ├── controllers/       # HTTP Controllers
    │   ├── routes/            # API Routes
    │   └── middlewares/       # Error handling
    ├── business/
    │   ├── services/          # Business Logic
    │   └── validators/        # Input Validation
    └── data/
        ├── repositories/      # Database Access
        └── database/          # DB Connection
```
## 🎯 Refactoring Summary

### ปัญหาของ Monolithic (เดิม):
- [ระบุปัญหา 3-5 ข้อ]
- 1.โค้ดทั้งหมดอยู่ในไฟล์เดียว ทำให้ไฟล์มีขนาดใหญ่และอ่านยาก
- 2.Business Logic ปนกับ HTTP Request/Response
- 3.แก้ไขโค้ดส่วนหนึ่งอาจกระทบส่วนอื่นโดยไม่ตั้งใจ
- 4.ทดสอบ (Testing) และ Debug ทำได้ยาก
- 5.ไม่เหมาะกับการขยายระบบในอนาคต

### วิธีแก้ไขด้วย Layered Architecture:
- [อธิบายวิธีแก้แต่ละปัญหา]
- 1.แยก Presentation Layer สำหรับจัดการ HTTP และ Routing
- 2.แยก Business Layer สำหรับกฎทางธุรกิจและ Validation
- 3.แยก Data Access Layer สำหรับการติดต่อฐานข้อมูล
- 4.ใช้แนวคิด Separation of Concerns อย่างชัดเจน
- 5.กำหนดหน้าที่ของแต่ละ Layer ให้ไม่ซ้อนทับกัน
### ประโยชน์ที่ได้รับ:
- [ระบุประโยชน์ 3-5 ข้อ]
- 1.โค้ดอ่านง่าย เป็นระเบียบ และเข้าใจง่าย
- 2.ดูแลรักษาและแก้ไขโค้ดได้ง่ายขึ้น
- 3.ลดผลกระทบเมื่อมีการเปลี่ยนแปลงระบบ
- 4.รองรับการขยายระบบในอนาคต
- 5.สอดคล้องกับหลัก Software Architecture ที่ถูกต้อง

## 🚀 How to Run

```
# 1. Clone repository
git clone [your-repo-url]

# 2. Install dependencies
npm install

# 3. Run server
npm start

# 4. Test API
# Open browser: http://localhost:3000
```

## 📝 API Endpoints
[ระบุ API endpoints ทั้งหมด]/////
| Method | Endpoint                | Description             |
| ------ | ----------------------- | ----------------------- |
| GET    | `/api/books`            | ดึงข้อมูลหนังสือทั้งหมด        |
| GET    | `/api/books/:id`        | ดึงข้อมูลหนังสือตาม ID       |
| POST   | `/api/books`            | เพิ่มหนังสือใหม่             |
| PUT    | `/api/books/:id`        | แก้ไขข้อมูลหนังสือ           |
| PATCH  | `/api/books/:id/borrow` | ยืมหนังสือ                 |
| PATCH  | `/api/books/:id/return` | คืนหนังสือ                 |
| DELETE | `/api/books/:id`        | ลบหนังสือ                 |
