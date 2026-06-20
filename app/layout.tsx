import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { getDictionary } from "@/lib/i18n";
import "./globals.css";

const copy = getDictionary("zh");

export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
