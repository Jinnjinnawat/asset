import { Card } from "@/components/ui/card";
import type { AuditItem } from "../types";

export type { AuditItem } from "../types";

export function AuditLogPanel({ items }: { items: AuditItem[] }) {
  return (
    <Card>
      <h2 className="text-2xl font-bold">Audit Log</h2>
      <p className="mt-1 text-stone-500">ประวัติการเปลี่ยนแปลงล่าสุด</p>
      <ul className="mt-5">
        {items.map((i) => (
          <li key={i.id} className="flex items-start justify-between gap-3 border-t border-stone-200 py-4 sm:gap-4">
            <div className="min-w-0">
              <p>{i.text}</p>
              <p className="text-sm text-stone-500">{i.user}</p>
            </div>
            <time className="shrink-0 text-stone-500">{i.time}</time>
          </li>
        ))}
      </ul>
    </Card>
  );
}
