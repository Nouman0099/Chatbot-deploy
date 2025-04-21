// "use client";

// import { usePathname } from "next/navigation";
// import { ReactNode } from "react";

// export default function BackgroundWrapper({ children }: { children: ReactNode }) {
//   const pathname = usePathname();

//   const isEmbedRoute =
//     pathname === "/popup/financeforfounder" || pathname === "/financeforfounder";

//   return (
//     <div className={isEmbedRoute ? "bg-transparent" : "bg-indigo-950"}>{children}</div>
//   );
// }

"use client";

import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

export default function BackgroundWrapper({ children }: { children: ReactNode }) {
//   const pathname = usePathname();
  const searchParams = useSearchParams();

  const isEmbedded = searchParams.get("embed") === "true";

  return (
    <div className={isEmbedded ? "bg-transparent" : "bg-indigo-950 h-screen"}>
      {children}
    </div>
  );
}
