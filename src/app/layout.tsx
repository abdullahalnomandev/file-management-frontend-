import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import AntProvider from "../lib/provider/AntProvider";
import { Toaster } from "sonner";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const metadata: Metadata = {
  title: "File Management",
  description:
    "Discover a smarter shopping experience designed just for you. Browse thousands of products, enjoy app-only discounts, track your orders, and get everything you love — all with a single tap with Spiralink.",
  // icons: {
  //   icon: "/favicon.svg",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AntProvider>
      <html lang="en">
        <body
          className={`${manrope.variable}  antialiased`}
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          <Toaster position="top-center" duration={2000} />
          {children}
        </body>
      </html>
    </AntProvider>
  );
}
