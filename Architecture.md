# 📚 Library Management System – Architecture Documentation

---

## 📋 Project Information
- **Student Name:** นางสาว กันติชา เกิดสี  
- **Student ID:** 675432100526  
- **Course:** ENGSE207 Software Architecture  
- **System:** Library Management System  
- **Architecture Style:** Layered Architecture (3-Tier)

---

## 🎯 System Overview
ระบบ **Library Management System** เป็นระบบสำหรับจัดการหนังสือภายในห้องสมุด  
รองรับการเพิ่ม แก้ไข ลบ ยืม และคืนหนังสือ พร้อมแสดงสถิติการใช้งาน  
ระบบถูกออกแบบตามแนวคิด **Layered Architecture** เพื่อให้โค้ดเป็นระเบียบ ดูแลรักษาง่าย และขยายระบบในอนาคตได้

---

## 🏗️ Architecture Style
**Layered Architecture (3-Tier Architecture)**  
ประกอบด้วย
1. Presentation Layer  
2. Business Logic Layer  
3. Data Access Layer  

---

## 📂 Project Structure
```
midterm-individual-675432100526/
├── server.js
├── package.json
├── library.db
├── public/
│   ├── index.html
│   ├── css/style.css
│   └── js/
│       ├── api.js
│       └── app.js
└── src/
    ├── presentation/
    │   ├── controllers/
    │   ├── routes/
    │   └── middlewares/
    ├── business/
    │   ├── services/
    │   └── validators/
    └── data/
        ├── repositories/
        └── database/
```

---

## 🧩 C1: System Context Diagram
```
Library User (Browser)
        |
        | HTTP / JSON
        v
Library Management System
        |
        | SQL
        v
SQLite Database (library.db)
```

---

## 🏗️ C2: Container Diagram – Layered Architecture
```
Client (Browser)
        |
        v
Presentation Layer
(Routes, Controllers)
        |
        v
Business Logic Layer
(Services, Validators)
        |
        v
Data Access Layer
(Repositories)
        |
        v
SQLite Database
```

---

## 📝 Responsibilities of Each Layer

### 1️⃣ Presentation Layer
**หน้าที่**
- รับ HTTP Request / Response  
- Routing และ Controller  
- จัดการ Error  

**ไฟล์**
- bookRoutes.js  
- bookController.js  
- errorHandler.js  

**ห้ามทำ**
- ❌ เขียน SQL  
- ❌ เขียน Business Logic  

---

### 2️⃣ Business Logic Layer
**หน้าที่**
- Validation  
- บังคับใช้กฎทางธุรกิจ  
- ประมวลผลการยืม/คืนหนังสือ  

**ไฟล์**
- bookService.js  
- bookValidator.js  

**Business Rules**
- ต้องมี title, author, isbn  
- หนังสือที่ถูกยืมแล้วไม่สามารถยืมซ้ำ  
- คืนหนังสือต้องเปลี่ยนสถานะเป็น available  

---

### 3️⃣ Data Access Layer
**หน้าที่**
- ติดต่อฐานข้อมูล  
- CRUD Operations  
- แปลงข้อมูลจาก DB เป็น Object  

**ไฟล์**
- bookRepository.js  
- connection.js  

---

## 🎯 Refactoring Summary

### ปัญหาของ Monolithic Architecture (เดิม)
- โค้ดรวมอยู่ไฟล์เดียว อ่านและดูแลยาก  
- Business Logic ปนกับ HTTP  
- แก้ไขโค้ดกระทบทั้งระบบ  
- ทดสอบและ Debug ยาก  

### วิธีแก้ด้วย Layered Architecture
- แยกโค้ดตามหน้าที่ของแต่ละ Layer  
- ใช้หลัก Separation of Concerns  
- ลดการพึ่งพากันระหว่างส่วนต่าง ๆ  

### ประโยชน์ที่ได้รับ
- โค้ดเป็นระเบียบ อ่านง่าย  
- ดูแลรักษาและขยายระบบง่าย  
- ลดความผิดพลาดจากการแก้ไข  

---

## 🔄 Example Flow: Borrow Book
```
Client
 → PATCH /api/books/:id/borrow
Controller
 → Service
 → Repository
 → Database
 ← Updated Book
```

---

## 🚀 How to Run
```bash
npm install
node server.js
```

เปิด Browser:
```
http://localhost:3000
```

---

## 📝 API Endpoints

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | /api/books | ดึงข้อมูลหนังสือทั้งหมด |
| GET | /api/books/:id | ดึงข้อมูลหนังสือตาม ID |
| POST | /api/books | เพิ่มหนังสือใหม่ |
| PUT | /api/books/:id | แก้ไขข้อมูลหนังสือ |
| PATCH | /api/books/:id/borrow | ยืมหนังสือ |
| PATCH | /api/books/:id/return | คืนหนังสือ |
| DELETE | /api/books/:id | ลบหนังสือ |

---

## 📌 Conclusion
โปรเจกต์นี้แสดงการ Refactor ระบบจาก **Monolithic Architecture**  
ไปสู่ **Layered Architecture** อย่างถูกต้องตามหลักวิชาสถาปัตยกรรมซอฟต์แวร์
