import type { Metadata } from "next";
import "./global.css";
import Header from "@/components/site/header";
import Footer from "@/components/site/footer";
import ScrollSensitivity from "@/components/scroll-sensitivity";

export const metadata: Metadata = {
  title: "JustInception Studio",
  description:
    "Design, development, and AI-driven speed to help your brand lift off with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-brand-bg">
      <body className="min-h-dvh bg-brand-bg text-neutral-50 antialiased">
        <ScrollSensitivity />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

