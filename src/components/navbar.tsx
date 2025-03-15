"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar({ className }: { className: unknown }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full p-3 bg-background shadow-md">
      <div
        className={`${className} container mx-auto flex items-center justify-between`}
      >
        <Link href="/" className="text-xl font-bold">
          TodoApp
        </Link>

        <div className="hidden md:flex space-x-6 items-center text-sm">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-muted-foreground hover:text-foreground transition"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-muted-foreground hover:text-foreground transition"
          >
            Contact
          </Link>
          <Button
            onClick={() => signOut({ callbackUrl: "/login" })}
            variant="link"
            className="text-muted-foreground p-0 "
          >
            Sign out
          </Button>
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-6">
            <div className="flex flex-col space-y-4 mt-6">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground transition"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground transition"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <ModeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
