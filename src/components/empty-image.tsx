"use client";

import Image from "next/image";
import React from "react";

export default function EmptyImage({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`${className} w-full flex flex-col items-center justify-center space-y-6`}
    >
      <Image src="/empty.svg" alt="Empty" width={300} height={300} />
      <div className="text-center space-y-3">
        <p className="text-sm text-muted-foreground">Empty</p>
      </div>
    </div>
  );
}
