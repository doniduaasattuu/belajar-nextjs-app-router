"use client";

import Image from "next/image";
import React from "react";

import { Button } from "./ui/button";

export default function EmptyImage() {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6">
      <Image src="/empty.svg" alt="Empty" width={300} height={300} />
      <div className="text-center space-y-3">
        <p className="text-sm text-muted-foreground">
          It seems you don&apos;t have a list
        </p>
        <Button
          onClick={() => console.log("OK")}
          className="cursor-pointer"
          variant="outline"
        >
          Create
        </Button>
      </div>
    </div>
  );
}
