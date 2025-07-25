import "./globals.css";
import {Metadata} from "next";
import {Kodchasan} from "next/font/google";
import ThemeProvider from "../components/layout/ThemeProvider";
import I18nProvider from "../components/layout/I18nProvider";
import React from "react";

const kodchasan = Kodchasan({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-kodchasan",
});

export const metadata: Metadata = {
    title: "Jakub Urbański",
    description: "IT Specialist & Web Developer Portfolio",
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
        <body> {/* No inline script in head anymore */}
        <I18nProvider>
            {/* ThemeProvider will manage the data-theme attribute */}
            <ThemeProvider>{children}</ThemeProvider>
        </I18nProvider>
        </body>
        </html>
    );
}