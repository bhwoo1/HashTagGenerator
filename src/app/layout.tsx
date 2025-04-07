import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "./providers/ClientProvider";
import Footer from "./components/layout/Footer";
import { ModeProvider } from "./providers/ModeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "#해시태그 #생성기",
  description: "이미지를 업로드해서 SNS용 해시태그를 생성하세요",
  icons: {
		icon: "/hashtag.png",
	},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ModeProvider><ClientProvider>{children}</ClientProvider></ModeProvider>
        <Footer />
      </body>
    </html>
  );
}
