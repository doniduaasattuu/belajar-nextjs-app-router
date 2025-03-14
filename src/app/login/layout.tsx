import React from "react";
import GuestLayout from "../layouts/guest-layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuestLayout>{children}</GuestLayout>;
}
