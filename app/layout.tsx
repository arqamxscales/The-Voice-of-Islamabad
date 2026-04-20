import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Voice of Islamabad",
  description:
    "Independent News | Corporate Analysis | ABC Certified | Pakistan & Global"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
