import { Card } from "@/components/ui/card";

type Props = {
  categories: string[];
  locations: string[];
  statuses: string[];
  defaults?: { q?: string; category?: string; location?: string; status?: string };
};

const field = "h-12 w-full rounded-xl border border-stone-300 bg-white px-4 outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/20";

function Select({ name, label, options, value }: { name: string; label: string; options: string[]; value?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block font-semibold">{label}</span>
      <select name={name} defaultValue={value ?? ""} className={field}>
        <option value="">ทั้งหมด</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

// ใช้ <form method="get"> → ค่าไปอยู่ใน searchParams ไม่ต้องใช้ JS
export function FilterBar({ categories, locations, statuses, defaults = {} }: Props) {
  return (
    <Card>
      <form method="get" className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
        <label className="block sm:col-span-2 lg:col-span-1">
          <span className="mb-2 block font-semibold">ตัวกรอง/ค้นหา</span>
          <input name="q" defaultValue={defaults.q} placeholder="ค้นหาชื่อหรือรหัสครุภัณฑ์" className={field} />
        </label>
        <Select name="category" label="หมวดหมู่" options={categories} value={defaults.category} />
        <Select name="location" label="สถานที่" options={locations} value={defaults.location} />
        <Select name="status" label="สถานะ" options={statuses} value={defaults.status} />
        <button type="submit" className="h-12 w-full rounded-xl bg-red-700 px-8 font-bold text-white hover:bg-red-800 sm:col-span-2 lg:col-span-1 lg:w-auto">
          ค้นหา
        </button>
      </form>
    </Card>
  );
}
