import { cn } from "@/lib/utils";
import React from "react";

export function BackgroundGrid({children}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-[100] inset-0 ",
        "[background-size:40px_40px]",
        // Use a darker grid color and add opacity for better visibility
        "[background-image:linear-gradient(to_right,rgba(34,197,94,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.15)_1px,transparent_1px)]",
        "dark:[background-image:linear-gradient(to_right,rgba(16,185,129,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.25)_1px,transparent_1px)]"
      )}
    >
      {children}
    </div>
  );
}
