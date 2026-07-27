import "./globals.css";
import {Metadata} from "next";
import {Space_Grotesk, Inter, Space_Mono} from "next/font/google";
import ThemeProvider from "../components/layout/ThemeProvider";
import I18nProvider from "../components/layout/I18nProvider";
import React from "react";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-space-grotesk",
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-inter",
});

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-space-mono",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "https://jakub-urbanski.me";

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: "Jakub Urbański | IT Specialist & Web Developer",
        template: "%s | Jakub Urbański",
    },
    description: "Portfolio of Jakub Urbański, an experienced IT Specialist and Web Developer specializing in Linux/Windows systems administration, network engineering, virtualization, and modern full-stack web applications.",
    keywords: [
        "Jakub Urbański",
        "IT Specialist",
        "Web Developer",
        "Systems Administrator",
        "Linux Administrator",
        "Network Engineer",
        "Full-stack Developer",
        "React Developer",
        "Next.js Portfolio",
        "Virtualization",
        "Active Directory",
        "Warsaw IT Specialist"
    ],
    authors: [{ name: "Jakub Urbański", url: "https://github.com/frogalo" }],
    creator: "Jakub Urbański",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "profile",
        locale: "en_US",
        alternateLocale: "pl_PL",
        url: baseUrl,
        title: "Jakub Urbański | IT Specialist & Web Developer",
        description: "Portfolio of Jakub Urbański. IT Specialist specializing in Linux/Windows system administration, network engineering, virtualization, and building scalable full-stack web applications.",
        siteName: "Jakub Urbański Portfolio",
        images: [
            {
                url: "/logo.png",
                width: 1200,
                height: 630,
                alt: "Jakub Urbański - IT Specialist & Web Developer Portfolio",
            },
        ],
        firstName: "Jakub",
        lastName: "Urbański",
        username: "frogalo",
        gender: "male",
    },
    twitter: {
        card: "summary_large_image",
        title: "Jakub Urbański | IT Specialist & Web Developer",
        description: "Portfolio of Jakub Urbański. IT Specialist & Web Developer specializing in Linux/Windows administration, network engineering, and modern full-stack development.",
        images: ["/logo.png"],
        creator: "@frogalo",
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon-32x32.png",
    },
    alternates: {
        canonical: "/",
        languages: {
            "en-US": "/?lang=en",
            "pl-PL": "/?lang=pl",
        },
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable}`} suppressHydrationWarning>
        <head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Jakub Urbański",
                        "url": baseUrl,
                        "image": `${baseUrl}/logo.png`,
                        "jobTitle": "IT Specialist & Web Developer",
                        "knowsAbout": [
                            "Linux Systems Administration",
                            "Windows Server Systems Administration",
                            "Virtualization Platforms (Proxmox, VMware)",
                            "Network Engineering & Security",
                            "Active Directory Services",
                            "Full-stack Web Development",
                            "React.js",
                            "Next.js",
                            "Node.js & Express",
                            "Database Design & Prisma ORM"
                        ],
                        "sameAs": [
                            "https://github.com/frogalo",
                            "https://www.linkedin.com/in/jakub-urba%C5%84ski-9ab9a212b/"
                        ],
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Warsaw",
                            "addressCountry": "PL"
                        }
                    })
                }}
            />
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
