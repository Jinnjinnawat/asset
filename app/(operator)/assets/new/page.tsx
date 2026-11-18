import { ClipboardList, QrCode } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScanInspectDialog } from "@/components/assets/scan-inspect-dialog";
import { RegisterAssetDialog } from "@/components/assets/register-asset-dialog";

const recentWork = [
  { title: "ลงทะเบียน AI-0160", user: "ผู้ใช้ 1", status: "ลงทะเบียนแล้ว", tone: "green" },
  { title: "สแกน AI-0102 สถานที่ไม่ตรง", user: "ผู้ใช้ 1", status: "ส่วนต่าง", tone: "amber" },
  { title: "แก้สถานะ AI-0131", user: "ผู้ใช้ 1", status: "รอซ่อม", tone: "amber" },
] as const;

const statusStyles = {
  green: "bg-green-100 text-green-800",
  amber: "bg-amber-100 text-amber-800",
};

export default function ChooseAssetTaskPage() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">ต้องการทำอะไร?</h1>
        <p className="mt-2 text-lg text-stone-500 sm:mt-3 sm:text-xl">เลือกงานที่ต้องการเริ่มต้น</p>
      </div>

      <section aria-label="เลือกงาน" className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <Card variant="primary" className="flex min-h-[390px] flex-col items-start sm:min-h-[440px] sm:p-8 lg:p-10">
          <ClipboardList className="size-8" aria-hidden />
          <h2 className="mt-5 text-2xl font-bold sm:mt-7 sm:text-3xl">ลงทะเบียนเครื่อง</h2>
          <p className="mt-2 text-lg text-red-100 sm:text-xl">เพิ่มเครื่องใหม่เข้าระบบ</p>
          <ul className="mt-5 space-y-2.5 text-base sm:mt-6 sm:space-y-3 sm:text-lg">
            <li className="flex gap-3"><span aria-hidden>−</span><span>กรอกข้อมูลเครื่องและสถานที่ตั้ง</span></li>
            <li className="flex gap-3"><span aria-hidden>−</span><span>ระบบสร้าง QR Tag ให้อัตโนมัติ</span></li>
            <li className="flex gap-3"><span aria-hidden>−</span><span>พิมพ์ป้ายไปติดบนเครื่อง</span></li>
          </ul>
          <RegisterAssetDialog />
        </Card>

        <Card className="flex min-h-[390px] flex-col items-start border-stone-300 bg-white sm:min-h-[440px] sm:p-8 lg:p-10">
          <QrCode className="size-8 text-red-700" aria-hidden />
          <h2 className="mt-5 text-2xl font-bold sm:mt-7 sm:text-3xl">ตรวจสอบเครื่อง</h2>
          <p className="mt-2 text-lg text-stone-500 sm:text-xl">สแกน QR Tag ที่หน้างาน</p>
          <ul className="mt-5 space-y-2.5 text-base sm:mt-6 sm:space-y-3 sm:text-lg">
            <li className="flex gap-3"><span aria-hidden>−</span><span>สแกนและบันทึกผลตรวจ</span></li>
            <li className="flex gap-3"><span aria-hidden>−</span><span>แก้สถานะเครื่อง</span></li>
            <li className="flex gap-3"><span aria-hidden>−</span><span>ดูรายการส่วนต่างที่ไม่ตรงทะเบียน</span></li>
          </ul>
          <ScanInspectDialog />
        </Card>
      </section>

      <Card>
        <div className="border-b border-stone-200 pb-4">
          <h2 className="text-xl font-bold sm:text-2xl">งานล่าสุดของคุณ</h2>
          <p className="mt-1 text-stone-500">ข้อมูลตัวอย่าง</p>
        </div>
        <ul>
          {recentWork.map((work) => (
            <li key={work.title} className="flex flex-col gap-3 border-b border-stone-100 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-5">
              <div>
                <p className="font-medium">{work.title}</p>
                <p className="mt-1 text-sm text-stone-500">{work.user}</p>
              </div>
              <span className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[work.tone]}`}>
                {work.status}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
