import "./globals.css";
import Nav from "@/components/Nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "League Companion",
  description: "Insights + community for your fantasy league"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="container py-6">{children}</main>
      </body>
    </html>
  );
}
