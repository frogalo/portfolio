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
        <html lang="en" className={kodchasan.variable} suppressHydrationWarning>
        <head>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var theme = savedTheme ? savedTheme : systemTheme;
                  
                  if (theme === 'system') {
                    theme = systemTheme;
                  }

                  document.documentElement.setAttribute('data-theme', theme);
                  
                  // Forcefully set standard variables inline to prevent snap
                  var navBtnColor = theme === 'dark' ? '#c879ff' : '#e91e63';
                  document.documentElement.style.setProperty('--nav-btn-color', navBtnColor);

                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
                }}
            />
        </head>
        <body>
        <I18nProvider>
            {/* ThemeProvider will manage the data-theme attribute */}
            <ThemeProvider>{children}</ThemeProvider>
        </I18nProvider>
        </body>
        </html>
    );
}