"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const socialLinks = [
  { name: "DRIBBBLE", url: "#", delay: 0 },
  {
    name: "LINKEDIN",
    url: "https://www.linkedin.com/in/jakub-urbanski-js/",
    delay: 0.1,
  },
  { name: "EMAIL", url: "mailto:kubaurbanski09@gmail.com", delay: 0.2 },
  ];

export default function BigFooter() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-accent/90 text-primary py-12 px-4 md:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-sm font-light opacity-80 uppercase tracking-widest">
          {t("footerFollow")}
          <br />
          {t("footerTalk")}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              className="group relative border border-primary/20 bg-primary/5 h-40 md:h-56 flex items-center justify-center overflow-hidden hover:bg-primary hover:text-background transition-colors duration-500 ease-out"
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
