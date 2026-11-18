"use client";

import Link from "next/link";
import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2, History } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "./status-badge";
import type { AssetRow } from "../types";

export type { AssetRow } from "../types";

type TableTab = "สัญญาเครื่อง" | "หมวดหมู่" | "สถานที่ตั้ง";
type OtherRow = { id: string; item: string; type: string; owner: string; until: string; status: string };

const contracts: OtherRow[] = [
  { id: "CT-2569-001", item: "AI-0123 เครื่องพิมพ์", type: "สัญญาบำรุงรักษา (MA)", owner: "บริษัท ก.", until: "31 ธ.ค. 2569", status: "ใช้งานอยู่" },
  { id: "CT-2569-002", item: "AI-0131 โปรเจกเตอร์", type: "ประกันสินค้า", owner: "บริษัท ข.", until: "30 พ.ย. 2569", status: "ใกล้หมดอายุ" },
  { id: "CT-2568-014", item: "AI-0087 เครื่องสแกนเอกสาร", type: "สัญญาเช่า", owner: "บริษัท ก.", until: "31 ต.ค. 2569", status: "หมดอายุ" },
  { id: "CT-2569-005", item: "AI-0102 โน้ตบุ๊ก", type: "ประกันสินค้า", owner: "บริษัท ง.", until: "15 มี.ค. 2570", status: "ใช้งานอยู่" },
  { id: "CT-2569-007", item: "AI-0140 เครื่องปรับอากาศ", type: "สัญญาบำรุงรักษา (MA)", owner: "บริษัท จ.", until: "30 มิ.ย. 2570", status: "ใช้งานอยู่" },
];

const categories: OtherRow[] = [
  { id: "CAT-001", item: "เครื่องใช้สำนักงาน", type: "หมวดหมู่หลัก", owner: "ครุภัณฑ์สำนักงาน", until: "42 รายการ", status: "ใช้งานอยู่" },
  { id: "CAT-002", item: "คอมพิวเตอร์และอุปกรณ์ IT", type: "หมวดหมู่หลัก", owner: "ครุภัณฑ์ IT", until: "38 รายการ", status: "ใช้งานอยู่" },
  { id: "CAT-003", item: "เครื่องปรับอากาศ", type: "หมวดหมู่หลัก", owner: "เครื่องใช้ไฟฟ้า", until: "24 รายการ", status: "ใช้งานอยู่" },
  { id: "CAT-004", item: "โสตทัศนูปกรณ์", type: "หมวดหมู่หลัก", owner: "อุปกรณ์ประชุม", until: "16 รายการ", status: "ใช้งานอยู่" },
];

const locations: OtherRow[] = [
  { id: "LOC-001", item: "อาคาร A · ห้อง 204", type: "อาคาร A", owner: "ฝ่ายธุรการ", until: "18 รายการ", status: "ใช้งานอยู่" },
  { id: "LOC-002", item: "อาคาร B · ห้อง 101", type: "อาคาร B", owner: "ฝ่ายทะเบียน", until: "12 รายการ", status: "ใช้งานอยู่" },
  { id: "LOC-003", item: "อาคาร C · ห้อง 12", type: "อาคาร C", owner: "ฝ่ายอาคารสถานที่", until: "9 รายการ", status: "ใช้งานอยู่" },
  { id: "LOC-004", item: "ห้องประชุม 1", type: "อาคาร A", owner: "ฝ่ายประชุม", until: "7 รายการ", status: "ใช้งานอยู่" },
];

const otherColumns = ["เลขที่", "รายการ", "ประเภท", "ผู้รับผิดชอบ", "จำนวน / สิ้นสุด", "สถานะ"];
const contractRows = (rows: OtherRow[]) => rows.map((row) => [row.id, row.item, row.type, row.owner, row.until, row.status]);
const categoryRows = (rows: OtherRow[]) => rows.map((row) => [row.id, row.item, row.type, row.owner, row.until, row.status]);
const locationRows = (rows: OtherRow[]) => rows.map((row) => [row.id, row.item, row.type, row.owner, row.until, row.status]);

export function AssetTable({ rows, total }: { rows: AssetRow[]; total: number }) {
  const [activeTab, setActiveTab] = useState<TableTab>("สัญญาเครื่อง");
  const [tableSearch, setTableSearch] = useState("");
  const [tableRows, setTableRows] = useState(rows);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [editing, setEditing] = useState<AssetRow | null>(null);
  const [deleting, setDeleting] = useState<AssetRow | null>(null);

  function saveEdit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    const form = new FormData(event.currentTarget);
    setTableRows((current) => current.map((row) => row.code === editing.code
      ? { ...row, name: String(form.get("name") ?? row.name), location: String(form.get("location") ?? row.location) }
      : row));
    setEditing(null);
  }

  const isAssets = activeTab === "สัญญาเครื่อง";
  const otherRows = activeTab === "สัญญาเครื่อง" ? contracts : activeTab === "หมวดหมู่" ? categories : locations;
  const otherValues = activeTab === "สัญญาเครื่อง" ? contractRows(otherRows) : activeTab === "หมวดหมู่" ? categoryRows(otherRows) : locationRows(otherRows);
  const normalizedSearch = tableSearch.trim().toLocaleLowerCase("th-TH");
  const filteredAssets = tableRows.filter((row) => `${row.code} ${row.name} ${row.location} ${row.status}`.toLocaleLowerCase("th-TH").includes(normalizedSearch));
  const filteredOther = otherValues.filter((row) => row.join(" ").toLocaleLowerCase("th-TH").includes(normalizedSearch));
  const visibleCount = isAssets ? filteredAssets.length : filteredOther.length;

  return (
    <Card>
      <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="เลือกตารางข้อมูล">
        {(["สัญญาเครื่อง", "หมวดหมู่", "สถานที่ตั้ง"] as const).map((tab) => <button key={tab} id={`tab-${tab}`} type="button" role="tab" aria-selected={activeTab === tab} onClick={() => { setActiveTab(tab); setTableSearch(""); setOpenMenu(null); }} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${activeTab === tab ? "border-red-600 bg-red-50 text-red-700" : "border-stone-300 text-stone-700 hover:bg-stone-50"}`}>{tab}</button>)}
      </div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h2 className="text-2xl font-bold">{activeTab}</h2><p className="mt-1 text-stone-500">แสดง {visibleCount} จาก {isAssets ? total : otherRows.length} รายการ</p></div>
        <label className="block w-full sm:w-72"><span className="mb-1.5 block text-sm font-semibold text-stone-700">ค้นหา</span><input value={tableSearch} onChange={(event) => setTableSearch(event.target.value)} placeholder="ค้นหาในตาราง" className="h-11 w-full rounded-xl border border-stone-300 bg-white px-4 outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/20" /></label>
      </div>
      <div className="mt-5 max-h-[340px] overflow-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead className="sticky top-0 bg-white text-stone-600">
            <tr className="border-b border-stone-200">
              {(isAssets ? ["รหัส", "ชื่อเครื่อง", "สถานที่", "ตรวจล่าสุด", "สถานะ", ""] : [...otherColumns, ""]).map((heading, index) => (
                <th key={heading || `actions-${index}`} scope="col" className="px-3 py-3 font-semibold">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isAssets ? filteredAssets.map((row) => (
              <tr key={row.code} className="border-b border-stone-100 last:border-0">
                <td className="px-3 py-4">{row.code}</td>
                <td className="px-3 py-4">{row.name}</td>
                <td className="px-3 py-4">{row.location}</td>
                <td className="px-3 py-4">{row.lastChecked ?? "—"}</td>
                <td className="px-3 py-4"><StatusBadge status={row.status} /></td>
                <td className="relative px-3 py-3 text-right">
                  <button type="button" aria-label={`เมนูจัดการ ${row.code}`} aria-haspopup="menu" aria-expanded={openMenu === row.code} onClick={() => setOpenMenu(openMenu === row.code ? null : row.code)} className="inline-flex size-9 items-center justify-center rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-red-600">
                    <MoreHorizontal className="size-5" aria-hidden />
                  </button>
                  {openMenu === row.code && (
                    <>
                      <button type="button" aria-label="ปิดเมนู" className="fixed inset-0 z-10 cursor-default" onClick={() => setOpenMenu(null)} />
                      <div role="menu" className="absolute right-3 top-12 z-20 w-48 rounded-xl border border-stone-200 bg-white p-1.5 text-left shadow-lg">
                        <button type="button" role="menuitem" onClick={() => { setEditing(row); setOpenMenu(null); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-stone-700 hover:bg-stone-50">
                          <Pencil className="size-4" aria-hidden />แก้ไขข้อมูล
                        </button>
                        <Link role="menuitem" href={`/audit-log?asset=${encodeURIComponent(row.code)}`} onClick={() => setOpenMenu(null)} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-stone-700 hover:bg-stone-50">
                          <History className="size-4" aria-hidden />ดูสถานะเครื่อง
                        </Link>
                        <button type="button" role="menuitem" onClick={() => { setDeleting(row); setOpenMenu(null); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-700 hover:bg-red-50">
                          <Trash2 className="size-4" aria-hidden />ลบข้อมูล
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            )) : filteredOther.map((values) => (
              <tr key={values[0]} className="border-b border-stone-100 last:border-0">
                {values.map((value, index) => <td key={`${values[0]}-${index}`} className="px-3 py-4">{index === values.length - 1 ? <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${value === "หมดอายุ" ? "bg-red-900 text-white" : value === "ใกล้หมดอายุ" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>{value}</span> : value}</td>)}
                <td />
              </tr>
            ))}
            {visibleCount === 0 && <tr><td colSpan={6} className="px-3 py-10 text-center text-sm text-stone-500">ไม่พบรายการ</td></tr>}
          </tbody>
        </table>
      </div>

      {editing && <div className="fixed inset-0 z-40 flex items-center justify-center bg-stone-950/40 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setEditing(null); }}>
        <section role="dialog" aria-modal="true" aria-labelledby="edit-asset-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <h2 id="edit-asset-title" className="text-xl font-bold text-stone-900">แก้ไขข้อมูลเครื่อง</h2>
          <p className="mt-1 text-sm text-stone-500">{editing.code}</p>
          <form onSubmit={saveEdit} className="mt-5 space-y-4">
            <label className="block text-sm font-semibold text-stone-700">ชื่อเครื่อง<input name="name" defaultValue={editing.name} required className="mt-1.5 h-11 w-full rounded-xl border border-stone-300 px-3 font-normal outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100" /></label>
            <label className="block text-sm font-semibold text-stone-700">สถานที่<input name="location" defaultValue={editing.location} required className="mt-1.5 h-11 w-full rounded-xl border border-stone-300 px-3 font-normal outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100" /></label>
            <div className="flex justify-end gap-2 pt-2"><button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50">ยกเลิก</button><button type="submit" className="rounded-xl bg-red-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-800">บันทึก</button></div>
          </form>
        </section>
      </div>}

      {deleting && <div className="fixed inset-0 z-40 flex items-center justify-center bg-stone-950/40 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setDeleting(null); }}>
        <section role="alertdialog" aria-modal="true" aria-labelledby="delete-asset-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <h2 id="delete-asset-title" className="text-xl font-bold text-stone-900">ยืนยันการลบข้อมูล</h2>
          <p className="mt-2 text-sm text-stone-600">ต้องการลบ {deleting.code} · {deleting.name} ใช่หรือไม่?</p>
          <div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => setDeleting(null)} className="rounded-xl border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50">ยกเลิก</button><button type="button" onClick={() => { setTableRows((current) => current.filter((row) => row.code !== deleting.code)); setDeleting(null); }} className="rounded-xl bg-red-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-800">ลบข้อมูล</button></div>
        </section>
      </div>}
    </Card>
  );
}
