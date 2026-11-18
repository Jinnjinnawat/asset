# ระบบตรวจสอบครุภัณฑ์

เว็บแอปสำหรับดูภาพรวมและติดตามการตรวจสอบครุภัณฑ์ พัฒนาด้วย Next.js App Router และ TypeScript

## โครงสร้างโปรเจกต์

```text
app/
  (operator)/               หน้าสำหรับลงทะเบียนและตรวจสอบ
    assets/new/page.tsx     หน้าเลือกงานที่ URL /assets/new
  (viewer)/                 หน้าสำหรับผู้ดูภาพรวม (ชื่อกลุ่มไม่อยู่ใน URL)
    dashboard/page.tsx      หน้าภาพรวมที่ URL /dashboard
    layout.tsx              ส่วนหัวและกรอบหน้าสำหรับกลุ่ม viewer
  globals.css               สไตล์หลักของทั้งแอป
  layout.tsx                Root layout และ metadata
  page.tsx                  หน้าแรกที่ URL /

components/
  layout/                   ส่วนหัวและเมนูที่ใช้จัดหน้า
  ui/                       คอมโพเนนต์พื้นฐานที่ใช้ซ้ำ เช่น Card

features/
  assets/                   ตารางครุภัณฑ์, ป้ายสถานะ และชนิดข้อมูลครุภัณฑ์
  audit/                    แผงประวัติการเปลี่ยนแปลงและชนิดข้อมูล
  dashboard/                การ์ดสรุป, ตัวกรอง และข้อมูลตัวอย่างของภาพรวม

lib/
  utils.ts                  ฟังก์ชันช่วยทั่วไป เช่น รวม class ของ Tailwind
```

## วิธีตามการทำงานของหน้า Dashboard

1. Next.js จับคู่ `/dashboard` กับ `app/(viewer)/dashboard/page.tsx` โดยละชื่อ `(viewer)` ออกจาก URL
2. `app/(viewer)/layout.tsx` ครอบหน้าด้วยหัวเว็บและเมนู
3. หน้าเรียกข้อมูลตัวอย่างและคอมโพเนนต์จาก `features/dashboard`, `features/assets` และ `features/audit`
4. แต่ละ feature เก็บส่วนแสดงผลไว้ใน `components/`, ชนิดข้อมูลไว้ใน `types.ts` และเปิด export ที่ `index.ts`

## แนวทางเพิ่มโค้ด

- เพิ่ม route หรือ layout ที่ผูกกับ URL ใน `app/`
- เพิ่มส่วน UI ที่ใช้ได้หลาย feature ใน `components/`
- เพิ่มโค้ดเฉพาะงานไว้ใน `features/<ชื่อฟีเจอร์>/`
- วางชนิดข้อมูลของฟีเจอร์ใน `features/<ชื่อฟีเจอร์>/types.ts` เพื่อให้ข้อมูลไม่ต้อง import type จากไฟล์ UI
- หากต้องการให้ไฟล์ภายนอกเรียกใช้ ให้ export ผ่าน `features/<ชื่อฟีเจอร์>/index.ts`

## เริ่มต้นใช้งาน

```bash
npm run dev
```

เปิด `http://localhost:3000` สำหรับหน้าแรก หรือ `http://localhost:3000/dashboard` สำหรับภาพรวม
