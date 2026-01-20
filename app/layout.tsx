import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Header from "./_components/Header/Header";
import { WhatsAppButton } from "./_components/WhatsAppButton/WhatsAppButton";
import DiscountModal from "./_components/DiscountModal/DiscountModal";
import Footer from "./_components/Footer/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "600", "800"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Tigers Seminovos",
    default: "Tigers Seminovos",
  },
  description: "Os melhores seminovos com qualidade e procedência garantida. Encontre seu próximo veículo na Tigers Seminovos.",

  openGraph: {
    title: "Tigers Seminovos",
    description: "Os melhores seminovos com qualidade e procedência garantida.",
    url: "https://tigers-seminovos.vercel.app",
    siteName: "Tigers Seminovos",
    images: [
      {
        url: "https://tigers-seminovos.vercel.app/og-image.png",
        width: 1920,
        height: 1080,
        alt: "Tigers Seminovos",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body 
        className={montserrat.className}
        style={{ backgroundColor: "black", color: "#fff", minHeight: "100vh" }}
      >
        <Header />
        {children}
        <DiscountModal />
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
