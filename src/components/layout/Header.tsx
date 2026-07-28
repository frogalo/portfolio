"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import ThemeSwitcher from "../../components/icons/ThemeSwitcher";
import LanguageSwitcher from "../../components/icons/LanguageSwitcher";
import { Menu, X } from "lucide-react";

interface HeaderProps {
    currentTheme: "light" | "dark" | "system";
    onThemeChangeAction: (theme: "light" | "dark" | "system") => void;
    showLogo?: boolean;
}

export default function Header({
                                   currentTheme,
                                   onThemeChangeAction,
                                   showLogo = true,
                               }: HeaderProps) {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { label: t("footerPageWork", "Work"), href: "#projects" },
        { label: t("footerPageExperience", "Experience"), href: "#experience" },
        { label: t("footerPageEducation", "Education"), href: "#education" },
        { label: t("navContact", "Contact"), href: "#contact" },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <header 
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled || isMenuOpen
                    ? "bg-background/90 backdrop-blur-md border-b border-text/10 py-4 shadow-sm"
                    : "bg-transparent py-6 border-b border-transparent"
            }`}
        >
            <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex justify-between items-center">
                {/* Left side: Logo */}
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-sm font-mono font-bold tracking-[0.25em] uppercase hover:text-[var(--primary)] transition-colors duration-300 flex items-center gap-2 w-10 sm:w-55 md:w-65 shrink-0"
                >
                    <span className="px-2 py-0.5 border border-text text-xs rounded-none font-bold">JU</span>
                    <span className={`hidden sm:inline-block transition-all duration-500 ease-out overflow-hidden whitespace-nowrap ${
                        showLogo 
                            ? "opacity-100 translate-x-0 max-w-50 pointer-events-auto" 
                            : "opacity-0 -translate-x-2 max-w-0 pointer-events-none"
                    }`}>
                        Jakub Urbański
                    </span>
                </a>

                {/* Center: Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8 font-mono text-xs uppercase tracking-wider">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className="text-text/70 hover:text-text hover:underline underline-offset-4 transition-all duration-200"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Right side: Switchers & Mobile Toggle */}
                <div className="flex items-center space-x-4">
                    <div className="hidden sm:flex items-center space-x-2">
                        <LanguageSwitcher />
                        <ThemeSwitcher
                            currentTheme={currentTheme}
                            onThemeChangeAction={onThemeChangeAction}
                        />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-text/80 hover:text-text cursor-pointer"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-background border-t border-text/10 absolute top-full left-0 w-full shadow-lg py-6 px-6 flex flex-col gap-6 font-mono text-xs uppercase tracking-wider">
                    <div className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className="py-2 text-text/80 hover:text-text transition-colors border-b border-text/5"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Switchers in Mobile Menu */}
                    <div className="flex items-center justify-between pt-4 border-t border-text/10">
                        <span className="text-text/40">Preferences</span>
                        <div className="flex items-center gap-3">
                            <LanguageSwitcher />
                            <ThemeSwitcher
                                currentTheme={currentTheme}
                                onThemeChangeAction={onThemeChangeAction}
                            />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}