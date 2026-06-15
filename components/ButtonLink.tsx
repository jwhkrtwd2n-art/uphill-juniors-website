import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "dark" | "sky" | "light";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "sky",
  className = "",
}: ButtonLinkProps) {
  const classes =
    variant === "sky"
      ? "bg-sky-600 text-white hover:bg-sky-700"
      : variant === "light"
        ? "border border-slate-300 bg-white text-slate-950 hover:bg-slate-50"
        : "bg-blue-950 text-white hover:bg-sky-700";

  const allClasses = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-black transition ${classes} ${className}`;

  if (
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.endsWith(".pdf")
  ) {
    const opensInNewTab = href.startsWith("http") || href.endsWith(".pdf");

    return (
      <a
        href={href}
        className={allClasses}
        target={opensInNewTab ? "_blank" : undefined}
        rel={opensInNewTab ? "noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={allClasses}>
      {children}
    </Link>
  );
}
