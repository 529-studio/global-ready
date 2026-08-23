import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Global-Ready",
  description: "Zero-cost English interview practice for software developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

