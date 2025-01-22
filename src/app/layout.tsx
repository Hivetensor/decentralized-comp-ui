import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavigationMenu from '@/components/NavigationMenu';
import Footer from '@/components/Footer';
import {WalletProvider} from "@/contexts/WalletContext";


const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});


export const metadata: Metadata = {
    title: "HiveTensor",
    description: "HiveTensor website",
};


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={geistSans.className}>
        <body>
        <WalletProvider>
        <NavigationMenu/>
        {children}
        <Footer/>
        </WalletProvider>
        </body>
        </html>
    );
}