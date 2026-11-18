import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "primary";
};

export function Card({ className, variant = "default", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-[0_2px_10px_rgba(28,25,23,0.025)] sm:p-6",
        variant === "primary" ? "border-transparent bg-red-700 text-white shadow-[0_8px_24px_rgba(127,29,29,0.12)]" : "border-stone-200/90 bg-white",
        className
      )}
      {...props}
    />
  );
}
