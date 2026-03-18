import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrystalFinder - Materials Discovery Platform",
  description: "Three.js crystal structure viewer, materials database, and property predictor",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
