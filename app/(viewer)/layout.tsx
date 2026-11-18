import { AppHeader } from "@/components/layout/app-header";

export default function ViewerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      <AppHeader />
      <main className="mx-auto max-w-[1500px] px-4 pt-7 pb-28 sm:px-6 md:px-10 md:pt-10 md:pb-28 lg:pb-10">{children}</main>
    </div>
  );
}
