import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Calculadora de Equiparação Hospitalar | Q&M Consultoria",
  description:
    "Médicos, dentistas e clínicas: descubra em 2 minutos quanto sua PJ pode economizar em impostos federais com o benefício da Lei 9.249/95.",
  openGraph: {
    title: "Calculadora de Equiparação Hospitalar | Q&M Consultoria",
    description:
      "Em 2 minutos, descubra quanto seu CNPJ da saúde pode economizar mensalmente.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans min-h-screen flex flex-col">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
