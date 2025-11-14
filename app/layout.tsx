import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "minimalist.",
  description: "a minial todolist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={"/"}>
      <html lang="en">
        <body className={`${interFont.variable} antialiased`}>
          <header className="flex justify-end items-center p-4 gap-4 ">
            <SignedOut>
              <div className="absolute top-0 right-0 px-3 py-2 flex gap-3">
                <SignInButton mode="redirect">
                  <button className="font-[Inter] cursor-pointer hover:opacity-70 transition-all">
                    sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="redirect">
                  <button className="font-[Inter] cursor-pointer hover:opacity-70 transition-all">
                    sign up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="absolute mt-8">
                <UserButton />
              </div>
            </SignedIn>
          </header>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
