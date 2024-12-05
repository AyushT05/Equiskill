import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google"; // Import Montserrat font
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ToasterProvider from "@/components/providers/ToasterProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Load Montserrat font
const montserrat = Montserrat({
  subsets: ['latin'], // Specify subsets if needed
   // Specify weights you want to use
});

export const metadata: Metadata = {
  title: "EquiSkill-AI",
  description: "Empowering Every Learner Through Intelligent Assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${montserrat.className} antialiased`} // Apply Montserrat font here
        > <ToasterProvider/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
