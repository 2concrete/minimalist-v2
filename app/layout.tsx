import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
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
    <ClerkProvider>
      <html lang="en">
        <body className={`${interFont.variable} antialiased`}>
          <header className="flex justify-end items-center p-4 gap-4 ">
            <SignedOut>
              <div className="absolute top-0 right-0 px-3 py-2 flex gap-3">
                <SignInButton>
                  <button className="font-[Inter] cursor-pointer hover:opacity-70 transition-all">
                    sign in
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="font-[Inter] cursor-pointer hover:opacity-70 transition-all">
                    sign up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
