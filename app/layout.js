import { Julius_Sans_One, Source_Sans_3 } from "next/font/google"; // Source Sans Pro is now Source Sans 3 in Google Fonts
import "./globals.css";

const julius = Julius_Sans_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-julius",
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
  display: 'swap',
});

export const metadata = {
  title: "Ghulam Abbas Imran | Faisalabad Real Estate Agent",
  description: "Luxury Homes and Real Estate Portfolio in Faisalabad.",
};

import PageTransition from "@/components/PageTransition";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${julius.variable} ${sourceSans.variable}`} suppressHydrationWarning>
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
