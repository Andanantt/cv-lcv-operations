import { useState, useMemo } from "react";

/* ══════════════════════════════════════════════════════════════════════════
   FONT — Inter
══════════════════════════════════════════════════════════════════════════ */
if (typeof document !== "undefined" && !document.getElementById("theme-font-inter")) {
  const link = document.createElement("link");
  link.id = "theme-font-inter";
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
  document.head.appendChild(link);
}
const FONT = "'Inter','Segoe UI',Arial,sans-serif";

/* ══════════════════════════════════════════════════════════════════════════
   DESIGN TOKENS
══════════════════════════════════════════════════════════════════════════ */
const C = {
  navy: "#062B55",
  navy2: "#0B3768",
  blue: "#1464F4",
  blueHover: "#0D5AE6",
  blueLight: "#EAF2FF",
  bg: "#F5F7FA",
  card: "#FFFFFF",
  border: "#E3E8EF",
  divider: "#E9EDF2",
  text: "#172B4D",
  textSec: "#5F6B7A",
  textMuted: "#8A96A6",
  ok: "#18B979", okBg: "#E8F7EF",
  ng: "#E84C4C", ngBg: "#FDECEC",
  pending: "#F5A900", pendingBg: "#FFF5DC",
  onDelivery: "#2496E8", onDeliveryBg: "#EAF4FF",
};

const GLOBAL_CSS = `
  * { box-sizing: border-box; }
  html, body, #root { height:100%; }
  html, body { overflow:hidden; }
  body { margin:0; -webkit-font-smoothing:antialiased; }
  ::-webkit-scrollbar { width:8px; height:8px; }
  ::-webkit-scrollbar-thumb { background:#C7D0DB; border-radius:4px; }
  ::-webkit-scrollbar-track { background:transparent; }
  button, select, input { font-family:${FONT}; }
  button { cursor:pointer; }
  select:focus, input:focus { outline:2px solid ${C.blue}22; }
  .btn-primary:hover { background:${C.blueHover} !important; }
  .btn-ghost:hover { background:${C.blueLight} !important; }
  .nav-child:hover { background:#0E3E70 !important; }
  .nav-group:hover { background:#0A3260 !important; }
  .tbl-row:hover { background:#F7FAFF !important; }
  .icon-btn:hover { background:#EEF2F7 !important; }
  .card-hover:hover { box-shadow:0 2px 8px rgba(6,43,85,0.06); }
  @media (max-width: 1180px) {
    .analytics-grid { grid-template-columns:1fr !important; }
  }
  @media (max-width: 860px) {
    .kpi-grid { grid-template-columns:1fr !important; }
    .filter-bar { flex-wrap:wrap !important; }
  }
`;

/* ══════════════════════════════════════════════════════════════════════════
   ICONS — simple line icons, lucide-style, no external deps
══════════════════════════════════════════════════════════════════════════ */
const Icon = ({ children, size = 18, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...rest}>{children}</svg>
);
const IconCalendar   = (p) => <Icon {...p}><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M16 2.5v4M8 2.5v4M3 9.5h18"/></Icon>;
const IconChevronDown= (p) => <Icon {...p}><path d="M6 9l6 6 6-6"/></Icon>;
const IconChevronLeft= (p) => <Icon {...p}><path d="M15 6l-6 6 6 6"/></Icon>;
const IconBell       = (p) => <Icon {...p}><path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 21a2 2 0 0 0 4 0"/></Icon>;
const IconDownload   = (p) => <Icon {...p}><path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 19h16"/></Icon>;
const IconRefresh    = (p) => <Icon {...p}><path d="M3 11a9 9 0 0 1 15.3-5.3L21 8"/><path d="M21 3v5h-5"/><path d="M21 13a9 9 0 0 1-15.3 5.3L3 16"/><path d="M3 21v-5h5"/></Icon>;
const IconClipboard  = (p) => <Icon {...p}><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1"/><path d="M9 11h6M9 15h6"/></Icon>;
const IconSend        = (p) => <Icon {...p}><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/></Icon>;
const IconClock       = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></Icon>;
const IconTruck       = (p) => <Icon {...p}><rect x="1" y="7" width="14" height="10" rx="1"/><path d="M15 10h4l3 3v4h-7z"/><circle cx="6" cy="19" r="1.6"/><circle cx="17.5" cy="19" r="1.6"/></Icon>;
const IconWarehouse   = (p) => <Icon {...p}><path d="M3 9.5 12 4l9 5.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"/><path d="M9 21v-6h6v6"/></Icon>;
const IconSettings    = (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></Icon>;
const IconX            = (p) => <Icon {...p}><path d="M18 6 6 18M6 6l12 12"/></Icon>;
const IconCheck        = (p) => <Icon {...p}><path d="M20 6 9 17l-5-5"/></Icon>;
const IconArrowUp      = (p) => <Icon {...p}><path d="M12 19V5M5 12l7-7 7 7"/></Icon>;
const IconArrowDown    = (p) => <Icon {...p}><path d="M12 5v14M19 12l-7 7-7-7"/></Icon>;
const IconUser         = (p) => <Icon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></Icon>;
const IconEdit         = (p) => <Icon {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></Icon>;
const IconSearch       = (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></Icon>;
const IconFilter       = (p) => <Icon {...p}><path d="M4 5h16M7 12h10M10 19h4"/></Icon>;
const IconWrench       = (p) => <Icon {...p}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94Z"/></Icon>;
const IconCheckCircle  = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M8.3 12.3l2.4 2.4 5-5.4"/></Icon>;
const IconRoute        = (p) => <Icon {...p}><circle cx="6" cy="18.5" r="2.3"/><circle cx="18" cy="5.5" r="2.3"/><path d="M8 18.5h6.5A3.5 3.5 0 0 0 18 15V7.8"/></Icon>;
const IconPackage      = (p) => <Icon {...p}>
  <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73Z"/>
  <path d="M12 22V12"/>
  <path d="m3.3 7 8.7 5 8.7-5"/>
</Icon>;
const IconLorry        = (p) => <Icon {...p}>
  <path d="M2 17V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10"/>
  <path d="M14 10.5h4.3l2.7 3.3V17"/>
  <path d="M2 17h1.8"/>
  <path d="M8.7 17h4.6"/>
  <path d="M20.3 17H21"/>
  <circle cx="5.8" cy="17.6" r="1.7"/>
  <circle cx="11" cy="17.6" r="1.7"/>
  <circle cx="18.3" cy="17.6" r="1.7"/>
</Icon>;
const IconPickupTruck  = (p) => <Icon {...p}>
  <path d="M2 16.5V11H9.5V7H13L17 11V16.5Z"/>
  <path d="M9.5 11V16.5"/>
  <circle cx="5.7" cy="17.2" r="1.7"/>
  <circle cx="14.5" cy="17.2" r="1.7"/>
</Icon>;

/* ══════════════════════════════════════════════════════════════════════════
   MOCK DATA — deterministic generator (realistic, outbound / yard ops)
══════════════════════════════════════════════════════════════════════════ */
const TODAY = "2026-06-22";
const JOB_TYPES = ["DLR Self-drive", "TIS Special", "TIS Self-drive"];
const DEPOTS = [
  { name: "ลานจอดรถเกตเวย์ จ.ฉะเชิงเทรา", code: "GV10", label: "GV10 – Gateway (Chachoengsao)" },
  { name: "ลานจอดรถมีนบุรี",                code: "MV10", label: "MV10 – Minburi Yard" },
];
const CV_REQUESTERS = [
  "KOW YOO HAH SALES KRUNGTHEP CO.,LTD.", "ISUZU SANGUANTHAI KRUNGTHEP CO.,LTD.",
  "ISUZU CONNECT KHONKAEN CO.,LTD.", "ISUZU TANGPARK AMNAJAREAN CO.,LTD.",
  "ISUZU TANG SIA HUAT NAKORNPATHOM CO.,LTD.", "TARA LAMPOON ISUZU SALES CO.,LTD.",
  "ISUZU PHRAE CO.,LTD.", "ISUZU ANDAMAN SALES CO.,LTD.", "SINGBURI ISUZU SALES CO.,LTD.",
  "ISUZU CHAI CHAROEN KIJ MOTORS CO.,LTD.", "ฝ่ายขายราชการและลูกค้าพิเศษ (GFS)",
  "ฝ่ายขายดีลเลอร์ บี (DSB)", "ฝ่ายโลจิสติกส์และจัดซื้อ (LPC)", "BOVORN MOTOR CO.,LTD.",
  "PHANCHAROEN CO.,LTD.",
];
const LCV_REQUESTERS = [
  "ISUZU AUTO CENTER CO.,LTD.", "ISUZU SANGUANTHAI SARABURI CO.,LTD.", "BOVORN MOTOR CO.,LTD.",
  "ฝ่ายขายราชการและลูกค้าพิเศษ (GFS)", "ฝ่ายขายดีลเลอร์ บี (DSB)", "TARA LAMPOON ISUZU SALES CO.,LTD.",
  "KOW YOO HAH MOTORS CO.,LTD.", "ISUZU SALA FASTER CHIENGMAI L.P.",
];
const DEST_POOL = [
  "ลาดพร้าว", "ไทยรุ่งยูเนี่ยนคาร์", "เอสเอกรุ๊ป", "ทีทีอาร์ไทยรุ่ง", "เอ็มพีซีคูล",
  "อู่ช่างน้อย", "เครื่องเย็นสแตนเลสแปดริ้ว", "ออโต้เทคนิค จ.ฉะเชิงเทรา", "ตรีเพชร สำนักงานใหญ่",
  "อู่ชัยมนัสบอดี้", "พีเจวัน", "สามมิตร", "อีซูซุชัยเจริญกิจมอเตอร์ส กิ่งแก้ว", "3เอ็มทรัคบอดี้",
];
const DRIVERS = [
  "นายสมพร ละเมาะ", "สมทรง หน้าตาดี", "สมชาย ทำดี", "สมหมาย คิดดี", "สมคิด พูดดี",
  "นางสาวใคร่ฟ้า คำปาน", "นายบุญเรือง สุขสุวรรณ", "นายประเสริฐ ใจดี", "นายวิชัย รักเรียน", "นางสาวมาลี ศรีสุข",
];
const NG_REASONS = ["Dent", "Paint", "Function", "Scratch", "Interior damage"];
const ENGINE_PREFIX = ["FRA","FSD","FRU","FPZ","EVG","FAM","FRZ","FGB","FRC","FRE","FRG","FRB","FMC","FMS","FPK","FPN","FPL","FRJ"];
const VIN_MID = ["FVM60","FTR34","FRR90","NLR85","GXZ77","TFR41","TFS40"];
const VIN_SUF = ["JRT","HRT","NRT","JTT","JTG","TRT"];

function seeded(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}
function pad(n, len = 3) { return String(n).padStart(len, "0"); }
function addDays(dateStr, days) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1, 2)}-${pad(dt.getUTCDate(), 2)}`;
}
function fmtDMY(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

function buildData(prefix, requesters, count, seed) {
  const rnd = seeded(seed);
  const rows = [];
  for (let i = 1; i <= count; i++) {
    const jobType = JOB_TYPES[Math.floor(rnd() * JOB_TYPES.length)];
    const depot = DEPOTS[Math.floor(rnd() * DEPOTS.length)];
    const requester = requesters[Math.floor(rnd() * requesters.length)];
    const portion = jobType === "DLR Self-drive" ? "DLR" : (rnd() < 0.5 ? "MCW" : "CEVA");
    const daysAgo = Math.floor(rnd() * 20);
    const requestDate = addDays(TODAY, -daysAgo);
    const advanceDay = 3 + Math.floor(rnd() * 7);
    const deliveryDate = addDays(requestDate, advanceDay);
    const serviceLevel = rnd() < 0.32 ? "Urgent" : "Normal";

    const sentToMotorpool = rnd() < 0.63;
    let requestInspDate = "", actualInspDate = "", pdiResult = "", ngDetail = "";
    if (sentToMotorpool) {
      let raw = addDays(requestDate, 1 + Math.floor(rnd() * 3));
      requestInspDate = raw > TODAY ? TODAY : raw;
      const inspDone = rnd() < 0.72;
      if (inspDone) {
        actualInspDate = requestInspDate;
        const roll = rnd();
        if (roll < 0.66) { pdiResult = "OK"; }
        else { pdiResult = "NG"; ngDetail = NG_REASONS[Math.floor(rnd() * NG_REASONS.length)]; }
      } else {
        pdiResult = "Pending";
      }
    }

    let status = "Pending", driverName = "", tel = "", arrivalDate = "";
    if (pdiResult === "NG") {
      status = "NG";
    } else if (pdiResult === "OK") {
      const roll = rnd();
      if (roll < 0.45) {
        status = "Delivery finished";
        driverName = DRIVERS[Math.floor(rnd() * DRIVERS.length)];
        tel = "09" + Math.floor(10000000 + rnd() * 89999999);
        arrivalDate = deliveryDate;
      } else if (roll < 0.75) {
        status = "On delivery";
        driverName = DRIVERS[Math.floor(rnd() * DRIVERS.length)];
        tel = "08" + Math.floor(10000000 + rnd() * 89999999);
      }
    }

    const engine = ENGINE_PREFIX[Math.floor(rnd() * ENGINE_PREFIX.length)] + pad(Math.floor(rnd() * 900) + 100);
    const vin = "MP1" + VIN_MID[Math.floor(rnd() * VIN_MID.length)] + VIN_SUF[Math.floor(rnd() * VIN_SUF.length)] + pad(Math.floor(rnd() * 900000), 6);
    const typeCode = jobType === "DLR Self-drive" ? "DL" : jobType === "TIS Special" ? "TS" : "SP";

    rows.push({
      no: i,
      jobNo: `${prefix}${typeCode}20260621${pad(i)}`,
      jobType, engine, vin, requester,
      startFrom: depot.name, location: depot.code,
      destination: DEST_POOL[Math.floor(rnd() * DEST_POOL.length)],
      advanceDay, serviceLevel,
      requestDate, deliveryDate,
      requestInspDate, actualInspDate, pdiResult, ngDetail,
      sentToMotorpool,
      warrantyBook: rnd() < 0.12 ? "สมุดไปพร้อมรถ" : "",
      driverName, tel, arrivalDate,
      status, portion, notes: "",
    });
  }
  return rows;
}

const CV_DATA_INIT  = buildData("CV",  CV_REQUESTERS,  74, 918273);
const LCV_DATA_INIT = buildData("LCV", LCV_REQUESTERS, 56, 552017);

/* ══════════════════════════════════════════════════════════════════════════
   STATUS CONFIG
══════════════════════════════════════════════════════════════════════════ */
const STATUS_CFG = {
  pdi: {
    OK:      { bg: C.okBg,      fg: C.ok,      label: "OK" },
    NG:      { bg: C.ngBg,      fg: C.ng,      label: "NG" },
    Pending: { bg: C.pendingBg, fg: C.pending, label: "Pending" },
  },
  delivery: {
    "Delivery finished": { bg: C.okBg,         fg: C.ok,         label: "Delivered" },
    "On delivery":       { bg: C.onDeliveryBg, fg: C.onDelivery, label: "On Delivery" },
    "Pending":            { bg: C.pendingBg,    fg: C.pending,    label: "Pending" },
    "NG":                 { bg: C.ngBg,         fg: C.ng,         label: "NG" },
  },
  service: {
    Normal: { bg: C.blueLight, fg: C.blue, label: "Normal" },
    Urgent: { bg: C.ngBg,      fg: C.ng,   label: "Urgent" },
  },
};
const DELIVERY_KEYS = ["Delivery finished", "On delivery", "Pending", "NG"];

function StatusPill({ value, type = "pdi" }) {
  if (!value) return <span style={{ color: C.textMuted, fontSize: 12.5 }}>—</span>;
  const cfg = (STATUS_CFG[type] || {})[value] || { bg: "#F3F4F6", fg: C.textSec, label: value };
  return (
    <span style={{
      background: cfg.bg, color: cfg.fg, fontSize: 12, fontWeight: 600,
      padding: "3px 10px", borderRadius: 12, whiteSpace: "nowrap", display: "inline-block",
    }}>{cfg.label}</span>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SHARED STYLE HELPERS
══════════════════════════════════════════════════════════════════════════ */
const fieldStyle = {
  height: 36, padding: "0 10px", borderRadius: 6, border: `1px solid ${C.border}`,
  fontSize: 13, background: "#fff", color: C.textSec, cursor: "pointer",
};
const btnGhost = {
  height: 36, padding: "0 14px", borderRadius: 6, border: `1px solid ${C.border}`,
  background: "#fff", color: C.textSec, fontSize: 13, fontWeight: 500,
  display: "inline-flex", alignItems: "center", gap: 6,
};
const btnPrimary = {
  height: 36, padding: "0 16px", borderRadius: 6, border: "none",
  background: C.blue, color: "#fff", fontSize: 13, fontWeight: 600,
  display: "inline-flex", alignItems: "center", gap: 6,
};
const iconBtnStyle = {
  width: 34, height: 34, borderRadius: 6, border: `1px solid ${C.border}`, background: "#fff",
  display: "inline-flex", alignItems: "center", justifyContent: "center", color: C.textSec, flexShrink: 0,
};
const cardStyle = { background: C.card, border: `1px solid ${C.border}`, borderRadius: 8 };
const sectionTitle = { fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 2 };
const sectionSub = { fontSize: 12, color: C.textMuted, marginBottom: 14 };

/* ══════════════════════════════════════════════════════════════════════════
   FILTER BAR (Overview Dashboard)
══════════════════════════════════════════════════════════════════════════ */
function OverviewFilterBar({ f, setF, onClear, onExport, onRefresh, lastUpdated, recordCount }) {
  const [exportMsg, setExportMsg] = useState("");

  const doExport = () => {
    const headers = ["Job No.","Job Type","Engine","VIN","Requester","Service Level","PDI Result","Delivery Status","Request Date","Delivery Date","Advance Day"];
    setExportMsg(`Exported ${recordCount} records`);
    try {
      const blob = new Blob([headers.join(",")], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "inspection-queue.csv";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) { /* download blocked in sandbox — toast still confirms */ }
    setTimeout(() => setExportMsg(""), 2200);
    onExport();
  };

  return (
    <div className="filter-bar" style={{
      ...cardStyle, padding: "10px 16px", marginBottom: 16,
      display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.textSec, fontSize: 13, fontWeight: 500 }}>
        <IconCalendar size={15} />
        <span>Request Inspection Date</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, ...fieldStyle, padding: "0 8px", width: "auto" }}>
        <input type="date" value={f.dateFrom} onChange={(e) => setF((p) => ({ ...p, dateFrom: e.target.value }))}
          style={{ border: "none", fontSize: 12.5, color: C.text, background: "transparent", height: 34, width: 118 }} />
        <span style={{ color: C.textMuted }}>–</span>
        <input type="date" value={f.dateTo} onChange={(e) => setF((p) => ({ ...p, dateTo: e.target.value }))}
          style={{ border: "none", fontSize: 12.5, color: C.text, background: "transparent", height: 34, width: 118 }} />
      </div>

      <select style={fieldStyle} value={f.location} onChange={(e) => setF((p) => ({ ...p, location: e.target.value }))}>
        <option value="">All Location</option>
        {DEPOTS.map((d) => <option key={d.code} value={d.code}>{d.label}</option>)}
      </select>

      <select style={fieldStyle} value={f.pdi} onChange={(e) => setF((p) => ({ ...p, pdi: e.target.value }))}>
        <option value="">All PDI Result</option>
        <option value="OK">OK</option><option value="NG">NG</option><option value="Pending">Pending</option>
      </select>

      <select style={fieldStyle} value={f.jobType} onChange={(e) => setF((p) => ({ ...p, jobType: e.target.value }))}>
        <option value="">All Job Type</option>
        {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
      </select>

      <select style={fieldStyle} value={f.deliveryStatus} onChange={(e) => setF((p) => ({ ...p, deliveryStatus: e.target.value }))}>
        <option value="">All Delivery Status</option>
        {DELIVERY_KEYS.map((k) => <option key={k} value={k}>{STATUS_CFG.delivery[k].label}</option>)}
      </select>

      <button className="btn-ghost" style={btnGhost} onClick={onClear}>Clear</button>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ position: "relative" }}>
          <button className="btn-ghost" style={btnGhost} onClick={doExport}>
            <IconDownload size={14} /> Export
          </button>
          {exportMsg && (
            <div style={{
              position: "absolute", top: 42, right: 0, background: C.navy, color: "#fff",
              fontSize: 12, padding: "6px 12px", borderRadius: 6, whiteSpace: "nowrap", zIndex: 20,
              boxShadow: "0 4px 12px rgba(6,43,85,0.25)",
            }}>{exportMsg} ✓</div>
          )}
        </div>
        <div style={{ textAlign: "right", lineHeight: 1.3 }}>
          <div style={{ fontSize: 11, color: C.textMuted }}>Last updated:</div>
          <div style={{ fontSize: 12, color: C.textSec, fontWeight: 500 }}>{lastUpdated}</div>
        </div>
        <button className="icon-btn" style={iconBtnStyle} title="Refresh" onClick={onRefresh}>
          <IconRefresh size={15} />
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   KPI CARDS
══════════════════════════════════════════════════════════════════════════ */
function SectionHeader({ icon, title, meta }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 9, marginBottom: 14, borderBottom: `1px solid ${C.divider}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{ color: C.blue, display: "flex" }}>{icon}</span>
        <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.06em", color: C.text }}>{title}</span>
      </div>
      {meta && <span style={{ fontSize: 12, color: C.textMuted }}>{meta}</span>}
    </div>
  );
}

function StatCard({ icon, accent, tint, label, sub, value }) {
  return (
    <div className="card-hover" style={{
      background: tint, borderRadius: 10, borderLeft: `4px solid ${accent}`,
      padding: "14px 16px", height: 108, display: "flex", flexDirection: "column", justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: accent }}>{label}</div>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: "#fff", color: accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 1px 2px rgba(6,43,85,0.08)" }}>
          {icon}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 30, fontWeight: 700, color: accent, lineHeight: 1 }}>{value}</div>
        {sub && <div style={{ fontSize: 11.5, color: C.textSec, marginTop: 4 }}>{sub}</div>}
      </div>
    </div>
  );
}

function StatGrid({ cards }) {
  return (
    <div className="kpi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
      {cards.map((c, i) => <StatCard key={i} {...c} />)}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ANALYTICS — Job Type Breakdown (table) + Delivery Status Summary (bars)
══════════════════════════════════════════════════════════════════════════ */
function JobTypeBreakdown({ rows, totalJob, breakdownTotal }) {
  const dot = (color) => <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, display: "inline-block", marginRight: 5 }} />;
  const cell = (n, pct, color) => n === undefined ? <span style={{ color: C.textMuted }}>—</span> : (
    <span style={{ color, fontWeight: 600 }}>{n} <span style={{ color: C.textMuted, fontWeight: 400 }}>({pct}%)</span></span>
  );
  const pct = (n, tot) => (tot ? Math.round((n / tot) * 100) : 0);

  return (
    <div style={{ ...cardStyle, padding: 18 }}>
      <div style={sectionTitle}>Inspection Status</div>
      <div style={sectionSub}>Jobs by type and PDI result</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#F7F9FC" }}>
              <th style={{ textAlign: "left", padding: "8px 10px", fontSize: 12, fontWeight: 600, color: C.textSec, borderBottom: `1px solid ${C.divider}` }}>Job Type</th>
              <th style={{ textAlign: "left", padding: "8px 10px", fontSize: 12, fontWeight: 600, color: C.textSec, borderBottom: `1px solid ${C.divider}` }}>{dot(C.ok)}OK</th>
              <th style={{ textAlign: "left", padding: "8px 10px", fontSize: 12, fontWeight: 600, color: C.textSec, borderBottom: `1px solid ${C.divider}` }}>{dot(C.ng)}NG</th>
              <th style={{ textAlign: "left", padding: "8px 10px", fontSize: 12, fontWeight: 600, color: C.textSec, borderBottom: `1px solid ${C.divider}` }}>{dot(C.pending)}Pending</th>
              <th style={{ textAlign: "left", padding: "8px 10px", fontSize: 12, fontWeight: 600, color: C.textSec, borderBottom: `1px solid ${C.divider}` }}>Total</th>
              <th style={{ textAlign: "left", padding: "8px 10px", fontSize: 12, fontWeight: 600, color: C.textSec, borderBottom: `1px solid ${C.divider}` }}>% of Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={6} style={{ padding: "24px 10px", textAlign: "center", color: C.textMuted }}>No data for current filter.</td></tr>
            )}
            {rows.map((r) => (
              <tr key={r.jobType} style={{ borderBottom: `1px solid ${C.divider}` }}>
                <td style={{ padding: "9px 10px", fontWeight: 500, color: C.text }}>{r.jobType}</td>
                <td style={{ padding: "9px 10px" }}>{cell(r.ok, pct(r.ok, r.total), C.ok)}</td>
                <td style={{ padding: "9px 10px" }}>{cell(r.ng, pct(r.ng, r.total), C.ng)}</td>
                <td style={{ padding: "9px 10px" }}>{cell(r.pending, pct(r.pending, r.total), C.pending)}</td>
                <td style={{ padding: "9px 10px", fontWeight: 600, color: C.text }}>{r.total}</td>
                <td style={{ padding: "9px 10px", fontWeight: 600, color: C.text }}>{r.pct}%</td>
              </tr>
            ))}
            {rows.length > 0 && (
              <tr>
                <td style={{ padding: "9px 10px", fontWeight: 700, color: C.text }}>Total</td>
                <td style={{ padding: "9px 10px" }}>{cell(breakdownTotal.ok, pct(breakdownTotal.ok, breakdownTotal.total), C.ok)}</td>
                <td style={{ padding: "9px 10px" }}>{cell(breakdownTotal.ng, pct(breakdownTotal.ng, breakdownTotal.total), C.ng)}</td>
                <td style={{ padding: "9px 10px" }}>{cell(breakdownTotal.pending, pct(breakdownTotal.pending, breakdownTotal.total), C.pending)}</td>
                <td style={{ padding: "9px 10px", fontWeight: 700, color: C.text }}>{breakdownTotal.total}</td>
                <td style={{ padding: "9px 10px", fontWeight: 700, color: C.text }}>{pct(breakdownTotal.total, totalJob)}%</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 11.5, color: C.textMuted }}>
        <span>* % of total = Total / Total Job</span>
        <span style={{ fontWeight: 600, color: C.textSec }}>Total Job: {totalJob}</span>
      </div>
    </div>
  );
}

function DeliveryStatusSummary({ rows, totalJob }) {
  const total = rows.reduce((s, r) => s + r.count, 0);
  return (
    <div style={{ ...cardStyle, padding: 18 }}>
      <div style={sectionTitle}>Delivery Status</div>
      <div style={sectionSub}>Overall Delivery Status Summary</div>
      {rows.map((r) => (
        <div key={r.key} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{r.label}</span>
            <span style={{ fontSize: 13, color: C.textSec }}>{r.count} <span style={{ color: C.textMuted }}>({r.pct}%)</span></span>
          </div>
          <div style={{ background: "#F0F3F7", borderRadius: 4, height: 7 }}>
            <div style={{ width: `${r.pct}%`, background: STATUS_CFG.delivery[r.key].fg, borderRadius: 4, height: 7, transition: "width .4s" }} />
          </div>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: `1px solid ${C.divider}`, fontSize: 13, fontWeight: 700, color: C.text }}>
        <span>Total</span>
        <span>{total} <span style={{ color: C.textMuted, fontWeight: 400 }}>({totalJob ? Math.round((total / totalJob) * 100) : 0}%)</span></span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGINATION
══════════════════════════════════════════════════════════════════════════ */
function Pagination({ page, setPage, totalPages, rowsPerPage, setRowsPerPage, total }) {
  const startIdx = total === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const endIdx = Math.min(page * rowsPerPage, total);
  const pages = Array.from({ length: Math.max(totalPages, 1) }, (_, i) => i + 1).slice(0, 6);
  const pagerBtn = (disabled, active) => ({
    minWidth: 30, height: 30, padding: "0 8px", borderRadius: 6,
    border: `1px solid ${active ? C.blue : C.border}`,
    background: active ? C.blue : "#fff", color: active ? "#fff" : disabled ? C.textMuted : C.textSec,
    fontSize: 12.5, fontWeight: active ? 600 : 500, opacity: disabled ? 0.5 : 1,
    cursor: disabled ? "default" : "pointer",
  });
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px", borderTop: `1px solid ${C.divider}`, fontSize: 12.5, color: C.textSec, flexWrap: "wrap", gap: 10 }}>
      <span>Showing {startIdx}–{endIdx} of {total}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span>Rows per page</span>
          <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
            style={{ ...fieldStyle, height: 30, padding: "0 6px" }}>
            {[10, 20, 50].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} style={pagerBtn(page <= 1)}>Previous</button>
          {pages.map((n) => (
            <button key={n} onClick={() => setPage(n)} style={pagerBtn(false, page === n)}>{n}</button>
          ))}
          <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} style={pagerBtn(page >= totalPages)}>Next</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SEARCH + FILTER TOOLBAR (reusable — multi-field search + quick filter popover)
══════════════════════════════════════════════════════════════════════════ */
function SearchFilterBar({ title, search, setSearch, placeholder, recordCount, filterOptions, qf, setQf }) {
  const [open, setOpen] = useState(false);
  const activeCount = Object.values(qf).filter(Boolean).length;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderBottom: `1px solid ${C.divider}`, flexWrap: "wrap" }}>
      {title && <span style={{ fontWeight: 600, fontSize: 15, color: C.text, flexShrink: 0 }}>{title}</span>}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <div style={{ position: "relative", width: 280, maxWidth: "60vw" }}>
          <IconSearch size={14} style={{ position: "absolute", left: 10, top: 11, color: C.textMuted, pointerEvents: "none" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={placeholder}
            style={{ ...fieldStyle, width: "100%", paddingLeft: 32 }} />
        </div>
        <div style={{ position: "relative" }}>
          <button className="btn-ghost" style={btnGhost} onClick={() => setOpen((p) => !p)}>
            <IconFilter size={14} /> Filter{activeCount > 0 ? ` (${activeCount})` : ""}
          </button>
          {open && (
            <div style={{
              position: "absolute", top: 42, right: 0, background: "#fff", border: `1px solid ${C.border}`,
              borderRadius: 8, padding: 14, boxShadow: "0 10px 26px rgba(6,43,85,0.14)", zIndex: 30,
              display: "flex", flexDirection: "column", gap: 8, minWidth: 200,
            }}>
              {filterOptions.map((f) => (
                <select key={f.key} style={fieldStyle} value={qf[f.key]} onChange={(e) => setQf((p) => ({ ...p, [f.key]: e.target.value }))}>
                  <option value="">{f.label}</option>
                  {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ))}
              <button className="btn-ghost" style={{ ...btnGhost, justifyContent: "center" }}
                onClick={() => setQf(Object.fromEntries(filterOptions.map((f) => [f.key, ""])))}>Reset</button>
            </div>
          )}
        </div>
        <span style={{ fontSize: 12.5, color: C.textMuted, whiteSpace: "nowrap" }}>{recordCount} records</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   INSPECTION QUEUE TABLE
══════════════════════════════════════════════════════════════════════════ */
const QUEUE_COLS = ["Job No.","Job Type","Engine","VIN","Requester","Service Level","PDI Result","Delivery Status","Request Date","Delivery Date","Advance Day"];

function InspectionQueue({ rows, dateLabel }) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [qf, setQf] = useState({ jobType: "", pdi: "", status: "" });

  const searched = useMemo(() => {
    let r = rows;
    if (qf.jobType) r = r.filter((x) => x.jobType === qf.jobType);
    if (qf.pdi) r = r.filter((x) => x.pdiResult === qf.pdi);
    if (qf.status) r = r.filter((x) => x.status === qf.status);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      r = r.filter((x) =>
        x.jobNo.toLowerCase().includes(q) || x.engine.toLowerCase().includes(q) ||
        x.vin.toLowerCase().includes(q) || x.requester.toLowerCase().includes(q));
    }
    return r;
  }, [rows, search, qf]);

  const totalPages = Math.max(1, Math.ceil(searched.length / rowsPerPage));
  const pageSafe = Math.min(page, totalPages);
  const pageRows = searched.slice((pageSafe - 1) * rowsPerPage, pageSafe * rowsPerPage);

  return (
    <div style={{ ...cardStyle, overflow: "hidden" }}>
      <SearchFilterBar
        title={`Inspection Queue — ${dateLabel}`}
        search={search} setSearch={(v) => { setSearch(v); setPage(1); }}
        placeholder="Search Job No., Engine, VIN or Requester"
        recordCount={searched.length}
        filterOptions={[
          { key: "jobType", label: "All Job Type", options: JOB_TYPES.map((t) => ({ value: t, label: t })) },
          { key: "pdi", label: "All PDI Result", options: ["OK", "NG", "Pending"].map((s) => ({ value: s, label: s })) },
          { key: "status", label: "All Delivery Status", options: DELIVERY_KEYS.map((k) => ({ value: k, label: STATUS_CFG.delivery[k].label })) },
        ]}
        qf={qf} setQf={(v) => { setQf(v); setPage(1); }}
      />
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#F7F9FC" }}>
              {QUEUE_COLS.map((h) => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, fontSize: 12, color: C.textSec, borderBottom: `1px solid ${C.divider}`, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 && (
              <tr><td colSpan={QUEUE_COLS.length} style={{ padding: "32px 14px", textAlign: "center", color: C.textMuted }}>No records found for the current filter.</td></tr>
            )}
            {pageRows.map((r, i) => (
              <tr key={r.jobNo} className="tbl-row" style={{ borderBottom: `1px solid ${C.divider}`, height: 40 }}>
                <td style={{ padding: "0 14px", fontFamily: "monospace", color: C.blue, whiteSpace: "nowrap" }}>{r.jobNo}</td>
                <td style={{ padding: "0 14px", whiteSpace: "nowrap", color: C.text }}>{r.jobType}</td>
                <td style={{ padding: "0 14px", fontFamily: "monospace", color: C.textSec }}>{r.engine}</td>
                <td style={{ padding: "0 14px", fontFamily: "monospace", fontSize: 12, color: C.textSec }}>{r.vin}</td>
                <td style={{ padding: "0 14px", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: C.text }}>{r.requester}</td>
                <td style={{ padding: "0 14px" }}><StatusPill value={r.serviceLevel} type="service" /></td>
                <td style={{ padding: "0 14px" }}><StatusPill value={r.pdiResult} type="pdi" /></td>
                <td style={{ padding: "0 14px" }}><StatusPill value={r.status} type="delivery" /></td>
                <td style={{ padding: "0 14px", whiteSpace: "nowrap", color: C.textSec }}>{fmtDMY(r.requestDate)}</td>
                <td style={{ padding: "0 14px", whiteSpace: "nowrap", color: C.textSec }}>{fmtDMY(r.deliveryDate)}</td>
                <td style={{ padding: "0 14px", textAlign: "center", color: C.textSec }}>{r.advanceDay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={pageSafe} setPage={setPage} totalPages={totalPages} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} total={searched.length} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   OVERVIEW DASHBOARD
══════════════════════════════════════════════════════════════════════════ */
function OverviewDashboard({ data }) {
  const DEFAULT_F = { dateFrom: TODAY, dateTo: TODAY, location: "", pdi: "", jobType: "", deliveryStatus: "" };
  const [f, setF] = useState(DEFAULT_F);
  const [lastUpdated, setLastUpdated] = useState("10:30 AM");

  const filtered = useMemo(() => data.filter((r) => {
    if (r.sentToMotorpool) {
      if (f.dateFrom && r.requestInspDate < f.dateFrom) return false;
      if (f.dateTo && r.requestInspDate > f.dateTo) return false;
    }
    if (f.location && r.location !== f.location) return false;
    if (f.pdi && r.pdiResult !== f.pdi) return false;
    if (f.jobType && r.jobType !== f.jobType) return false;
    if (f.deliveryStatus && r.status !== f.deliveryStatus) return false;
    return true;
  }), [data, f]);

  const totalJob = filtered.length;
  const sentSubset = useMemo(() => filtered.filter((r) => r.sentToMotorpool), [filtered]);
  const requestedInspection = sentSubset.length;
  const pendingKpi = totalJob - requestedInspection;

  const sentOk = sentSubset.filter((r) => r.pdiResult === "OK").length;
  const sentNg = sentSubset.filter((r) => r.pdiResult === "NG").length;
  const sentPending = sentSubset.filter((r) => r.pdiResult === "Pending").length;
  const pct = (n, tot) => (tot ? Math.round((n / tot) * 100) : 0);

  const readyToAssign = filtered.filter((r) => r.pdiResult === "OK" && r.status === "Pending" && !r.driverName).length;
  const onDeliveryCount = filtered.filter((r) => r.status === "On delivery").length;
  const deliveredCount = filtered.filter((r) => r.status === "Delivery finished").length;

  const jobTypeRows = useMemo(() => JOB_TYPES.map((jt) => {
    const rows = sentSubset.filter((r) => r.jobType === jt);
    const ok = rows.filter((r) => r.pdiResult === "OK").length;
    const ng = rows.filter((r) => r.pdiResult === "NG").length;
    const pending = rows.filter((r) => r.pdiResult === "Pending").length;
    const total = rows.length;
    return { jobType: jt, ok, ng, pending, total, pct: totalJob ? Math.round((total / totalJob) * 100) : 0 };
  }).filter((r) => r.total > 0), [sentSubset, totalJob]);

  const breakdownTotal = {
    ok: jobTypeRows.reduce((s, r) => s + r.ok, 0),
    ng: jobTypeRows.reduce((s, r) => s + r.ng, 0),
    pending: jobTypeRows.reduce((s, r) => s + r.pending, 0),
    total: jobTypeRows.reduce((s, r) => s + r.total, 0),
  };

  const deliveryRows = useMemo(() => DELIVERY_KEYS.map((k) => {
    const count = filtered.filter((r) => r.status === k).length;
    return { key: k, label: STATUS_CFG.delivery[k].label, count, pct: totalJob ? Math.round((count / totalJob) * 100) : 0 };
  }), [filtered, totalJob]);

  const dateLabel = f.dateFrom && f.dateTo
    ? (f.dateFrom === f.dateTo ? fmtDMY(f.dateFrom) : `${fmtDMY(f.dateFrom)} – ${fmtDMY(f.dateTo)}`)
    : "All Dates";

  const handleRefresh = () => {
    const now = new Date();
    let h = now.getHours(); const m = String(now.getMinutes()).padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM"; h = h % 12 || 12;
    setLastUpdated(`${h}:${m} ${ampm}`);
  };

  return (
    <div>
      <OverviewFilterBar
        f={f} setF={setF}
        onClear={() => setF(DEFAULT_F)}
        onExport={() => {}}
        onRefresh={handleRefresh}
        lastUpdated={lastUpdated}
        recordCount={sentSubset.length}
      />
      <div style={{ marginBottom: 22 }}>
        <SectionHeader icon={<IconClipboard size={14} />} title="INSPECTION SUMMARY" meta={dateLabel} />
        <StatGrid cards={[
          { icon: <IconClipboard size={16} />, accent: C.blue, tint: C.blueLight, label: "Total inspection", value: requestedInspection, sub: dateLabel },
          { icon: <IconCheck size={16} />, accent: C.ok, tint: C.okBg, label: "PDI OK", value: sentOk, sub: `${pct(sentOk, requestedInspection)}%` },
          { icon: <IconWrench size={16} />, accent: C.ng, tint: C.ngBg, label: "PDI NG", value: sentNg, sub: `${pct(sentNg, requestedInspection)}%` },
          { icon: <IconClock size={16} />, accent: C.pending, tint: C.pendingBg, label: "PDI Pending", value: sentPending, sub: `${pct(sentPending, requestedInspection)}%` },
        ]} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <SectionHeader icon={<IconTruck size={14} />} title="DELIVERY STATUS" meta="All filtered jobs" />
        <StatGrid cards={[
          { icon: <IconClipboard size={16} />, accent: C.blue, tint: C.blueLight, label: "Total jobs", value: totalJob, sub: dateLabel },
          { icon: <IconRoute size={16} />, accent: C.ok, tint: C.okBg, label: "Ready to assign", value: readyToAssign, sub: "PDI OK, no driver" },
          { icon: <IconTruck size={16} />, accent: C.onDelivery, tint: C.onDeliveryBg, label: "On delivery", value: onDeliveryCount, sub: "In transit" },
          { icon: <IconCheckCircle size={16} />, accent: C.ok, tint: C.okBg, label: "Delivered", value: deliveredCount, sub: "Completed" },
        ]} />
      </div>
      <div className="analytics-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 16 }}>
        <JobTypeBreakdown rows={jobTypeRows} totalJob={totalJob} breakdownTotal={breakdownTotal} />
        <DeliveryStatusSummary rows={deliveryRows} totalJob={totalJob} />
      </div>
      <InspectionQueue rows={sentSubset} dateLabel={dateLabel} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MOTORPOOL TAB — Inspection team: PDI / edit
══════════════════════════════════════════════════════════════════════════ */
function MiniKpi({ label, value, color, icon, iconBg, iconFg, sub }) {
  return (
    <div style={{ ...cardStyle, padding: "13px 16px", height: 100, display: "flex", flexDirection: "column", justifyContent: "space-between", borderLeft: `3px solid ${color}` }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ fontSize: 14.5, color: C.textSec, fontWeight: 600 }}>{label}</div>
        {icon && (
          <div style={{ width: 28, height: 28, borderRadius: 7, background: iconBg, color: iconFg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {icon}
          </div>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8 }}>
        <div style={{ fontSize: 36, fontWeight: 700, color: C.text, lineHeight: 1 }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: C.textSec, fontWeight: 500, textAlign: "right" }}>{sub}</div>}
      </div>
    </div>
  );
}

function MotorpoolTab({ data, setData }) {
  const [f, setF] = useState({ dateFrom: TODAY, dateTo: TODAY, location: "", pdi: "", jobType: "" });
  const [editId, setEditId] = useState(null);
  const [editBuf, setEditBuf] = useState({});
  const [selRow, setSelRow] = useState(null);
  const [search, setSearch] = useState("");
  const [qf, setQf] = useState({ jobType: "", pdi: "" });

  const filtered = useMemo(() => data.filter((r) => {
    if (!r.sentToMotorpool) return false;
    if (f.dateFrom && r.requestInspDate < f.dateFrom) return false;
    if (f.dateTo && r.requestInspDate > f.dateTo) return false;
    if (f.location && r.location !== f.location) return false;
    if (f.pdi && r.pdiResult !== f.pdi) return false;
    if (f.jobType && r.jobType !== f.jobType) return false;
    return true;
  }), [data, f]);

  const searched = useMemo(() => {
    let r = filtered;
    if (qf.jobType) r = r.filter((x) => x.jobType === qf.jobType);
    if (qf.pdi) r = r.filter((x) => x.pdiResult === qf.pdi);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      r = r.filter((x) => x.jobNo.toLowerCase().includes(q) || x.engine.toLowerCase().includes(q) || x.vin.toLowerCase().includes(q));
    }
    return r;
  }, [filtered, search, qf]);

  const total = filtered.length;
  const ok = filtered.filter((r) => r.pdiResult === "OK").length;
  const ng = filtered.filter((r) => r.pdiResult === "NG").length;
  const pending = filtered.filter((r) => r.pdiResult === "Pending").length;

  const startEdit = (row) => { setEditId(row.no); setEditBuf({ pdiResult: row.pdiResult, ngDetail: row.ngDetail, actualInspDate: row.actualInspDate }); };
  const saveEdit = (row) => {
    setData((prev) => prev.map((r) => r.no === row.no ? { ...r, ...editBuf } : r));
    setEditId(null);
    setSelRow((prev) => (prev?.no === row.no ? { ...prev, ...editBuf } : prev));
  };

  return (
    <div>
      <div className="kpi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 16 }}>
        <MiniKpi label="Total Inspection" value={total} color={C.blue}
          icon={<IconClipboard size={14} />} iconBg={C.blueLight} iconFg={C.blue} />
        <MiniKpi label="PDI OK" value={ok} color={C.ok}
          icon={<IconCheck size={14} />} iconBg={C.okBg} iconFg={C.ok}
          sub={total ? `${Math.round((ok / total) * 100)}% complete` : undefined} />
        <MiniKpi label="PDI NG" value={ng} color={C.ng}
          icon={<IconWrench size={14} />} iconBg={C.ngBg} iconFg={C.ng}
          sub={total ? `${Math.round((ng / total) * 100)}% blocked` : undefined} />
        <MiniKpi label="PDI Pending" value={pending} color={C.pending}
          icon={<IconClock size={14} />} iconBg={C.pendingBg} iconFg={C.pending}
          sub={total ? `${Math.round((pending / total) * 100)}% waiting` : undefined} />
      </div>

      <div className="filter-bar" style={{ ...cardStyle, padding: "10px 16px", marginBottom: 16, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, ...fieldStyle, padding: "0 8px", width: "auto" }}>
          <IconCalendar size={14} />
          <input type="date" value={f.dateFrom} onChange={(e) => setF((p) => ({ ...p, dateFrom: e.target.value }))} style={{ border: "none", fontSize: 12.5, background: "transparent", height: 34, width: 118 }} />
          <span style={{ color: C.textMuted }}>–</span>
          <input type="date" value={f.dateTo} onChange={(e) => setF((p) => ({ ...p, dateTo: e.target.value }))} style={{ border: "none", fontSize: 12.5, background: "transparent", height: 34, width: 118 }} />
        </div>
        <select style={fieldStyle} value={f.location} onChange={(e) => setF((p) => ({ ...p, location: e.target.value }))}>
          <option value="">All Location</option>
          {DEPOTS.map((d) => <option key={d.code} value={d.code}>{d.label}</option>)}
        </select>
        <select style={fieldStyle} value={f.pdi} onChange={(e) => setF((p) => ({ ...p, pdi: e.target.value }))}>
          <option value="">All PDI Result</option>
          <option value="OK">OK</option><option value="NG">NG</option><option value="Pending">Pending</option>
        </select>
        <select style={fieldStyle} value={f.jobType} onChange={(e) => setF((p) => ({ ...p, jobType: e.target.value }))}>
          <option value="">All Job Type</option>
          {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <button className="btn-ghost" style={btnGhost} onClick={() => setF({ dateFrom: TODAY, dateTo: TODAY, location: "", pdi: "", jobType: "" })}>Clear</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selRow ? "1fr 320px" : "1fr", gap: 16 }}>
        <div style={{ ...cardStyle, overflow: "hidden" }}>
          <SearchFilterBar
            title="Motorpool Records"
            search={search} setSearch={setSearch}
            placeholder="Search Job No., Engine or VIN"
            recordCount={searched.length}
            filterOptions={[
              { key: "jobType", label: "All Job Type", options: JOB_TYPES.map((t) => ({ value: t, label: t })) },
              { key: "pdi", label: "All PDI Result", options: ["OK", "NG", "Pending"].map((s) => ({ value: s, label: s })) },
            ]}
            qf={qf} setQf={setQf}
          />
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#F7F9FC" }}>
                  {["No.","Job No.","Job Type","Engine","VIN","Loc.","Delivery Date","Actual Insp","PDI","NG Detail","Actions"].map((h) => (
                    <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, fontSize: 12, color: C.textSec, borderBottom: `1px solid ${C.divider}`, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {searched.length === 0 && <tr><td colSpan={11} style={{ padding: "32px 14px", textAlign: "center", color: C.textMuted }}>No records found.</td></tr>}
                {searched.map((row) => {
                  const isEdit = editId === row.no;
                  return (
                    <tr key={row.no} className="tbl-row" onClick={() => !isEdit && setSelRow(row)}
                      style={{ borderBottom: `1px solid ${C.divider}`, cursor: "pointer", background: selRow?.no === row.no ? C.blueLight : "#fff" }}>
                      <td style={{ padding: "9px 12px", color: C.textSec }}>{row.no}</td>
                      <td style={{ padding: "9px 12px", fontFamily: "monospace", color: C.blue, whiteSpace: "nowrap" }}>{row.jobNo}</td>
                      <td style={{ padding: "9px 12px", whiteSpace: "nowrap" }}>{row.jobType}</td>
                      <td style={{ padding: "9px 12px", fontFamily: "monospace", color: C.textSec }}>{row.engine}</td>
                      <td style={{ padding: "9px 12px", fontFamily: "monospace", fontSize: 12, color: C.textSec }}>{row.vin}</td>
                      <td style={{ padding: "9px 12px" }}>
                        <span style={{ background: row.location === "GV10" ? C.blueLight : C.okBg, color: row.location === "GV10" ? C.blue : C.ok, padding: "2px 8px", borderRadius: 6, fontWeight: 600, fontSize: 11.5 }}>{row.location}</span>
                      </td>
                      <td style={{ padding: "9px 12px", whiteSpace: "nowrap", color: C.textSec }}>{fmtDMY(row.deliveryDate)}</td>
                      <td style={{ padding: "9px 12px", whiteSpace: "nowrap" }}>
                        {isEdit
                          ? <input type="date" value={editBuf.actualInspDate} onChange={(e) => setEditBuf((p) => ({ ...p, actualInspDate: e.target.value }))} style={{ ...fieldStyle, height: 30, padding: "0 6px", fontSize: 12 }} />
                          : (row.actualInspDate ? fmtDMY(row.actualInspDate) : <span style={{ color: C.textMuted }}>—</span>)}
                      </td>
                      <td style={{ padding: "9px 12px" }}>
                        {isEdit
                          ? <select value={editBuf.pdiResult} onChange={(e) => setEditBuf((p) => ({ ...p, pdiResult: e.target.value }))} style={{ ...fieldStyle, height: 30, padding: "0 6px", fontSize: 12 }}>
                              <option>OK</option><option>NG</option><option>Pending</option>
                            </select>
                          : <StatusPill value={row.pdiResult} type="pdi" />}
                      </td>
                      <td style={{ padding: "9px 12px" }}>
                        {isEdit
                          ? <input value={editBuf.ngDetail} onChange={(e) => setEditBuf((p) => ({ ...p, ngDetail: e.target.value }))} placeholder="NG detail..." style={{ ...fieldStyle, height: 30, padding: "0 8px", fontSize: 12, width: 120 }} />
                          : (row.ngDetail || <span style={{ color: C.textMuted }}>—</span>)}
                      </td>
                      <td style={{ padding: "9px 12px" }} onClick={(e) => e.stopPropagation()}>
                        {isEdit
                          ? <div style={{ display: "flex", gap: 4 }}>
                              <button style={{ ...btnPrimary, height: 28, padding: "0 10px", fontSize: 11.5 }} onClick={() => saveEdit(row)}>Save</button>
                              <button style={{ ...btnGhost, height: 28, padding: "0 8px", fontSize: 11.5 }} onClick={() => setEditId(null)}><IconX size={12} /></button>
                            </div>
                          : <button style={{ ...btnGhost, height: 28, padding: "0 10px", fontSize: 11.5 }} onClick={() => { startEdit(row); setSelRow(row); }}><IconEdit size={12} /> Edit</button>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {selRow && (
          <div style={{ ...cardStyle, padding: 18, fontSize: 13, alignSelf: "start" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontWeight: 700, fontSize: 14.5, color: C.text }}>Job Detail</span>
              <button style={{ background: "none", border: "none", color: C.textSec }} onClick={() => setSelRow(null)}><IconX size={16} /></button>
            </div>
            {[
              ["Job No.", selRow.jobNo], ["Job Type", selRow.jobType], ["Engine", selRow.engine], ["VIN", selRow.vin],
              ["Location", selRow.location], ["Requester", selRow.requester], ["Destination", selRow.destination],
              ["Request Date", fmtDMY(selRow.requestDate)], ["Delivery Date", fmtDMY(selRow.deliveryDate)],
              ["Service Level", selRow.serviceLevel], ["Request Insp. Date", fmtDMY(selRow.requestInspDate)],
              ["Actual Insp. Date", selRow.actualInspDate ? fmtDMY(selRow.actualInspDate) : "—"],
              ["PDI Result", selRow.pdiResult], ["NG Detail", selRow.ngDetail || "—"], ["Status", selRow.status],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.divider}`, padding: "7px 0" }}>
                <span style={{ color: C.textMuted, minWidth: 120 }}>{k}</span>
                <span style={{ fontWeight: 500, textAlign: "right", color: C.text, maxWidth: 170, wordBreak: "break-word" }}>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   TRANSPORTER TAB — Delivery team
══════════════════════════════════════════════════════════════════════════ */
function TransporterTab({ data, setData }) {
  const rows0 = useMemo(() => data.filter((r) => r.jobType === "TIS Special" || r.jobType === "TIS Self-drive"), [data]);
  const [f, setF] = useState({ status: "", portion: "", jobType: "" });
  const [editId, setEditId] = useState(null);
  const [editBuf, setEditBuf] = useState({});
  const [selRow, setSelRow] = useState(null);
  const [search, setSearch] = useState("");
  const [qf, setQf] = useState({ jobType: "", status: "" });

  const filtered = useMemo(() => rows0.filter((r) => {
    if (f.status && r.status !== f.status) return false;
    if (f.portion && r.portion !== f.portion) return false;
    if (f.jobType && r.jobType !== f.jobType) return false;
    return true;
  }), [rows0, f]);

  const searched = useMemo(() => {
    let r = filtered;
    if (qf.jobType) r = r.filter((x) => x.jobType === qf.jobType);
    if (qf.status) r = r.filter((x) => x.status === qf.status);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      r = r.filter((x) => x.jobNo.toLowerCase().includes(q) || x.engine.toLowerCase().includes(q) || (x.driverName || "").toLowerCase().includes(q));
    }
    return r;
  }, [filtered, search, qf]);

  const totalRows = rows0.length;
  const readyToSend = rows0.filter((r) => r.pdiResult === "OK" && r.status === "Pending" && !r.driverName).length;
  const onDelivery = rows0.filter((r) => r.status === "On delivery").length;
  const delivered = rows0.filter((r) => r.status === "Delivery finished").length;
  const blocked = rows0.filter((r) => r.pdiResult === "NG").length;

  const startEdit = (row) => { setEditId(row.no); setEditBuf({ driverName: row.driverName, tel: row.tel, arrivalDate: row.arrivalDate, status: row.status }); };
  const saveEdit = (row) => {
    setData((prev) => prev.map((r) => r.no === row.no ? { ...r, ...editBuf } : r));
    setEditId(null);
    setSelRow((prev) => (prev?.no === row.no ? { ...prev, ...editBuf } : prev));
  };

  return (
    <div>
      <div className="kpi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14, marginBottom: 16 }}>
        <MiniKpi label="Total Jobs" value={totalRows} color={C.navy2}
          icon={<IconClipboard size={14} />} iconBg={C.blueLight} iconFg={C.blue} />
        <MiniKpi label="Ready To Assign" value={readyToSend} color={C.ok}
          icon={<IconSend size={13} />} iconBg={C.okBg} iconFg={C.ok}
          sub="PDI OK, no driver" />
        <MiniKpi label="On Delivery" value={onDelivery} color={C.onDelivery}
          icon={<IconTruck size={14} />} iconBg={C.onDeliveryBg} iconFg={C.onDelivery} />
        <MiniKpi label="Delivered" value={delivered} color={C.blue}
          icon={<IconCheck size={14} />} iconBg={C.blueLight} iconFg={C.blue} />
        <MiniKpi label="Blocked (NG)" value={blocked} color={C.ng}
          icon={<IconWrench size={14} />} iconBg={C.ngBg} iconFg={C.ng}
          sub="Awaiting repair" />
      </div>

      <div className="filter-bar" style={{ ...cardStyle, padding: "10px 16px", marginBottom: 16, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <select style={fieldStyle} value={f.jobType} onChange={(e) => setF((p) => ({ ...p, jobType: e.target.value }))}>
          <option value="">All Job Type</option>
          <option>TIS Special</option><option>TIS Self-drive</option>
        </select>
        <select style={fieldStyle} value={f.status} onChange={(e) => setF((p) => ({ ...p, status: e.target.value }))}>
          <option value="">All Delivery Status</option>
          {DELIVERY_KEYS.map((k) => <option key={k} value={k}>{STATUS_CFG.delivery[k].label}</option>)}
        </select>
        <select style={fieldStyle} value={f.portion} onChange={(e) => setF((p) => ({ ...p, portion: e.target.value }))}>
          <option value="">All Portion</option>
          <option>MCW</option><option>CEVA</option>
        </select>
        <button className="btn-ghost" style={btnGhost} onClick={() => setF({ status: "", portion: "", jobType: "" })}>Clear</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selRow ? "1fr 320px" : "1fr", gap: 16 }}>
        <div style={{ ...cardStyle, overflow: "hidden" }}>
          <SearchFilterBar
            title="Transporter Records"
            search={search} setSearch={setSearch}
            placeholder="Search Job No., Engine or Driver"
            recordCount={searched.length}
            filterOptions={[
              { key: "jobType", label: "All Job Type", options: ["TIS Special", "TIS Self-drive"].map((t) => ({ value: t, label: t })) },
              { key: "status", label: "All Delivery Status", options: DELIVERY_KEYS.map((k) => ({ value: k, label: STATUS_CFG.delivery[k].label })) },
            ]}
            qf={qf} setQf={setQf}
          />
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#F7F9FC" }}>
                  {["No.","Job No.","Job Type","Engine","Portion","Delivery Date","PDI","Driver Name","Tel.","Status","Actions"].map((h) => (
                    <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, fontSize: 12, color: C.textSec, borderBottom: `1px solid ${C.divider}`, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {searched.length === 0 && <tr><td colSpan={11} style={{ padding: "32px 14px", textAlign: "center", color: C.textMuted }}>No records found.</td></tr>}
                {searched.map((row) => {
                  const isEdit = editId === row.no;
                  return (
                    <tr key={row.no} className="tbl-row" onClick={() => !isEdit && setSelRow(row)}
                      style={{ borderBottom: `1px solid ${C.divider}`, cursor: "pointer", background: selRow?.no === row.no ? C.blueLight : "#fff" }}>
                      <td style={{ padding: "9px 12px", color: C.textSec }}>{row.no}</td>
                      <td style={{ padding: "9px 12px", fontFamily: "monospace", color: C.blue, whiteSpace: "nowrap" }}>{row.jobNo}</td>
                      <td style={{ padding: "9px 12px", whiteSpace: "nowrap" }}>{row.jobType}</td>
                      <td style={{ padding: "9px 12px", fontFamily: "monospace", color: C.textSec }}>{row.engine}</td>
                      <td style={{ padding: "9px 12px" }}>{row.portion}</td>
                      <td style={{ padding: "9px 12px", whiteSpace: "nowrap", color: C.textSec }}>{fmtDMY(row.deliveryDate)}</td>
                      <td style={{ padding: "9px 12px" }}><StatusPill value={row.pdiResult} type="pdi" /></td>
                      <td style={{ padding: "9px 12px" }}>
                        {isEdit
                          ? <input value={editBuf.driverName} onChange={(e) => setEditBuf((p) => ({ ...p, driverName: e.target.value }))} placeholder="Driver name..." style={{ ...fieldStyle, height: 30, padding: "0 8px", fontSize: 12, width: 130 }} />
                          : (row.driverName || <span style={{ color: C.textMuted }}>—</span>)}
                      </td>
                      <td style={{ padding: "9px 12px" }}>
                        {isEdit
                          ? <input value={editBuf.tel} onChange={(e) => setEditBuf((p) => ({ ...p, tel: e.target.value }))} placeholder="Tel..." style={{ ...fieldStyle, height: 30, padding: "0 8px", fontSize: 12, width: 100 }} />
                          : (row.tel || <span style={{ color: C.textMuted }}>—</span>)}
                      </td>
                      <td style={{ padding: "9px 12px" }}>
                        {isEdit
                          ? <select value={editBuf.status} onChange={(e) => setEditBuf((p) => ({ ...p, status: e.target.value }))} style={{ ...fieldStyle, height: 30, padding: "0 6px", fontSize: 12 }}>
                              {DELIVERY_KEYS.map((k) => <option key={k} value={k}>{STATUS_CFG.delivery[k].label}</option>)}
                            </select>
                          : <StatusPill value={row.status} type="delivery" />}
                      </td>
                      <td style={{ padding: "9px 12px" }} onClick={(e) => e.stopPropagation()}>
                        {isEdit
                          ? <div style={{ display: "flex", gap: 4 }}>
                              <button style={{ ...btnPrimary, height: 28, padding: "0 10px", fontSize: 11.5 }} onClick={() => saveEdit(row)}>Save</button>
                              <button style={{ ...btnGhost, height: 28, padding: "0 8px", fontSize: 11.5 }} onClick={() => setEditId(null)}><IconX size={12} /></button>
                            </div>
                          : <button style={{ ...btnGhost, height: 28, padding: "0 10px", fontSize: 11.5 }} onClick={() => { startEdit(row); setSelRow(row); }}><IconEdit size={12} /> Edit</button>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {selRow && (
          <div style={{ ...cardStyle, padding: 18, fontSize: 13, alignSelf: "start" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontWeight: 700, fontSize: 14.5, color: C.text }}>Transport Detail</span>
              <button style={{ background: "none", border: "none", color: C.textSec }} onClick={() => setSelRow(null)}><IconX size={16} /></button>
            </div>
            {[
              ["Job No.", selRow.jobNo], ["Job Type", selRow.jobType], ["Engine", selRow.engine], ["VIN", selRow.vin],
              ["Portion", selRow.portion], ["Requester", selRow.requester], ["Destination", selRow.destination],
              ["Delivery Date", fmtDMY(selRow.deliveryDate)], ["Service Level", selRow.serviceLevel],
              ["PDI Result", selRow.pdiResult], ["Driver Name", selRow.driverName || "—"], ["Tel.", selRow.tel || "—"],
              ["Arrival Date", selRow.arrivalDate ? fmtDMY(selRow.arrivalDate) : "—"], ["Status", selRow.status],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.divider}`, padding: "7px 0" }}>
                <span style={{ color: C.textMuted, minWidth: 120 }}>{k}</span>
                <span style={{ fontWeight: 500, textAlign: "right", color: C.text, maxWidth: 170, wordBreak: "break-word" }}>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ADMINISTRATION — placeholder
══════════════════════════════════════════════════════════════════════════ */
function AdministrationPage() {
  return (
    <div style={{ ...cardStyle, padding: "56px 40px", textAlign: "center" }}>
      <div style={{ width: 52, height: 52, borderRadius: 12, background: C.blueLight, color: C.blue, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
        <IconSettings size={24} />
      </div>
      <div style={{ fontSize: 16, fontWeight: 600, color: C.text }}>Administration</div>
      <div style={{ marginTop: 6, fontSize: 13.5, color: C.textMuted }}>User Management &amp; Master Data — this section is under construction.</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════════════════════════════════════ */
const NAV_GROUPS = [
  { key: "cv", label: "CV", color: "#18B979", activeColor: "#1F9C6E", icon: IconLorry, children: [
    { key: "cv-overview", label: "Overview Dashboard" },
    { key: "cv-motorpool", label: "Motorpool" },
    { key: "cv-transporter", label: "Transporter" },
  ]},
  { key: "lcv", label: "LCV", color: "#2496E8", activeColor: C.blue, icon: IconPickupTruck, children: [
    { key: "lcv-overview", label: "Overview Dashboard" },
    { key: "lcv-motorpool", label: "Motorpool" },
    { key: "lcv-transporter", label: "Transporter" },
  ]},
];

function Sidebar({ collapsed, setCollapsed, expanded, toggleExpand, activePage, setActivePage }) {
  const W = collapsed ? 56 : 228;
  return (
    <div style={{ width: W, minWidth: W, background: C.navy, color: "#CBD8E8", display: "flex", flexDirection: "column", transition: "width .18s ease", overflow: "hidden", flexShrink: 0 }}>
      <div style={{ padding: "14px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10, minHeight: 54 }}>
        <div style={{ width: 30, height: 30, background: C.blue, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12.5, color: "#fff", flexShrink: 0 }}>SD</div>
        {!collapsed && (
          <div style={{ lineHeight: 1.25, overflow: "hidden" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#fff", whiteSpace: "nowrap" }}>CV &amp; LCV Operations</div>
            <div style={{ fontSize: 11, color: "#8FA3BF", whiteSpace: "nowrap" }}>Self-drive &amp; Special</div>
          </div>
        )}
      </div>

      <nav style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "10px 0" }}>
        {NAV_GROUPS.map((group) => (
          <div key={group.key}>
            <button className="nav-group" onClick={() => { toggleExpand(group.key); if (collapsed) setCollapsed(false); }}
              title={group.label}
              style={{
                width: "100%", background: "none", border: "none", color: "#AEC0D6",
                display: "flex", alignItems: "center", gap: 10,
                padding: collapsed ? "9px 0" : "9px 14px", justifyContent: collapsed ? "center" : "flex-start",
                fontSize: 13, fontWeight: 700, letterSpacing: "0.02em",
              }}>
              <group.icon size={17} style={{ color: "#fff", flexShrink: 0 }} />
              {!collapsed && (
                <>
                  <span style={{ flex: 1, textAlign: "left" }}>{group.label}</span>
                  <IconChevronDown size={13} style={{ transform: expanded[group.key] ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform .15s" }} />
                </>
              )}
            </button>
            {!collapsed && expanded[group.key] && group.children.map((child) => (
              <button key={child.key} className="nav-child" onClick={() => setActivePage(child.key)}
                style={{
                  width: "100%", background: activePage === child.key ? group.activeColor : "none", border: "none",
                  color: activePage === child.key ? "#fff" : "#9FB3CC",
                  display: "flex", alignItems: "center", padding: "8px 14px 8px 32px",
                  fontSize: 13, fontWeight: activePage === child.key ? 600 : 400,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  borderRadius: activePage === child.key ? 6 : 0,
                  margin: activePage === child.key ? "1px 8px" : "0",
                  width: activePage === child.key ? "calc(100% - 16px)" : "100%",
                }}>
                {child.label}
              </button>
            ))}
          </div>
        ))}

        <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "8px 14px" }} />

        <button className="nav-child" onClick={() => setActivePage("admin")}
          title="Administration"
          style={{
            width: "100%", background: activePage === "admin" ? C.blue : "none", border: "none",
            color: activePage === "admin" ? "#fff" : "#AEC0D6",
            display: "flex", alignItems: "center", gap: 10,
            padding: collapsed ? "9px 0" : "9px 14px", justifyContent: collapsed ? "center" : "flex-start",
            fontSize: 13, fontWeight: 700,
            borderRadius: activePage === "admin" && !collapsed ? 6 : 0,
            margin: activePage === "admin" && !collapsed ? "1px 8px" : "0",
          }}>
          <IconSettings size={15} />
          {!collapsed && <span style={{ flex: 1, textAlign: "left" }}>Administration</span>}
        </button>
      </nav>

      <button className="icon-btn" onClick={() => setCollapsed((p) => !p)}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        style={{
          background: "none", border: "none", borderTop: "1px solid rgba(255,255,255,0.08)",
          color: "#8FA3BF", padding: "10px 14px", display: "flex", alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between", fontSize: 11.5,
        }}>
        {!collapsed && <span>v1.0.0</span>}
        <IconChevronLeft size={14} style={{ transform: collapsed ? "rotate(180deg)" : "none", transition: "transform .15s" }} />
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HEADER
══════════════════════════════════════════════════════════════════════════ */
function Header({ pageTitle, breadcrumb, module }) {
  const dateStr = "23 Jun 2026";
  const accent = module === "LCV" ? C.onDelivery : module === "CV" ? "#3C9A73" : C.border;
  const tint = module === "LCV" ? C.onDeliveryBg : module === "CV" ? "#E8FAF1" : "#fff";
  return (
    <div style={{ height: 74, minHeight: 74, background: tint, borderBottom: `2px solid ${accent}`, display: "flex", alignItems: "center", padding: "0 24px", transition: "background .15s, border-color .15s" }}>
      <div>
        <div style={{ fontSize: 21, fontWeight: 700, color: C.text }}>{pageTitle}</div>
        <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{breadcrumb}</div>
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 18 }}>
        <span style={{ fontSize: 13, color: C.textSec }}>{dateStr}</span>
        <button className="icon-btn" style={{ ...iconBtnStyle, position: "relative" }} title="Notifications">
          <IconBell size={16} />
          <span style={{ position: "absolute", top: 6, right: 7, width: 6, height: 6, borderRadius: "50%", background: C.ng }} />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.blue, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>A</div>
          <div style={{ lineHeight: 1.25 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Admin User</div>
            <div style={{ fontSize: 11, color: C.textMuted }}>Administrator</div>
          </div>
          <IconChevronDown size={14} style={{ color: C.textMuted }} />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════════════════════════════════════ */
const PAGE_TITLES = { overview: "Overview Dashboard", motorpool: "Motorpool", transporter: "Transporter" };

export default function App() {
  const [cvData, setCvData] = useState(CV_DATA_INIT);
  const [lcvData, setLcvData] = useState(LCV_DATA_INIT);
  const [activePage, setActivePage] = useState("cv-overview");
  const [collapsed, setCollapsed] = useState(false);
  const [expanded, setExpanded] = useState({ cv: true, lcv: true });

  const toggleExpand = (k) => setExpanded((p) => ({ ...p, [k]: !p[k] }));

  const module = activePage.startsWith("lcv") ? "LCV" : "CV";
  const data = module === "LCV" ? lcvData : cvData;
  const setData = module === "LCV" ? setLcvData : setCvData;
  const tabKey = activePage.split("-")[1];

  const pageTitle = activePage === "admin" ? "Administration" : (PAGE_TITLES[tabKey] || "Overview Dashboard");
  const breadcrumb = activePage === "admin" ? "Administration" : `${module} Operations  ›  ${PAGE_TITLES[tabKey] || ""}`;

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%", fontFamily: FONT, background: C.bg, color: C.text }}>
      <style>{GLOBAL_CSS}</style>

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} expanded={expanded} toggleExpand={toggleExpand}
        activePage={activePage} setActivePage={setActivePage} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0, minHeight: 0 }}>
        <Header pageTitle={pageTitle} breadcrumb={breadcrumb} module={activePage === "admin" ? null : module} />
        <div style={{ flex: 1, overflow: "auto", padding: "22px 26px", minHeight: 0 }}>
          {activePage === "admin" && <AdministrationPage />}
          {activePage !== "admin" && tabKey === "overview" && <OverviewDashboard data={data} key={`${module}-overview`} />}
          {activePage !== "admin" && tabKey === "motorpool" && <MotorpoolTab data={data} setData={setData} key={`${module}-motorpool`} />}
          {activePage !== "admin" && tabKey === "transporter" && <TransporterTab data={data} setData={setData} key={`${module}-transporter`} />}
        </div>
      </div>
    </div>
  );
}
