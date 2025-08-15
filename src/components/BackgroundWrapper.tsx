"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

function BackgroundContent({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const isEmbedded = searchParams.get("embed") === "true";

  return (
    <div className={isEmbedded ? "bg-transparent" : "bg-indigo-950 h-screen"}>
      {children}
    </div>
  );
}

export default function BackgroundWrapper({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div />}>
      <BackgroundContent>{children}</BackgroundContent>
    </Suspense>
  );
}
