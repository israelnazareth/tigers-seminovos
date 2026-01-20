import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agende sua visita",
};

export default function AgendeSuaVisitaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
