"use client";

import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Github, Download, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useCallback, useMemo } from "react";

// Types
interface ContactItem {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    link?: string;
}

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface CVDownload {
    fileName: string;
    label: string;
    variant: "primary" | "secondary" | "accent";
}

interface SubmitMessage {
    type: "success" | "error";
    text: string;
}

// Custom hook for form handling
const useContactForm = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<SubmitMessage | null>(null);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const validateForm = useCallback((): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !!(
            formData.name.trim() &&
            formData.email.trim() &&
            emailRegex.test(formData.email) &&
            formData.subject.trim() &&
            formData.message.trim()
        );
    }, [formData]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setSubmitMessage({ type: "error", text: t("formValidationError") });
            return;
        }

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
                setSubmitMessage({
                    type: "error",
                    text: result.error || t("sendMessageError")
                });
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitMessage({ type: "error", text: t("sendMessageError") });
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, validateForm, t]);

    return {
        formData,
        isSubmitting,
        submitMessage,
        handleChange,
        handleSubmit,
        isValid: validateForm()
    };
};

// Sub-components
const ContactItem = ({ item }: { item: ContactItem }) => {
    const { t } = useTranslation();
    const ItemContent = (
        <>
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-secondary/20 rounded-lg border border-secondary/30 group-hover:bg-secondary/30 transition-colors duration-200">
                <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col min-w-0">
        <span className="font-medium text-sm text-primary/70 uppercase tracking-wide">
          {t(item.label)}
        </span>
                <span className="text-primary text-lg font-semibold truncate">
          {t(item.value)}
        </span>
            </div>
        </>
    );

    return (
        <li className="group">
            {item.link ? (
                <a
                    href={item.link}
                    target={item.link.startsWith('http') ? "_blank" : undefined}
                    rel={item.link.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 rounded-lg border border-transparent hover:border-accent/20 hover:bg-secondary/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
                    aria-label={`${t(item.label)}: ${t(item.value)}`}
                >
                    {ItemContent}
                </a>
            ) : (
                <div className="flex items-center gap-4 p-4">
                    {ItemContent}
                </div>
            )}
        </li>
    );
};

const CVDownloadButton = ({ cv }: { cv: CVDownload }) => {
    const { t } = useTranslation();
    const cvPath = `/files/${cv.fileName}`;

    const variantStyles = {
        primary: "bg-primary text-background hover:bg-primary/90",
        secondary: "bg-secondary text-primary hover:bg-secondary/90 border border-primary/20",
        accent: "bg-accent text-background hover:bg-accent/90"
    };

    return (
        <motion.a
            href={cvPath}
            download={cv.fileName}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center gap-3 py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-accent/50 ${variantStyles[cv.variant]}`}
            aria-label={`Download ${t(cv.label)}`}
        >
            <Download className="w-5 h-5" />
            {t(cv.label)}
        </motion.a>
    );
};

const ContactForm = () => {
    const { t } = useTranslation();
    const { formData, isSubmitting, submitMessage, handleChange, handleSubmit, isValid } = useContactForm();

    const inputFields = [
        { name: "name", type: "text", placeholder: t("yourName"), colSpan: "md:col-span-1" },
        { name: "email", type: "email", placeholder: t("yourEmail"), colSpan: "md:col-span-1" },
        { name: "subject", type: "text", placeholder: t("messageSubject"), colSpan: "md:col-span-2" }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 max-w-4xl mx-auto bg-background p-8 rounded-2xl shadow-xl border border-primary/10"
        >
            <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-primary mb-2">
                    {t("sendMeMessage")}
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {inputFields.map((field) => (
                        <div key={field.name} className={field.colSpan}>
                            <label
                                htmlFor={field.name}
                                className="block mb-2 text-primary font-medium capitalize"
                            >
                                {t(field.name)} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                value={formData[field.name as keyof FormData]}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-secondary/20 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-primary placeholder:text-primary/50 transition-all duration-200"
                                placeholder={field.placeholder}
                                aria-describedby={`${field.name}-error`}
                            />
                        </div>
                    ))}
                </div>

                <div>
                    <label htmlFor="message" className="block mb-2 text-primary font-medium">
                        {t("message")} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-secondary/20 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-primary placeholder:text-primary/50 transition-all duration-200 resize-vertical"
                        placeholder={t("yourMessage")}
                        aria-describedby="message-error"
                    />
                </div>

                <div className="text-center">
                    <motion.button
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        whileHover={!isSubmitting && isValid ? { scale: 1.05 } : {}}
                        whileTap={!isSubmitting && isValid ? { scale: 0.95 } : {}}
                        className={`inline-flex items-center gap-3 px-8 py-4 font-semibold rounded-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                            isSubmitting || !isValid
                                ? "bg-primary/50 text-background/50 cursor-not-allowed"
                                : "bg-primary text-background hover:bg-primary/90 hover:shadow-xl"
                        }`}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                                {t("sending")}
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                {t("sendMessage")}
                            </>
                        )}
                    </motion.button>
                </div>

                <AnimatePresence mode="wait">
                    {submitMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`flex items-center gap-3 p-4 rounded-lg ${
                                submitMessage.type === "success"
                                    ? "bg-green-50 text-green-800 border border-green-200"
                                    : "bg-red-50 text-red-800 border border-red-200"
                            }`}
                        >
                            {submitMessage.type === "success" ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                                <AlertCircle className="w-5 h-5 text-red-600" />
                            )}
                            <span className="font-medium">{submitMessage.text}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </motion.div>
    );
};

// Main component
export default function AboutSection() {
    const { t } = useTranslation();

    const contactItems: ContactItem[] = useMemo(() => [
        {
            icon: MapPin,
            label: "contactLocationLabel",
            value: "contactLocationValue"
        },
        {
            icon: Mail,
            label: "contactEmailLabel",
            value: "contactEmailValue",
            link: "mailto:ivo.urbanski@gmail.com"
        },
        {
            icon: Github,
            label: "contactGithubLabel",
            value: "contactGithubValue",
            link: "https://github.com/frogalo"
        }
    ], []);

    const cvDownloads: CVDownload[] = useMemo(() => [
        {
            fileName: "CV_Jakub_Urbanski_IT_Admin.pdf",
            label: "downloadCV_IT",
            variant: "primary"
        },
        {
            fileName: "CV_Jakub_Urbanski_DevOps.pdf",
            label: "downloadCV_DevOps",
            variant: "secondary"
        },
        {
            fileName: "CV_Jakub_Urbanski_Web_Dev.pdf",
            label: "downloadCV_WebDev",
            variant: "accent"
        }
    ], []);

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="py-16 max-w-7xl mx-auto px-4"
            aria-labelledby="about-heading"
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <h2
                    id="about-heading"
                    className="text-5xl font-bold mb-4 text-primary relative inline-block"
                >
                    {t("about")}
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
                </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
                {/* About Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-8"
                >
                    <div className="prose prose-lg max-w-none">
                        <p className="text-xl text-primary leading-relaxed mb-6">
                            {t("aboutText1")}
                        </p>
                        <p className="text-xl text-primary leading-relaxed">
                            {t("aboutText2")}
                        </p>
                    </div>

                    {/* CV Downloads */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold text-primary mb-4">
                            {t("downloadResume")}
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {cvDownloads.map((cv, index) => (
                                <CVDownloadButton key={cv.fileName} cv={cv} />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Contact Information */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-background p-8 rounded-2xl shadow-xl border border-primary/10"
                >
                    <h3 className="text-3xl font-bold mb-8 text-primary text-center">
                        {t("contact")}
                    </h3>
                    <ul className="space-y-2">
                        {contactItems.map((item, index) => (
                            <ContactItem key={index} item={item} />
                        ))}
                    </ul>
                </motion.div>
            </div>

            <ContactForm />
        </motion.section>
    );
}