// English Imports
import { common as commonEn } from "../locales/en/common";
import { hero as heroEn } from "../locales/en/hero";
import { about as aboutEn } from "../locales/en/about";
import { skills as skillsEn } from "../locales/en/skills";
import { projects as projectsEn } from "../locales/en/projects";
import { experience as experienceEn } from "../locales/en/experience";
import { education as educationEn } from "../locales/en/education";
import { dates as datesEn } from "../locales/en/dates";

// Polish Imports
import { common as commonPl } from "../locales/pl/common";
import { hero as heroPl } from "../locales/pl/hero";
import { about as aboutPl } from "../locales/pl/about";
import { skills as skillsPl } from "../locales/pl/skills";
import { projects as projectsPl } from "../locales/pl/projects";
import { experience as experiencePl } from "../locales/pl/experience";
import { education as educationPl } from "../locales/pl/education";
import { dates as datesPl } from "../locales/pl/dates";

const resources = {
    en: {
        translation: {
            ...commonEn,
            ...heroEn,
            ...aboutEn,
            ...skillsEn,
            ...projectsEn,
            ...experienceEn,
            ...educationEn,
            ...datesEn
        }
    },
    pl: {
        translation: {
            ...commonPl,
            ...heroPl,
            ...aboutPl,
            ...skillsPl,
            ...projectsPl,
            ...experiencePl,
            ...educationPl,
            ...datesPl
        }
    }
};

export default resources;