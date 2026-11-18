import { cn } from "@/lib/utils";
import type { AssetStatus } from "../types";

export type { AssetStatus } from "../types";

const styles: Record<AssetStatus, string> = {
  ปกติ: "bg-green-100 text-green-800",
  ไม่พบ: "bg-red-900 text-white",
  สถานที่ไม่ตรง: "bg-amber-50 text-amber-800",
  รอซ่อม: "bg-amber-100 text-amber-800",
};

export function StatusBadge({ status }: { status: AssetStatus }) {
  return (
    <span className={cn("inline-block whitespace-nowrap rounded-full px-3 py-1 text-sm font-semibold", styles[status])}>
      {status}
    </span>
  );
}
