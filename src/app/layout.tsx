import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import { LanguageProvider } from "@/components/providers/language-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://gopay.example.com"),
  title: {
    default: "GoPay | AI-Powered Resume Builder",
    template: "%s | GoPay",
  },
  description:
    "Create polished resumes with AI guidance, ATS-ready formatting, and export-ready templates.",
  keywords: ["resume builder", "AI resume", "ATS resume", "career tools"],
  authors: [{ name: "GoPay" }],
  openGraph: {
    title: "GoPay | AI-Powered Resume Builder",
    description:
      "Create polished resumes with AI guidance, ATS-ready formatting, and export-ready templates.",
    url: "https://gopay.example.com",
    siteName: "GoPay",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoPay | AI-Powered Resume Builder",
    description:
      "Create polished resumes with AI guidance, ATS-ready formatting, and export-ready templates.",
  },
  alternates: { canonical: "https://gopay.example.com" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          value={{ dark: "dark", light: "light" }}
        >
          <AuthSessionProvider>
            <LanguageProvider>
              <Navbar />
              <main className="flex-1 pt-20">{children}</main>
            </LanguageProvider>
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
