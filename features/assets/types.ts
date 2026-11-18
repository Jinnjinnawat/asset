export type AssetStatus = "ปกติ" | "ไม่พบ" | "สถานที่ไม่ตรง" | "รอซ่อม";

export type AssetRow = {
  code: string;
  name: string;
  location: string;
  lastChecked: string | null;
  status: AssetStatus;
};
