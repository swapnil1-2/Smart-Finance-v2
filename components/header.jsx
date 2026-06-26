import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";

const Header = async () => {
  await checkUser();

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center"
        >
          <Image
            src={"/logo.png"}
            alt="Smart Finance Logo"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <SignedOut>
            <a
              href="#features"
              className="px-3 py-1.5 rounded-lg text-gray-600 font-medium"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="px-3 py-1.5 rounded-lg text-gray-600 font-medium"
            >
              Testimonials
            </a>
          </SignedOut>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <SignedIn>

            {/* Dashboard - Simple Style */}
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-gray-300 text-gray-700"
              >
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>

            {/* Add Transaction - Simple Style */}
            <Link href="/transaction/create">
              <Button
                className="flex items-center gap-2 bg-gray-800 text-white"
              >
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link>

          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700"
              >
                Login
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-10 h-10 ring-1 ring-gray-200",
                },
              }}
            />
          </SignedIn>

        </div>
      </nav>
    </header>
  );
};

export default Header;
