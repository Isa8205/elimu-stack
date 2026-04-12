'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

interface NavbarProps {
  children?: React.ReactNode;
}

export function Navbar({ children }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 px-4 w-full border-b bg-primary">
      <div className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-accent flex items-center justify-center">
            <span className="font-bold text-sm text-accent-foreground">ES</span>
          </div>
          <span className="font-bold hidden sm:inline text-primary-foreground">ElimuStack</span>
        </Link>

        {children && (
          <div className="hidden md:flex items-center space-x-6">
            {children}
          </div>
        )}

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-primary-foreground">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-8">
              {children}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
