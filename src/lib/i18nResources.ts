const resources = {
    en: {
        translation: {
            // --- General/Global ---
            // welcome: "Welcome to My Portfolio", // Still not used in the current page structure
            allRightsReserved: "All rights reserved",

            // --- Header ---
            // (Navigation items are handled by their keys directly in the component)

            // --- Hero Section ---
            // Modified to match the HomePage component content directly for clarity
            heroTitle: "IT Administrator & Web Developer",
            heroDescription: "System administration specialist with full-stack development skills, creating efficient IT solutions and intuitive web applications",

            // --- About Section ---
            about: "About",
            aboutText1: "I am an IT Administrator with experience in managing networks and systems (AD, Proxmox), enhancing security, automating tasks (PowerShell), and building web applications. I am currently pursuing a Master's degree in Computer Science at Politechnika Warszawska.",
            aboutText2: "I am passionate about creating efficient IT solutions and intuitive web applications. I specialize in system administration, virtualization, and full-stack development with a focus on practical, user-centered solutions.",
            contact: "Contact Information", // Title for the contact section
            contactLocationLabel: "Location:",
            contactLocationValue: "Warsaw, Poland",
            contactPhoneLabel: "Phone:",
            contactPhoneValue: "+48 504 977 011",
            contactEmailLabel: "Email:",
            contactEmailValue: "ivo.urbanski@gmail.com",
            contactGithubLabel: "GitHub:",
            contactGithubValue: "github.com/frogalo",

            // --- Skills Section ---
            skills: "Skills",
            "System Administration": "System Administration",
            "Active Directory": "Active Directory",
            "Proxmox Virtualization": "Proxmox Virtualization",
            "Linux/Windows Servers": "Linux/Windows Servers",
            "Networking (TCP/IP, DNS, DHCP)": "Networking (TCP/IP, DNS, DHCP)",
            "PowerShell Automation": "PowerShell Automation",
            "Web Development": "Web Development",
            "Google Workspace/M365": "Google Workspace/M365",
            "Endpoint Management": "Endpoint Management",
            "Docker": "Docker",
            "Security": "Security",
            "API Integration": "API Integration",

            // --- Projects Section ---
            projects: "Projects",
            "IT Dashboard": "IT Dashboard",
            "IT Dashboard description": "Admin dashboard with Google and ADFS login displaying users and statuses from multiple sources (AD, Google, Slack, Miro) for centralized management",
            "TableMate": "TableMate",
            "TableMate description": "Unified platform for company resource management (desks, rooms, parking) and ordering services",
            "Gramatyk": "Gramatyk",
            "Gramatyk description": "Web app fetching Polish word declensions from external source via serverless proxy API",
            "ScholarHub": "ScholarHub",
            "ScholarHub description": "University platform supporting recruitment, online meetings, chat, and grading system",

            // --- Experience Section ---
            experience: "Experience",
            "IT Administrator": "IT Administrator",
            "IT Administrator at Reikon Games description": "Administrowanie infrastrukturą serwerową (Windows/Linux, Proxmox VE), automatyzacja zadań przy użyciu PowerShell, zarządzanie cyklem życia urządzeń końcowych, tworzenie wewnętrznych paneli monitorujących, administrowanie platformami SaaS",
            "IT Support and Project Coordinator": "IT Support and Project Coordinator",
            "IT Support and Project Coordinator description": "Świadczenie usług wsparcia IT, zarządzanie usługami Microsoft 365 i Google, organizacja międzynarodowych wydarzeń ze wsparciem technicznym dla ponad 500 uczestników",
            "CEX Team Analyst": "CEX Team Analyst",
            "CEX Team Analyst at Orange Poland description": "Przeprowadzanie analiz konkurencji zwiększające udział w rynku o 15%, testowanie aplikacji mobilnych odkrywające ponad 100 błędów, opracowanie strategii gamifikacji dla pracowników",
        }
    },
    pl: {
        translation: {
            // --- General/Global ---
            // welcome: "Witam w moim portfolio", // Still not used in the current page structure
            allRightsReserved: "Wszystkie prawa zastrzeżone",

            // --- Header ---
            // (Navigation items are handled by their keys directly in the component)

            // --- Hero Section ---
            heroTitle: "Administrator IT & Web Developer", // Added Polish translation for the hero title
            heroDescription: "Specjalista IT i administrator systemów z umiejętnościami full-stack development. Moim celem jest usprawnianie procesów IT poprzez automatyzację i tworzenie intuicyjnych aplikacji.",

            // --- Sekcja O mnie ---
            about: "O mnie",
            aboutText1: "Jestem Administratorem IT z doświadczeniem w zarządzaniu sieciami i systemami (AD, Proxmox), zwiększaniu bezpieczeństwa, automatyzacji zadań (PowerShell) i tworzeniu aplikacji webowych. Obecnie studiuję na Politechnice Warszawskiej na kierunku Informatyka.",
            aboutText2: "Pasjonuję się tworzeniem efektywnych rozwiązań IT i intuicyjnych aplikacji webowych. Specjalizuję się w administracji systemami, wirtualizacji i full-stack developmencie z naciskiem na praktyczne, skoncentrowane na użytkowniku rozwiązania.",
            contact: "Dane kontaktowe", // Title for the contact section
            contactLocationLabel: "Lokalizacja:",
            contactLocationValue: "Warszawa, Polska",
            contactPhoneLabel: "Telefon:",
            contactPhoneValue: "+48 504 977 011",
            contactEmailLabel: "Email:",
            contactEmailValue: "ivo.urbanski@gmail.com",
            contactGithubLabel: "GitHub:",
            contactGithubValue: "github.com/frogalo",

            // --- Sekcja Umiejętności ---
            skills: "Umiejętności",
            "System Administration": "Administracja systemami",
            "Active Directory": "Active Directory",
            "Proxmox Virtualization": "Wirtualizacja Proxmox",
            "Linux/Windows Servers": "Serwery Linux/Windows",
            "Networking (TCP/IP, DNS, DHCP)": "Sieci (TCP/IP, DNS, DHCP)",
            "PowerShell Automation": "Automatyzacja PowerShell",
            "Web Development": "Tworzenie aplikacji webowych",
            "Google Workspace/M365": "Google Workspace/M365",
            "Endpoint Management": "Zarządzanie urządzeniami końcowymi",
            "Docker": "Docker",
            "Security": "Bezpieczeństwo",
            "API Integration": "Integracja API",

            // --- Sekcja Projekty ---
            projects: "Projekty",
            "IT Dashboard": "IT Dashboard",
            "IT Dashboard description": "Panel administratora z logowaniem Google i ADFS wyświetlający użytkowników i statusy z wielu źródeł (AD, Google, Slack, Miro) do scentralizowanego zarządzania",
            "TableMate": "TableMate",
            "TableMate description": "Ujednolicona platforma do zarządzania zasobami firmy (stanowiska, sale konferencyjne, parkingi) i zamawiania usług",
            "Gramatyk": "Gramatyk",
            "Gramatyk description": "Aplikacja webowa pobierająca odmiany polskich słów z zewnętrznego źródła przez serwerowe API proxy",
            "ScholarHub": "ScholarHub",
            "ScholarHub description": "Platforma uniwersytecka wspierająca rekrutację, spotkania online, czat i system oceniania",

            // --- Sekcja Doświadczenie ---
            experience: "Doświadczenie",
            "IT Administrator": "Administrator IT",
            "IT Administrator at Reikon Games description": "Administrowanie infrastrukturą serwerową (Windows/Linux, Proxmox VE), automatyzacja zadań przy użyciu PowerShell, zarządzanie cyklem życia urządzeń końcowych, tworzenie wewnętrznych paneli monitorujących, administrowanie platformami SaaS",
            "IT Support and Project Coordinator": "Wsparcie IT i Koordynator Projektów",
            "IT Support and Project Coordinator description": "Świadczenie usług wsparcia IT, zarządzanie usługami Microsoft 365 i Google, organizacja międzynarodowych wydarzeń ze wsparciem technicznym dla ponad 500 uczestników",
            "CEX Team Analyst": "Analityk Zespołu CEX",
            "CEX Team Analyst at Orange Poland description": "Przeprowadzanie analiz konkurencji zwiększające udział w rynku o 15%, testowanie aplikacji mobilnych odkrywające ponad 100 błędów, opracowanie strategii gamifikacji dla pracowników",
        }
    }
};

export default resources;