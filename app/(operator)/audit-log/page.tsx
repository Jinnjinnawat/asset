"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { StatusBadge } from "@/features/assets/components/status-badge";
import type { AssetStatus } from "@/features/assets/types";

type LogEvent = {
  date: string;
  time: string;
  type: "เปลี่ยนสถานะ" | "สแกนตรวจสอบ" | "แก้ข้อมูล" | "ลงทะเบียนเครื่อง";
  from?: AssetStatus;
  to?: AssetStatus;
  detail?: string;
  user: string;
};

type AssetLog = {
  id: string;
  name: string;
  location: string;
  category: string;
  owner: string;
  latestScan: string;
  status: AssetStatus;
  logs: LogEvent[];
};

const assets: AssetLog[] = [
  {
    id: "AI-0123", name: "เครื่องพิมพ์", location: "ห้องธุรการ", category: "อุปกรณ์สำนักงาน", owner: "คุณสมใจ ใจดี", latestScan: "15 พ.ย. 2569 10:15", status: "ปกติ",
    logs: [
      { date: "15 พ.ย. 2569", time: "10:15", type: "สแกนตรวจสอบ", to: "ตรงทะเบียน", user: "ผู้ใช้ 1" },
      { date: "10 พ.ย. 2569", time: "13:20", type: "แก้ข้อมูล", detail: "สถานที่: ห้องธุรการ → ห้องธุรการ", user: "ผู้ใช้ 1" },
      { date: "2 ต.ค. 2569", time: "11:25", type: "เปลี่ยนสถานะ", from: "รอซ่อม", to: "ปกติ", detail: "ซ่อมเสร็จ ใช้งานได้", user: "ผู้ใช้ 1" },
      { date: "3 ม.ค. 2569", time: "09:00", type: "ลงทะเบียนเครื่อง", detail: "สร้าง QR Tag แล้ว", user: "ผู้ใช้ 1" },
    ],
  },
  {
    id: "AI-0087", name: "เครื่องสแกนเอกสาร", location: "ห้องธุรการ", category: "อุปกรณ์ IT", owner: "คุณสมใจ ใจดี", latestScan: "ไม่พบในการตรวจสอบ", status: "ไม่พบ",
    logs: [
      { date: "15 พ.ย. 2569", time: "10:02", type: "สแกนตรวจสอบ", to: "ไม่พบ", user: "ผู้ใช้ 1" },
      { date: "20 ก.ย. 2569", time: "14:30", type: "เปลี่ยนสถานะ", from: "ปกติ", to: "ไม่พบ", detail: "ไม่พบครุภัณฑ์ ณ จุดตรวจ", user: "ผู้ใช้ 1" },
      { date: "3 ม.ค. 2569", time: "09:05", type: "ลงทะเบียนเครื่อง", detail: "สร้าง QR Tag แล้ว", user: "ผู้ใช้ 1" },
    ],
  },
  {
    id: "AI-0102", name: "โต๊ะทำงาน", location: "ห้องประชุม 2", category: "ครุภัณฑ์สำนักงาน", owner: "คุณกมลวรรณ", latestScan: "15 พ.ย. 2569 09:55", status: "สถานที่ไม่ตรง",
    logs: [
      { date: "15 พ.ย. 2569", time: "09:55", type: "สแกนตรวจสอบ", to: "สถานที่ไม่ตรง", detail: "ตำแหน่งที่สแกนไม่ตรงกับทะเบียน", user: "ผู้ใช้ 1" },
      { date: "12 พ.ย. 2569", time: "15:20", type: "แก้ข้อมูล", detail: "สถานที่: ห้องประชุม 1 → ห้องประชุม 2", user: "ผู้ใช้ 1" },
      { date: "3 ม.ค. 2569", time: "09:10", type: "ลงทะเบียนเครื่อง", detail: "สร้าง QR Tag แล้ว", user: "ผู้ใช้ 1" },
    ],
  },
  {
    id: "AI-0131", name: "โปรเจกเตอร์", location: "ห้องประชุม 1", category: "อุปกรณ์ IT", owner: "[ชื่อผู้ดูแล]", latestScan: "15 พ.ย. 2569 09:40", status: "รอซ่อม",
    logs: [
      { date: "15 พ.ย. 2569", time: "09:51", type: "เปลี่ยนสถานะ", from: "ปกติ", to: "รอซ่อม", detail: "ภาพไม่ขึ้น ส่งช่างตรวจ", user: "ผู้ใช้ 1" },
      { date: "15 พ.ย. 2569", time: "09:40", type: "สแกนตรวจสอบ", to: "ตรงทะเบียน", user: "ผู้ใช้ 1" },
      { date: "14 พ.ย. 2569", time: "14:10", type: "แก้ข้อมูล", detail: "สถานที่: ห้องประชุม 2 → ห้องประชุม 1", user: "ผู้ใช้ 1" },
      { date: "2 ต.ค. 2569", time: "11:25", type: "เปลี่ยนสถานะ", from: "ชำรุด", to: "ปกติ", detail: "ซ่อมเสร็จ ใช้งานได้", user: "ผู้ใช้ 1" },
      { date: "20 ก.ย. 2569", time: "10:03", type: "เปลี่ยนสถานะ", from: "ปกติ", to: "ชำรุด", user: "ผู้ใช้ 1" },
      { date: "3 ม.ค. 2569", time: "09:00", type: "ลงทะเบียนเครื่อง", detail: "สร้าง QR Tag แล้ว", user: "ผู้ใช้ 1" },
    ],
  },
  {
    id: "AI-0140", name: "เครื่องปรับอากาศ", location: "ห้องประชุม 1", category: "เครื่องใช้ไฟฟ้า", owner: "คุณกมลวรรณ", latestScan: "14 พ.ย. 2569 16:10", status: "ปกติ",
    logs: [
      { date: "14 พ.ย. 2569", time: "16:10", type: "สแกนตรวจสอบ", to: "ตรงทะเบียน", user: "ผู้ใช้ 1" },
      { date: "3 ม.ค. 2569", time: "09:15", type: "ลงทะเบียนเครื่อง", detail: "สร้าง QR Tag แล้ว", user: "ผู้ใช้ 1" },
    ],
  },
];

const filters = ["ทั้งหมด", "เปลี่ยนสถานะ", "สแกนตรวจสอบ", "แก้ข้อมูล"] as const;
type Filter = (typeof filters)[number];

function EventMarker({ event, latest }: { event: LogEvent; latest: boolean }) {
  const color = event.to === "ชำรุด" || event.to === "ไม่พบ" || event.type === "ลงทะเบียนเครื่อง"
    ? "border-red-600 bg-red-600"
    : event.to === "รอซ่อม" || event.to === "สถานที่ไม่ตรง"
      ? "border-amber-700 bg-amber-700"
      : event.to === "ปกติ" || event.to === "ตรงทะเบียน"
        ? "border-green-700 bg-green-700"
        : "border-stone-400 bg-white";

  return <span className={`relative z-10 mt-1 block size-4 shrink-0 rounded-full border-2 ${color} ${latest && event.type === "เปลี่ยนสถานะ" ? "after:absolute after:inset-[3px] after:rounded-full after:bg-white" : ""}`} aria-hidden />;
}

export default function AuditLogPage() {
  const searchParams = useSearchParams();
  const requestedAsset = searchParams.get("asset");
  const [selectedId, setSelectedId] = useState(() => assets.some((asset) => asset.id === requestedAsset) ? requestedAsset! : "AI-0131");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("ทั้งหมด");
  const selected = assets.find((asset) => asset.id === selectedId) ?? assets[0];

  const visibleAssets = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("th-TH");
    return assets.filter((asset) => `${asset.id} ${asset.name}`.toLocaleLowerCase("th-TH").includes(normalized));
  }, [query]);

  const visibleLogs = filter === "ทั้งหมด" ? selected.logs : selected.logs.filter((event) => event.type === filter);
  const statusChangeCount = selected.logs.filter((event) => event.type === "เปลี่ยนสถานะ").length;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-stone-900">Log สถานะเครื่อง</h1>
        <p className="mt-1 text-sm text-stone-500 sm:text-base">ประวัติการเปลี่ยนสถานะ การสแกน และการแก้ข้อมูลของแต่ละเครื่อง (ข้อมูลเป็นตัวอย่าง)</p>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-stone-200 bg-white p-5">
          <label htmlFor="asset-search" className="text-sm font-semibold text-stone-800">เลือกเครื่อง</label>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" aria-hidden />
            <input id="asset-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ค้นหาชื่อหรือรหัสครุภัณฑ์" className="h-11 w-full rounded-xl border border-stone-300 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100" />
          </div>
          <ul className="mt-2 space-y-1">
            {visibleAssets.length ? visibleAssets.map((asset) => (
              <li key={asset.id}>
                <button type="button" onClick={() => setSelectedId(asset.id)} aria-pressed={selectedId === asset.id} className={`flex w-full items-center justify-between gap-2 rounded-xl border px-3 py-3 text-left text-sm transition ${selectedId === asset.id ? "border-red-600 bg-red-50 font-semibold text-stone-900 ring-1 ring-red-600" : "border-transparent text-stone-700 hover:bg-stone-50"}`}>
                  <span className="min-w-0 truncate">{asset.id} {asset.name}</span>
                  <StatusBadge status={asset.status} />
                </button>
              </li>
            )) : <li className="px-3 py-6 text-center text-sm text-stone-500">ไม่พบเครื่องที่ค้นหา</li>}
          </ul>
        </aside>

        <section className="min-w-0 space-y-5" aria-label={`ประวัติของ ${selected.id} ${selected.name}`}>
          <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">{selected.id} · {selected.name}</h2>
                <p className="mt-1 text-sm text-stone-500">{selected.location}</p>
              </div>
              <StatusBadge status={selected.status} />
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4">
              <div><dt className="text-sm text-stone-500">หมวดหมู่</dt><dd className="mt-0.5 font-medium text-stone-800">{selected.category}</dd></div>
              <div><dt className="text-sm text-stone-500">ผู้รับผิดชอบ</dt><dd className="mt-0.5 font-medium text-stone-800">{selected.owner}</dd></div>
              <div><dt className="text-sm text-stone-500">สแกนล่าสุด</dt><dd className="mt-0.5 font-medium text-stone-800">{selected.latestScan}</dd></div>
              <div><dt className="text-sm text-stone-500">เปลี่ยนสถานะ</dt><dd className="mt-0.5 font-medium text-stone-800">{statusChangeCount} ครั้ง</dd></div>
            </dl>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
            <div className="flex flex-wrap gap-2" role="group" aria-label="กรองประวัติ">
              {filters.map((item) => (
                <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item} className={`rounded-full border px-4 py-2 text-sm transition ${filter === item ? "border-red-600 bg-red-50 font-semibold text-red-700" : "border-stone-300 text-stone-700 hover:border-stone-500"}`}>{item}</button>
              ))}
            </div>

            {visibleLogs.length ? <ol className="mt-6 space-y-0">
              {visibleLogs.map((event, index) => (
                <li key={`${event.date}-${event.time}-${event.type}`} className="grid grid-cols-[96px_20px_minmax(0,1fr)] gap-x-3 sm:grid-cols-[112px_20px_minmax(0,1fr)] sm:gap-x-4">
                  <time className="pt-0.5 text-sm text-stone-500"><span className="block font-semibold text-stone-800">{event.date}</span><span className="mt-0.5 block">{event.time}</span></time>
                  <div className="relative flex justify-center"><EventMarker event={event} latest={index === 0} />{index < visibleLogs.length - 1 && <span className="absolute bottom-0 top-4 w-px bg-stone-300" aria-hidden />}</div>
                  <div className="min-w-0 pb-6">
                    <h3 className="font-semibold text-stone-900">{event.type}</h3>
                    {event.from && event.to ? <div className="mt-1 flex flex-wrap items-center gap-1.5"><StatusBadge status={event.from} /><span className="text-stone-500" aria-label="เปลี่ยนเป็น">→</span><StatusBadge status={event.to} /></div> : event.to ? <p className="mt-1"><span className={`inline-block rounded-full px-3 py-0.5 text-sm font-semibold ${event.to === "ไม่พบ" || event.to === "ชำรุด" ? "bg-red-900 text-white" : event.to === "รอซ่อม" || event.to === "สถานที่ไม่ตรง" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>{event.to}</span></p> : null}
                    {event.detail && <p className="mt-1 break-words text-sm text-stone-700">{event.detail}</p>}
                    <p className="mt-1 text-sm text-stone-500">โดย {event.user}</p>
                  </div>
                </li>
              ))}
            </ol> : <p className="py-12 text-center text-sm text-stone-500">ไม่พบประวัติในหมวดนี้</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
