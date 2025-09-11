import type { Metadata } from "next";
import { Lato } from "next/font/google";

import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ReactNode } from "react";
import { OG_IMAGE, SITE_DOMAIN } from "@/config/metadata";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

export const metadata: Metadata = {
  title: "Лелека – Все про вагітність: поради, календар, щоденник",
  description:
    "Додаток «Лелека» допомагає майбутнім мамам та батькам стежити за розвитком малюка, отримувати корисні поради, вести щоденник вагітності та фіксувати важливі події.",
  openGraph: {
    title: "Лелека – Все про вагітність: поради, календар, щоденник",
    description:
      "Додаток «Лелека» допомагає майбутнім мамам та батькам стежити за розвитком малюка, отримувати корисні поради, вести щоденник вагітності та фіксувати важливі події.",
    url: SITE_DOMAIN,
    images: [OG_IMAGE],
    type: "website",
  },
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
