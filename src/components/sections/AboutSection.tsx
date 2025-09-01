"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Mail, MapPin, Github } from "lucide-react";
import { useState } from "react";

export default function AboutSection() {
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: string; text: string } | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const contactItems = [
        { icon: MapPin, label: "contactLocationLabel", value: "contactLocationValue", link: null },
        { icon: Mail, label: "contactEmailLabel", value: "contactEmailValue", link: "mailto:ivo.urbanski@gmail.com" },
        { icon: Github, label: "contactGithubLabel", value: "contactGithubValue", link: "https://github.com/frogalo" },
    ];

    const cvFileName = "Jakub_Urbański_CV.pdf";
    const cvPath = `/files/${cvFileName}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (response.ok) {
                setSubmitMessage({ type: "success", text: t("messageSent") });
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                setSubmitMessage({ type: "error", text: result.error || t("sendMessageError") });
            }
        } catch (err) {
            console.error("Form submission error:", err);
            setSubmitMessage({ type: "error", text: t("sendMessageError") });
        } finally {
            setIsSubmitting(false);
        }
    };

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

                    <div className="mt-8">
                        <a
                            href={cvPath}
                            download={cvFileName}
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
                                <span className="w-16 h-10 flex items-center justify-center bg-secondary rounded-lg mr-4">
                                    <item.icon className="w-6 h-6 text-primary" />
                                </span>
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

            {/* Email Contact Form */}
            <div className="mt-76 max-w-3xl mx-auto bg-background p-8 rounded-xl shadow-lg border border-primary">
                <h3 className="text-2xl font-semibold mb-6 text-primary text-center">
                    {t("sendMeMessage")}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-primary font-medium">
                                {t("name")}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-secondary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary"
                                placeholder={t("yourName")}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-primary font-medium">
                                {t("email")}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-secondary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary"
                                placeholder={t("yourEmail")}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-2 text-primary font-medium">
                            {t("subject")}
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-secondary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary"
                            placeholder={t("messageSubject")}
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-2 text-primary font-medium">
                            {t("message")}
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full px-4 py-3 bg-secondary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary"
                            placeholder={t("yourMessage")}
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-8 py-3 cursor-pointer bg-secondary text-primary font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl ${
                                isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-secondary"
                            }`}
                        >
                            {isSubmitting ? t("sending") : t("sendMessage")}
                        </button>
                    </div>
                    {submitMessage && (
                        <div
                            className={`mt-4 p-4 rounded-lg text-center ${
                                submitMessage.type === "success"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
                            {submitMessage.text}
                        </div>
                    )}
                </form>
            </div>
        </motion.section>
    );
}