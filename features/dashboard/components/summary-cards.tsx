import { Activity, AlertTriangle, Archive, ClipboardCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

type Summary = { total: number; inspected: number; broken: number; discrepancies: number };

function Stat({ label, children, footer, icon, tone = "red" }: { label: string; children: React.ReactNode; footer?: React.ReactNode; icon: React.ReactNode; tone?: "red" | "green" | "amber" }) {
  const tones = { red: "bg-red-50 text-red-800", green: "bg-emerald-50 text-emerald-800", amber: "bg-amber-50 text-amber-800" };
  return (
    <Card className="relative min-h-[154px] overflow-hidden sm:min-h-[176px]">
      <div className="flex items-start justify-between gap-2"><p className="text-sm font-medium text-stone-500">{label}</p><span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}>{icon}</span></div>
      <div className="mt-3">{children}</div>
      {footer}
    </Card>
  );
}

export function SummaryCards({ total, inspected, broken, discrepancies }: Summary) {
  const pct = total ? Math.round((inspected / total) * 100) : 0;
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      <Stat label="ครุภัณฑ์ทั้งหมด" icon={<Archive className="size-[18px]" aria-hidden />}>
        <p className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{total}<span className="ml-2 text-sm font-medium text-stone-400">รายการ</span></p>
      </Stat>
      <Stat tone="green" icon={<ClipboardCheck className="size-[18px]" aria-hidden />}
        label="ตรวจสอบแล้ว"
        footer={
          <div
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-4 h-1.5 overflow-hidden rounded-full bg-stone-100"
          >
            <div className="h-full rounded-full bg-emerald-600" style={{ width: `${pct}%` }} />
          </div>
        }
      >
        <p className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{inspected}<span className="ml-2 text-sm font-medium text-stone-400">รายการ</span></span>
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800">{pct}%</span>
        </p>
      </Stat>
      <Stat tone="amber" label="ชำรุด / รอซ่อม" icon={<AlertTriangle className="size-[18px]" aria-hidden />}>
        <p className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{broken}<span className="ml-2 text-sm font-medium text-stone-400">รายการ</span></p>
      </Stat>
      <Stat icon={<Activity className="size-[18px]" aria-hidden />} label="รายการส่วนต่าง">
        <p className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{discrepancies}<span className="ml-2 text-sm font-medium text-stone-400">รายการ</span></p>
      </Stat>
    </div>
  );
}
