# CV & LCV Operations — Yard Management & Outbound Transportation

Interactive dashboard mockup สำหรับ CV/LCV Operations (Overview Dashboard, Motorpool, Transporter) และ Administration
สร้างด้วย React 19 + Vite 8 เป็น Static SPA ไฟล์เดียว (`src/App.jsx`) — ยังไม่เชื่อมต่อ Backend/API จริง ข้อมูลทั้งหมดเป็น
Mock Data ที่สร้างขึ้นเพื่อ Demo เท่านั้น

## รันบนเครื่องตัวเอง

```bash
npm install
npm run dev
```

แล้วเปิด `http://localhost:5173`

## Build สำหรับ Production

```bash
npm run build
```

ไฟล์ static จะถูกสร้างไว้ที่โฟลเดอร์ `dist/`

## Deploy ขึ้น Cloudflare Pages

### วิธีที่ 1 — ผ่าน Cloudflare Dashboard (แนะนำ ถ้ามี Git repo)

1. Push โค้ดนี้ขึ้น GitHub / GitLab
2. เข้า Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git
3. เลือก repo แล้วตั้งค่า Build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. กด Save and Deploy

### วิธีที่ 2 — Deploy ตรงจากเครื่องด้วย Wrangler CLI (ไม่ต้องใช้ Git)

```bash
npm install -g wrangler
wrangler login
npm run deploy
```

(`npm run deploy` จะรัน `vite build` แล้วตามด้วย `wrangler pages deploy dist` ให้อัตโนมัติ — ครั้งแรกจะถาม
ให้ตั้งชื่อโปรเจกต์ Pages กด Enter เพื่อใช้ชื่อ `cv-lcv-operations` ตามที่ตั้งไว้ใน `wrangler.toml`)

## โครงสร้างไฟล์

```
src/App.jsx     ← ทั้งแอปอยู่ในไฟล์นี้ไฟล์เดียว (Design tokens, Mock data, ทุก Component)
src/main.jsx    ← Entry point
src/index.css   ← Reset พื้นฐาน
index.html      ← HTML shell
vite.config.js  ← ตั้งค่า base:'./' ให้ asset path เป็น relative (เปิดจากไฟล์ตรงๆ ก็ได้)
wrangler.toml   ← ค่าตั้งต้นสำหรับ deploy ผ่าน Wrangler CLI
```

## หมายเหตุสำคัญ

- **ข้อมูลในระบบเป็น Mock Data ทั้งหมด** ไม่มี Backend/Database จริง การแก้ไขข้อมูลใน Motorpool/Transporter (Edit/Save)
  จะเปลี่ยนแค่ใน React state ของ browser session นั้น รีเฟรชหน้าแล้วข้อมูลจะกลับไปเป็นค่าเริ่มต้น
- ถ้าต้องการเชื่อมต่อ API/Google Apps Script หรือฐานข้อมูลจริงในอนาคต จุดที่ต้องแก้คือส่วน mock data generator
  (`buildData`, `CV_DATA_INIT`, `LCV_DATA_INIT`) และ state ใน `MotorpoolTab`/`TransporterTab`/`OverviewDashboard`
  ให้ดึง/บันทึกข้อมูลผ่าน API แทน
