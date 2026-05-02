"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "LINKEDIN",
    url: "https://www.linkedin.com/in/jakub-urba%C5%84ski-9ab9a212b/",
    delay: 0,
    bgColor: "#7ec10b",
    textColor: "#0b0118"
  },
  { 
    name: "EMAIL", 
    url: "mailto:ivo.urbanski@gmail.com", 
    delay: 0.1,
    bgColor: "#0e17fa",
    textColor: "#f1e7fe"
  },
];

export default function BigFooter() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-[var(--footer-bg)] text-[var(--footer-text)] py-24 px-4 md:px-8 mt-20 border-t border-primary/10 transition-colors duration-500 font-bold">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-sm uppercase tracking-widest leading-relaxed">
          {t("footerFollow")}
          <br />
          {t("footerTalk")}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: link.delay, duration: 0.5 }}
              style={{ backgroundColor: link.bgColor, color: link.textColor }}
              className="group relative border border-primary/20 h-40 md:h-56 flex items-center justify-center overflow-hidden hover:opacity-90 transition-all duration-500 ease-out rounded-sm"
            >
              <span className="text-3xl md:text-4xl font-black uppercase tracking-tighter z-10">
                {link.name}
              </span>
            </motion.a>
          ))}
        </div>

        <div className="flex justify-end text-xs opacity-60 uppercase tracking-wider mt-8">
          © {new Date().getFullYear()} - {t("allRightsReserved")} - Jakub Urbański
        </div>
      </div>
    </footer>
  );
}
