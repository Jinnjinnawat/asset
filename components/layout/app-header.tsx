import { Boxes, CircleHelp } from "lucide-react";
import { TopNav } from "./top-nav";

type AppHeaderProps = {
  mode?: "viewer" | "operator";
};

export function AppHeader({ mode = "viewer" }: AppHeaderProps) {
  const isOperator = mode === "operator";
  const userLabel = isOperator ? "ผู้ใช้ 1 · ทะเบียน + ตรวจสอบ" : "ผู้ใช้ 2 · ดูภาพรวม";

  return (
    <header className="sticky top-0 z-20 border-b border-stone-200/80 bg-white/95 px-4 backdrop-blur-xl sm:px-6 lg:px-10">
      <div className="mx-auto flex min-h-[64px] max-w-[1500px] items-center justify-between gap-4 lg:min-h-[76px] lg:gap-8">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-700 text-white shadow-sm">
            <Boxes className="size-5" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold tracking-tight text-stone-900 sm:text-base">ระบบตรวจสอบครุภัณฑ์</span>
            <span className="hidden text-[10px] font-semibold tracking-[0.16em] text-stone-400 sm:block">ASSET INSPECTION</span>
          </span>
        </div>

        <div className="hidden lg:block">
          <TopNav />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button type="button" aria-label="ช่วยเหลือ" className="hidden size-9 items-center justify-center rounded-xl text-stone-500 transition hover:bg-stone-100 hover:text-stone-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 sm:flex">
            <CircleHelp className="size-[18px]" aria-hidden />
          </button>
          <span className={`rounded-full px-2.5 py-1.5 text-[11px] font-semibold sm:px-3 ${isOperator ? "bg-red-50 text-red-800" : "bg-amber-50 text-amber-800"}`}>
            {isOperator ? "ผู้ปฏิบัติงาน" : "ดูอย่างเดียว"}
          </span>
          <span className="hidden max-w-56 truncate rounded-full bg-stone-100 px-3.5 py-2 text-xs font-semibold text-stone-700 xl:block">{userLabel}</span>
          <button type="button" className="hidden whitespace-nowrap rounded-lg px-2 py-2 text-xs font-medium text-stone-500 transition hover:bg-stone-50 hover:text-stone-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 xl:block">
            ออกจากระบบ
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-[1500px] pb-2 lg:hidden">
        <TopNav />
      </div>
    </header>
  );
}
