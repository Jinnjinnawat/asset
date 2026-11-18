"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, X } from "lucide-react";

const fieldClassName =
  "mt-1.5 min-h-11 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-800 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100";
const labelClassName = "block text-sm font-semibold text-stone-800";

export function RegisterAssetDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-auto inline-flex min-h-14 items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-red-700 transition hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-8"
      >
        เริ่มลงทะเบียน <ArrowRight className="size-5" aria-hidden />
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
            aria-labelledby="register-asset-title"
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

            <h2 id="register-asset-title" className="pr-10 text-lg font-bold">1 · ลงทะเบียนเครื่อง</h2>
            <p className="mt-1 text-sm text-stone-500">ข้อมูลเครื่อง</p>

            <form onSubmit={handleSubmit} className="mt-3 space-y-3">
              <div>
                <label htmlFor="asset-name" className={labelClassName}>ชื่อเครื่อง</label>
                <input id="asset-name" name="assetName" required placeholder="เช่น เครื่องพิมพ์ HP LaserJet" className={fieldClassName} />
              </div>

              <div>
                <label htmlFor="asset-code" className={labelClassName}>รหัสครุภัณฑ์</label>
                <input id="asset-code" name="assetCode" required placeholder="เช่น AI-0123" className={fieldClassName} />
              </div>

              <div>
                <label htmlFor="asset-category" className={labelClassName}>หมวดหมู่</label>
                <select id="asset-category" name="category" defaultValue="office" className={fieldClassName}>
                  <option value="office">อุปกรณ์สำนักงาน</option>
                  <option value="computer">คอมพิวเตอร์และอุปกรณ์</option>
                  <option value="furniture">เฟอร์นิเจอร์</option>
                  <option value="other">อื่น ๆ</option>
                </select>
              </div>

              <div>
                <label htmlFor="asset-location" className={labelClassName}>สถานที่ตั้ง</label>
                <select id="asset-location" name="location" required defaultValue="" className={fieldClassName}>
                  <option value="" disabled>เลือกสถานที่ตั้ง</option>
                  <option value="building-a-204">อาคาร A ห้อง 204</option>
                  <option value="building-a-205">อาคาร A ห้อง 205</option>
                  <option value="building-b-101">อาคาร B ห้อง 101</option>
                </select>
              </div>

              <div>
                <label htmlFor="asset-owner" className={labelClassName}>ผู้รับผิดชอบ</label>
                <input id="asset-owner" name="owner" placeholder="ชื่อผู้ดูแลเครื่อง" className={fieldClassName} />
              </div>

              <div>
                <label htmlFor="asset-contract" className={labelClassName}>ข้อมูลสัญญาเครื่อง</label>
                <select id="asset-contract" name="contract" defaultValue="" className={fieldClassName}>
                  <option value="" disabled>เลือกประเภทสัญญา</option>
                  <option value="owned">ครุภัณฑ์ของหน่วยงาน</option>
                  <option value="lease">สัญญาเช่า</option>
                  <option value="service">สัญญาบริการ</option>
                  <option value="none">ไม่มีสัญญา</option>
                </select>
              </div>

              <button
                type="submit"
                className="min-h-11 w-full rounded-xl bg-red-700 px-4 py-2.5 font-bold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
              >
                บันทึกและสร้าง QR Tag
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
