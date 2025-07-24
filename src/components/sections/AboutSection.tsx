"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Mail, MapPin, Github } from "lucide-react"; // Import necessary icons

export default function AboutSection() {
    const { t } = useTranslation();

    const contactItems = [
        { icon: MapPin, label: "contactLocationLabel", value: "contactLocationValue", link: null },
        // { icon: Phone, label: "contactPhoneLabel", value: "contactPhoneValue", link: null },
        { icon: Mail, label: "contactEmailLabel", value: "contactEmailValue", link: "mailto:ivo.urbanski@gmail.com" },
        { icon: Github, label: "contactGithubLabel", value: "contactGithubValue", link: "https://github.com/frogalo" },
    ];

    // You'll need to place your CV file in the 'public' directory.
    // For example, in 'public/files/Jakub_Urbański_CV.pdf'
    const cvFileName = "Jakub_Urbański_CV.pdf"; // Name of your CV file
    const cvPath = `/files/${cvFileName}`; // Path accessible from the web root

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="py-12"
        >
            <h2 className="text-4xl font-bold mb-8 border-b-2 border-primary pb-3 text-primary text-center">
                {t("about")}
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
                <div className="flex flex-col justify-center">
                    <p className="mb-6 text-lg text-primary leading-relaxed">
                        {t("aboutText1")}
                    </p>
                    <p className="text-lg text-primary leading-relaxed">
                        {t("aboutText2")}
                    </p>

                    {/* Download CV Button */}
                    <div className="mt-8">
                        <a
                            href={cvPath}
                            download={cvFileName} // Suggests the filename when downloaded
                            className="inline-block bg-secondary text-primary py-3 px-7 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-secondary cursor-pointer text-lg font-semibold"
                        >
                            {t("downloadCV")}
                        </a>
                    </div>
                </div>
                <div className="bg-background p-8 rounded-xl shadow-lg border border-primary">
                    <h3 className="text-2xl font-semibold mb-6 text-primary text-center">
                        {t("contact")}
                    </h3>
                    <ul className="space-y-5 text-primary text-lg">
                        {contactItems.map((item, index) => (
                            <li key={index} className="flex items-center">
                                {/* Icon */}
                                <span className="w-16 h-10 flex items-center justify-center bg-secondary rounded-lg mr-4">
                                    <item.icon className="w-6 h-6 text-primary" />
                                </span>
                                {/* Text */}
                                <div className="flex flex-col">
                                    <span className="font-medium">{t(item.label)}</span>
                                    {item.link ? (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-accent hover:underline transition-colors duration-200"
                                        >
                                            {t(item.value)}
                                        </a>
                                    ) : (
                                        <span>{t(item.value)}</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.section>
    );
}