import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smart Finance",
  description: "AI-powered financial management platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
        </head>

        <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
            {children}
          </main>

          {/* Toaster */}
          <Toaster richColors position="top-right" />

          {/* Footer */}
          <footer className="bg-gradient-to-r from-[#1e3a8a] via-[#4338ca] to-[#06b6d4] text-white mt-10">
            <div className="max-w-7xl mx-auto px-6 py-8">

              {/* Top Section */}
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">

                {/* Brand */}
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-semibold tracking-wide">
                    Smart Finance
                  </h2>
                  <p className="text-sm text-white/80 mt-1 max-w-xs">
                    AI-powered platform to track and optimize your finances efficiently.
                  </p>
                </div>

                {/* Links */}
                <div className="flex gap-6 text-sm">
                  <a href="#" className="hover:text-white/80 transition">
                    About
                  </a>
                  <a href="#" className="hover:text-white/80 transition">
                    Privacy
                  </a>
                  <a href="#" className="hover:text-white/80 transition">
                    Terms
                  </a>
                  <a href="#" className="hover:text-white/80 transition">
                    Contact
                  </a>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/20 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-white/70 gap-2">

                <p>
                  © {new Date().getFullYear()} Smart Finance. All rights reserved.
                </p>

                <p className="flex items-center gap-1">
                  Made with <span className="text-red-400">❤️</span> by G27
                </p>

              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}