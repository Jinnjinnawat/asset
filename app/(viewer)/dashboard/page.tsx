import { AssetTable } from "@/features/assets";
import { FilterBar, SummaryCards, assets, filterOptions, summary } from "@/features/dashboard";

export default function DashboardPage() {
  return (
    <div className="min-w-0 space-y-5 sm:space-y-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">ภาพรวมครุภัณฑ์</h1>
        <p className="mt-1 text-stone-500">สรุปสถานะและผลการตรวจสอบครุภัณฑ์</p>
      </div>
      <SummaryCards {...summary} />
      <FilterBar {...filterOptions} />
      <AssetTable rows={assets} total={summary.total} />
    </div>
  );
}
