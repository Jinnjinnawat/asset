import type { AssetRow } from "@/features/assets/types";
import type { AuditItem } from "@/features/audit/types";

export const summary = { total: 160, inspected: 142, broken: 9, discrepancies: 5 };

export const assets: AssetRow[] = [
  { code: "AI-0123", name: "เครื่องพิมพ์", location: "อาคาร A ห้อง 204", lastChecked: "15 พ.ย. 2569", status: "ปกติ" },
  { code: "AI-0087", name: "เครื่องสแกนเอกสาร", location: "อาคาร B ห้อง 101", lastChecked: null, status: "ไม่พบ" },
  { code: "AI-0102", name: "โน้ตบุ๊ก", location: "อาคาร A ห้อง 310", lastChecked: "14 พ.ย. 2569", status: "สถานที่ไม่ตรง" },
  { code: "AI-0131", name: "โปรเจกเตอร์", location: "ห้องประชุม 1", lastChecked: "14 พ.ย. 2569", status: "รอซ่อม" },
  { code: "AI-0140", name: "เครื่องปรับอากาศ", location: "อาคาร C ห้อง 12", lastChecked: "13 พ.ย. 2569", status: "ปกติ" },
];

export const auditItems: AuditItem[] = [
  { id: "1", text: "แก้สถานะ AI-0131 → รอซ่อม", user: "ผู้ใช้ 1", time: "09:51" },
  { id: "2", text: "สแกน AI-0123 พบตรงทะเบียน", user: "ผู้ใช้ 1", time: "09:42" },
  { id: "3", text: "ลงทะเบียนเครื่องใหม่ AI-0160", user: "ผู้ใช้ 1", time: "09:15" },
  { id: "4", text: "สแกน AI-0102 สถานที่ไม่ตรง", user: "ผู้ใช้ 1", time: "เมื่อวาน" },
];

export const filterOptions = {
  categories: ["เครื่องใช้สำนักงาน", "คอมพิวเตอร์", "เครื่องปรับอากาศ", "โสตทัศนูปกรณ์"],
  locations: ["อาคาร A", "อาคาร B", "อาคาร C", "ห้องประชุม 1"],
  statuses: ["ปกติ", "ไม่พบ", "สถานที่ไม่ตรง", "รอซ่อม"],
};
