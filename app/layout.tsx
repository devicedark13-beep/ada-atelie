import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    default: "Ad Ateliê — portal de produtos personalizados",
    template: "%s · Ad Ateliê",
  },
  description:
    "Loja do Ad Ateliê. Presentes e personalizados feitos sob medida. Busque uma peça e peça orçamento pelo WhatsApp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
