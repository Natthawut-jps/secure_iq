# Secure IQ

ระบบจัดการเนื้อหาออนไลน์ที่มีความปลอดภัยสูง พร้อมระบบ authentication และการจัดการผู้ใช้

## โครงสร้างโปรเจกต์

โปรเจกต์นี้ประกอบด้วย 2 ส่วนหลัก:

- **secure-iq.backend** - Backend API สร้างด้วย NestJS + Prisma
- **secure-iq.frontend** - Frontend Web App สร้างด้วย Next.js 16 + Tailwind CSS

## เทคโนโลยีที่ใช้

### Backend
- [NestJS](https://nestjs.com/) - Framework สำหรับ Node.js
- [Prisma](https://www.prisma.io/) - ORM สำหรับจัดการฐานข้อมูล
- [JWT](https://jwt.io/) - ระบบยืนยันตัวตน
- [bcrypt](https://www.npmjs.com/package/bcrypt) - การเข้ารหัสรหัสผ่าน
- [Resend](https://resend.com/) - ส่งอีเมล

### Frontend
- [Next.js 16](https://nextjs.org/) - React Framework
- [React 19](https://react.dev/) - UI Library
- [Tailwind CSS v4](https://tailwindcss.com/) - CSS Framework
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Lucide React](https://lucide.dev/) - Icons

## ฟีเจอร์หลัก

- 🔐 **ระบบ Authentication** - Login/Register พร้อม JWT Token
- 👤 **จัดการผู้ใช้** - User management system
- 📝 **จัดการโพสต์** - สร้าง แก้ไข ลบ เนื้อหา
- 🎨 **Dashboard UI** - อินเทอร์เฟซที่ใช้งานง่าย
- 📧 **ส่งอีเมล** - ระบบส่งอีเมลผ่าน Resend
- 🔒 **ความปลอดภัย** - การเข้ารหัสและการยืนยันตัวตน

## เริ่มต้นใช้งาน

### ความต้องการ
- Node.js 20+
- npm หรือ yarn

### การติดตั้ง

1. Clone โปรเจกต์:
```bash
git clone <repository-url>
cd secure-iq
```

2. ติดตั้ง dependencies สำหรับ Backend:
```bash
cd secure-iq.backend
npm install
```

3. ติดตั้ง dependencies สำหรับ Frontend:
```bash
cd ../secure-iq.frontend
npm install
```

### การตั้งค่า Environment Variables

#### Backend (`secure-iq.backend/.env`)
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
RESEND_API_KEY="your-resend-api-key"
```

#### Frontend (`secure-iq.frontend/.env`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### รันโปรเจกต์

#### Development Mode

**Backend:**
```bash
cd secure-iq.backend
npm run start:dev
```

**Frontend:**
```bash
cd secure-iq.frontend
npm run dev
```

- Backend จะรันที่ `http://localhost:3001`
- Frontend จะรันที่ `http://localhost:3000`

#### Production Mode

**Backend:**
```bash
cd secure-iq.backend
npm run build
npm run start:prod
```

**Frontend:**
```bash
cd secure-iq.frontend
npm run build
npm start
```

### Docker

สามารถ build Docker image ได้จาก Dockerfile ในแต่ละโฟลเดอร์:

```bash
# Backend
cd secure-iq.backend
docker build -t secure-iq-backend .

# Frontend
cd secure-iq.frontend
docker build -t secure-iq-frontend .
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/login | เข้าสู่ระบบ |
| POST | /auth/register | สมัครสมาชิก |
| GET | /auth/me | ดูข้อมูลผู้ใช้ปัจจุบัน |
| GET | /users | รายการผู้ใช้ |
| GET | /users/:id | ข้อมูลผู้ใช้ |
| PATCH | /users/:id | อัปเดตผู้ใช้ |
| DELETE | /users/:id | ลบผู้ใช้ |
| GET | /posts | รายการโพสต์ |
| POST | /posts | สร้างโพสต์ใหม่ |
| GET | /posts/:id | ดูโพสต์ |
| PATCH | /posts/:id | แก้ไขโพสต์ |
| DELETE | /posts/:id | ลบโพสต์ |

## โครงสร้างโฟลเดอร์

```
secure-iq/
├── secure-iq.backend/          # NestJS Backend
│   ├── src/
│   │   ├── modules/             # Auth, User, Post modules
│   │   ├── common/              # Utilities & guards
│   │   └── main.ts              # Entry point
│   ├── prisma/                  # Database schema
│   └── Dockerfile
│
└── secure-iq.frontend/          # Next.js Frontend
    ├── app/                     # App Router
    │   ├── dashboard/           # Dashboard pages
    │   ├── login/               # Login page
    │   └── signup/              # Signup page
    ├── components/              # React components
    └── Dockerfile
```

## การทดสอบ

**Backend Unit Tests:**
```bash
cd secure-iq.backend
npm run test
```

**Backend E2E Tests:**
```bash
npm run test:e2e
```

**Backend Coverage:**
```bash
npm run test:cov
```

## License

UNLICENSED
