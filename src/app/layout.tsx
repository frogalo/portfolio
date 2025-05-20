import "./globals.css";
import { Metadata } from "next";
import { Kodchasan } from "next/font/google";
import ThemeProvider from "../components/layout/ThemeProvider";
import React from "react";

const kodchasan = Kodchasan({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-kodchasan",
});

export const metadata: Metadata = {
    title: "Portfolio",
    description: "My personal portfolio website",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={kodchasan.variable}>
        <body>
        <ThemeProvider>{children}</ThemeProvider>
        </body>
        </html>
    );
}
