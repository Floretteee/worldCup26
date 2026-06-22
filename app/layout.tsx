import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import "./globals.css";

const copy = getDictionary("zh");

export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
