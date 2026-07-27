"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

export default function BigFooter() {
  const { t } = useTranslation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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
    <footer id="contact" className="w-full bg-text/[0.01] text-text py-24 px-6 md:px-12 mt-24 border-t border-text/10 font-sans relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />

      <div className="max-w-[1920px] mx-auto z-10 relative">
        {/* Contact CTA Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="flex flex-col gap-6">
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
              {t("footerTalkTitle", "LET'S TALK.")}
            </h2>
            <p className="text-lg text-text/60 max-w-md leading-relaxed">
              {t("footerTalkDesc", "Have an infrastructure bottleneck, virtualization setup, or a web application project in mind? Let's connect and build a solution.")}
            </p>
          </div>

          <div className="flex flex-col justify-end gap-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:ivo.urbanski@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-text text-background font-mono text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-opacity rounded-none"
              >
                <Mail size={16} />
                {t("footerSendEmail", "Send Email")}
              </a>
              <a
                href="https://www.linkedin.com/in/jakub-urba%C5%84ski-9ab9a212b/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-text/20 hover:border-text font-mono text-xs uppercase tracking-widest font-bold transition-colors rounded-none"
              >
                <Linkedin size={16} />
                {t("footerLinkedin", "LinkedIn")}
              </a>
            </div>
            <p className="text-xs font-mono opacity-50">
              {t("footerDirectMsg", "Prefer direct messaging? I'll respond within 24 hours.")}
            </p>
          </div>
        </div>

        {/* Directory & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-t border-b border-text/10">
          {/* Logo / Brand statement */}
          <div className="flex flex-col gap-4">
            <span className="text-sm font-mono font-bold tracking-[0.25em] uppercase">JAKUB URBAŃSKI</span>
            <span className="text-xs text-text/50 max-w-xs leading-relaxed uppercase font-semibold">
              {t("footerBrandDesc", "IT Specialist & Web Developer. Managing systems, virtualization, and building scalable web applications.")}
            </span>
          </div>

          {/* Links Column */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] opacity-40">
              {t("footerPagesLabel", "Pages")}
            </span>
            <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-wider">
              <a href="#projects" onClick={(e) => handleNavClick(e, "#projects")} className="text-text/75 hover:text-text hover:underline transition-all">
                {t("footerPageWork", "Work")}
              </a>
              <a href="#experience" onClick={(e) => handleNavClick(e, "#experience")} className="text-text/75 hover:text-text hover:underline transition-all">
                {t("footerPageExperience", "Experience")}
              </a>
              <a href="#education" onClick={(e) => handleNavClick(e, "#education")} className="text-text/75 hover:text-text hover:underline transition-all">
                {t("footerPageEducation", "Education")}
              </a>
            </div>
          </div>

          {/* Socials / Direct Column */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] opacity-40">
              {t("footerContactLabel", "Contact / Code")}
            </span>
            <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-wider">
              <a href="mailto:ivo.urbanski@gmail.com" className="text-text/75 hover:text-text hover:underline transition-all">ivo.urbanski@gmail.com</a>
              <a href="https://github.com/frogalo" target="_blank" rel="noopener noreferrer" className="text-text/75 hover:text-text hover:underline transition-all flex items-center gap-1">
                <Github size={12} /> github.com/frogalo
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-xs font-mono uppercase opacity-50 tracking-wider">
          <span>© {new Date().getFullYear()} Jakub Urbański</span>
          <span className="mt-2 sm:mt-0">{t("allRightsReserved", "All rights reserved")}</span>
        </div>
      </div>
    </footer>
  );
}
