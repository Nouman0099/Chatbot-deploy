"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function BackgroundWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isEmbedRoute =
    pathname === "/popup/financeforfounder" || pathname === "/financeforfounder";

  return (
    <div className={isEmbedRoute ? "bg-transparent" : "bg-indigo-950"}>{children}</div>
  );
}