"use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import ThemeSwitcher from "@/components/icons/ThemeSwitcher";
import LanguageSwitcher from "@/components/icons/LanguageSwitcher";

interface HeaderProps {
    activeSection: string;
    setActiveSectionAction: (section: string) => void;
    currentTheme: "light" | "dark" | "system";
    onThemeChangeAction: (theme: "light" | "dark" | "system") => void;
}

export default function Header({
                                   activeSection,
                                   setActiveSectionAction,
                                   currentTheme,
                                   onThemeChangeAction,
                               }: HeaderProps) {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = ["about", "skills", "projects", "experience"];

    // Function to handle navigation clicks
    const handleNavClick = (section: string) => {
        setActiveSectionAction(section);
        setIsMenuOpen(false); // Close mobile menu if open
    };

    // Helper to generate dynamic classes for navigation buttons
    const getNavItemClasses = (item: string) => {
        const baseClasses =
            "capitalize transition-colors duration-200 cursor-pointer py-2 px-3 rounded-md";
        const activeClasses = "font-bold text-[var(--text)]"; // Using --accent for active text
        const inactiveClasses =
            "text-[var(--header-txt)] hover:text-[var(--primary)]"; // Using --header-txt and --primary for inactive/hover

        if (activeSection === item) {
            return `${baseClasses} ${activeClasses}`;
        } else {
            return `${baseClasses} ${inactiveClasses}`;
        }
    };

    return (
        // Apply header-specific background and text colors
        <header className="fixed top-0 w-full bg-[var(--header-bg)] text-[var(--header-txt)] backdrop-blur-sm z-10 shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Left side: Logo/Name - Make it clickable to go to 'about' */}
                <button
                    onClick={() => handleNavClick("about")}
                    className="text-xl font-bold cursor-pointer" // Ensure it's visible with header-txt
                    aria-label="Go to About section"
                >
                    Jakub Urbański
                </button>

                {/* Center: Desktop Navigation */}
                <nav className="hidden md:flex space-x-6">
                    {navItems.map((item) => (
                        <button
                            key={item}
                            onClick={() => handleNavClick(item)}
                            className={getNavItemClasses(item)}
                        >
                            {t(item)}
                        </button>
                    ))}
                </nav>

                {/* Right side: Switchers & Mobile Menu Toggle */}
                <div className="flex items-center space-x-2">
                    {/* Switchers displayed only on desktop */}
                    <div className="hidden md:flex items-center space-x-2">
                        <LanguageSwitcher />
                        <ThemeSwitcher
                            currentTheme={currentTheme}
                            onThemeChangeAction={onThemeChangeAction}
                        />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md text-[var(--header-txt)] cursor-pointer" // Use header-txt for icon color
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu (appears when isMenuOpen is true) */}
            {isMenuOpen && (
                <div className="md:hidden bg-[var(--header-bg)] text-[var(--header-txt)] border-t border-primary">
                    {" "}
                    {/* Use header vars here too */}
                    <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
                        {/* Mobile Navigation Items */}
                        {navItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => handleNavClick(item)}
                                className={`capitalize py-2 text-left ${
                                    activeSection === item
                                        ? "text-[var(--text)] font-bold" // Active state in mobile menu
                                        : "text-[var(--header-txt)]" // Inactive state in mobile menu
                                } cursor-pointer`}
                            >
                                {t(item)}
                            </button>
                        ))}
                    </div>
                    {/* Switchers moved inside the mobile menu */}
                    <div className="container mx-auto px-4 py-3 border-t border-[var(--primary)] flex justify-center items-center space-x-4">
                        {" "}
                        {/* Use primary for border */}
                        <LanguageSwitcher />
                        <ThemeSwitcher
                            currentTheme={currentTheme}
                            onThemeChangeAction={onThemeChangeAction}
                        />
                    </div>
                </div>
            )}
        </header>
    );
}