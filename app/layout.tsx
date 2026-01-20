import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Header from "./_components/Header/Header";
import { WhatsAppButton } from "./_components/WhatsAppButton/WhatsAppButton";
import DiscountModal from "./_components/DiscountModal/DiscountModal";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "600", "800"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Tigers Seminovos",
    default: "Tigers Seminovos",
  }
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
      </body>
    </html>
  );
}
