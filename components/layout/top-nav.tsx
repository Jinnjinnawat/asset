"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, History, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/assets/new", label: "ทะเบียนและตรวจสอบ", shortLabel: "ทะเบียน", icon: ClipboardList },
  { href: "/dashboard", label: "ภาพรวม", shortLabel: "ภาพรวม", icon: LayoutDashboard },
  { href: "/audit-log", label: "ประวัติสถานะ", shortLabel: "ประวัติ", icon: History },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="เมนูหลัก" className="fixed inset-x-0 bottom-0 z-30 border-t border-stone-200 bg-white/95 px-3 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 shadow-[0_-8px_24px_rgba(28,25,23,0.06)] backdrop-blur-xl lg:static lg:z-auto lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-1 lg:flex lg:max-w-none lg:items-center lg:gap-1 lg:rounded-2xl lg:bg-stone-100 lg:p-1">
        {links.map(({ href, label, shortLabel, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-medium leading-tight text-stone-500 transition-colors hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 lg:min-h-10 lg:flex-row lg:gap-2 lg:px-3 lg:text-[13px]",
                active && "bg-red-50 font-semibold text-red-800 lg:bg-white lg:shadow-[0_1px_3px_rgba(28,25,23,0.09)]",
              )}
            >
              <Icon className={cn("size-[18px] shrink-0 lg:size-4", active ? "text-red-700" : "text-stone-400")} aria-hidden />
              <span className="lg:hidden">{shortLabel}</span>
              <span className="hidden whitespace-nowrap lg:inline">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
