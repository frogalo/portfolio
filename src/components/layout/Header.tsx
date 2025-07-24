"use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import ThemeSwitcher from "@/components/icons/ThemeSwitcher";
import LanguageSwitcher from "@/components/icons/LanguageSwitcher";

interface HeaderProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
    currentTheme: "light" | "dark" | "system";
    onThemeChange: (theme: "light" | "dark" | "system") => void;
}

export default function Header({
                                   activeSection,
                                   setActiveSection,
                                   currentTheme,
                                   onThemeChange,
                               }: HeaderProps) {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = ["about", "skills", "projects", "experience"];

    return (
        <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10 shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold">Jakub Urbański</h1>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6">
                    {navItems.map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveSection(item)}
                            className={`capitalize transition-colors ${
                                activeSection === item
                                    ? "text-blue-600 dark:text-blue-400 font-medium"
                                    : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                            }`}
                        >
                            {t(item)}
                        </button>
                    ))}
                </nav>

                {/* Switchers */}
                <div className="flex items-center space-x-2">
                    <LanguageSwitcher />
                    <ThemeSwitcher
                        currentTheme={currentTheme}
                        onThemeChangeAction={onThemeChange}
                    />

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
                        {navItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => {
                                    setActiveSection(item);
                                    setIsMenuOpen(false);
                                }}
                                className={`capitalize py-2 text-left ${
                                    activeSection === item
                                        ? "text-blue-600 dark:text-blue-400 font-medium"
                                        : "text-gray-600 dark:text-gray-300"
                                }`}
                            >
                                {t(item)}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}