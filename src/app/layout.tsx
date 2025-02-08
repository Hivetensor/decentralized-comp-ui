import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavigationMenu from '@/components/NavigationMenu';
import Footer from '@/components/Footer';
import {Toaster} from '@/components/ui/toaster';
import {AuthProvider} from "@/contexts/AuthContext";
import React from "react";
import {AppWrapper} from "@/components/AppWrapper"


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
            <AppWrapper>
            <NavigationMenu/>
            {children}
            <Footer/>
            <Toaster/>
            </AppWrapper>
        </AuthProvider>
        </body>
        </html>
    );

}
