"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const statuses = ["ปกติ", "ชำรุด", "รอซ่อม", "จำหน่ายแล้ว"] as const;

export function ScanInspectDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [status, setStatus] = useState<(typeof statuses)[number]>("ปกติ");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-auto inline-flex min-h-14 items-center gap-2 rounded-xl border border-red-700 px-6 py-3 font-bold text-red-700 transition hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700 sm:px-8"
      >
        เริ่มสแกนตรวจสอบ <span aria-hidden>→</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="scan-inspect-title"
            className="relative my-auto max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-stone-200 bg-white p-5 shadow-xl sm:p-6"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="ปิดหน้าต่าง"
              className="absolute right-4 top-4 rounded-lg p-2 text-stone-500 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-red-700"
            >
              <X className="size-5" aria-hidden />
            </button>

            <h2 id="scan-inspect-title" className="pr-10 text-lg font-bold">2 · สแกนตรวจสอบ</h2>
            <p className="mt-1 text-sm text-stone-500">ผลสแกน</p>

            <div className="mt-4 flex min-h-[124px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-stone-400 px-4 py-5 text-center">
              <p className="text-sm text-stone-500">ชี้กล้องไปที่ QR Tag บนเครื่อง</p>
              <button
                type="button"
                className="rounded-xl border border-red-500 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
              >
                สแกนเครื่องอื่น
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold">AI-0123 · เครื่องพิมพ์</p>
                <p className="mt-1 text-sm text-stone-500">อาคาร A ห้อง 204 · สแกนเมื่อ 09:42</p>
              </div>
              <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">ตรงทะเบียน</span>
            </div>

            <button
              type="button"
              aria-expanded={showHistory}
              aria-controls="asset-history"
              onClick={() => setShowHistory((current) => !current)}
              className="mt-4 min-h-10 rounded-lg border border-stone-300 px-3 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
            >
              {showHistory ? "ซ่อนประวัติ" : "ดูประวัติเครื่อง"}
            </button>

            {showHistory && (
              <section id="asset-history" aria-label="ประวัติเครื่อง" className="mt-3 rounded-xl bg-stone-50 p-3">
                <h3 className="text-sm font-bold">ประวัติการย้ายและดำเนินการ</h3>
                <ol className="mt-3 space-y-3 border-l border-stone-300 pl-4">
                  <li className="relative text-sm before:absolute before:-left-[21px] before:top-1.5 before:size-2 before:rounded-full before:bg-red-600">
                    <p className="font-semibold">ย้ายไปอาคาร A ห้อง 204</p>
                    <p className="mt-0.5 text-xs text-stone-500">12 พ.ย. 2568 · โดย ผู้ใช้ 1</p>
                  </li>
                  <li className="relative text-sm before:absolute before:-left-[21px] before:top-1.5 before:size-2 before:rounded-full before:bg-stone-400">
                    <p className="font-semibold">บันทึกผลตรวจ: ปกติ</p>
                    <p className="mt-0.5 text-xs text-stone-500">8 พ.ย. 2568 · อาคาร A ห้อง 201 · โดย ผู้ใช้ 2</p>
                  </li>
                  <li className="relative text-sm before:absolute before:-left-[21px] before:top-1.5 before:size-2 before:rounded-full before:bg-stone-400">
                    <p className="font-semibold">ลงทะเบียนเครื่องและสร้าง QR Tag</p>
                    <p className="mt-0.5 text-xs text-stone-500">3 ม.ค. 2567 · อาคาร A ห้อง 201 · โดย ผู้ใช้ 1</p>
                  </li>
                </ol>
              </section>
            )}

            <h3 className="mt-7 text-lg font-bold">3 · แก้สถานะ</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {statuses.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={status === item}
                  onClick={() => setStatus(item)}
                  className={`min-h-11 rounded-xl border px-3 py-2 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 ${
                    status === item
                      ? "border-red-500 bg-red-50 font-semibold text-red-700"
                      : "border-stone-300 text-stone-800 hover:bg-stone-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <label htmlFor="scan-note" className="mt-4 block text-sm font-semibold">หมายเหตุ</label>
            <textarea
              id="scan-note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)"
              rows={1}
              className="mt-1.5 min-h-11 w-full resize-y rounded-xl border border-stone-300 px-3 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-4 min-h-12 w-full rounded-xl bg-red-700 px-4 py-3 font-bold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
            >
              บันทึกสถานะ
            </button>
          </section>
        </div>
      )}
    </>
  );
}
