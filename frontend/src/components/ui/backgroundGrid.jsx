import { cn } from "@/lib/utils";
import React from "react";

export function BackgroundGrid({ children, className = "" }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0",
        "bg-gradient-to-br from-gray-50/30 to-green-50/20",
        "dark:from-gray-900/20 dark:to-green-900/10",
        "[background-image:linear-gradient(to_right,rgb(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0,0,0,0.03)_1px,transparent_1px)]",
        "dark:[background-image:linear-gradient(to_right,rgb(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255,255,255,0.03)_1px,transparent_1px)]",
        "[background-size:40px_40px]",
        className
      )}
    >
      {children}
    </div>
  );
}
