import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavigationMenu from '@/components/NavigationMenu';
import Footer from '@/components/Footer';
import {UserProvider} from '@/contexts/UserContext';
import {Toaster} from '@/components/ui/toaster';
import {AuthProvider} from "@/contexts/AuthContext";


const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});


export const metadata: Metadata = {
    title: "Home | HiveTensor",
    description: "HiveTensor website",
};


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={geistSans.className}>
        <head>
            <link rel="icon" href="/favicon.ico"/>
        </head>
        <body>
        <AuthProvider>
        <UserProvider>
            <NavigationMenu/>
            {children}
            <Footer/>
            <Toaster/>
        </UserProvider>
        </AuthProvider>
        </body>
        </html>
    );
}