const resources = {
    en: {
        translation: {
            // --- General/Global ---
            allRightsReserved: "All rights reserved",

            // --- Header ---

            // --- Hero Section ---
            heroTitle: "IT Administrator & Web Developer",
            heroDescription: "System administration specialist with full-stack development skills, creating efficient IT solutions and intuitive web applications",

            // --- About Section ---
            about: "About",
            aboutText1: "I am an IT Administrator with experience in managing networks and systems (AD, Proxmox), enhancing security, automating tasks (PowerShell), and building web applications. I am currently pursuing a Master's degree in Computer Science at Politechnika Warszawska.",
            aboutText2: "I am passionate about creating efficient IT solutions and intuitive web applications. I specialize in system administration, virtualization, and full-stack development with a focus on practical, user-centered solutions.",
            contact: "Contact Information",
            contactLocationLabel: "Location:",
            contactLocationValue: "Warsaw, Poland",
            contactPhoneLabel: "Phone:",
            contactPhoneValue: "+48 504 977 011",
            contactEmailLabel: "Email:",
            contactEmailValue: "ivo.urbanski@gmail.com",
            contactGithubLabel: "GitHub:",
            contactGithubValue: "github.com/frogalo",
            downloadCV: "Download CV",

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
            "Portfolio Website": "Portfolio Website",
            "Portfolio Description": "A portfolio website showcasing my skills and projects.",
            "Portfolio Details": "This website serves as my personal portfolio, built with Next.js. It features internationalization (i18n) for multiple languages, dynamic theme switching (light/dark mode), and a responsive design to showcase my projects and skills effectively.",

            "Steam Reviews": "Steam Reviews",
            "Steam Reviews Description": "A web application to display recent Steam game reviews and send automated Slack notifications.",
            "Steam Reviews Details": "This project integrates with the Steam API to fetch and display recent reviews for specific games. It also features a mechanism to automatically translate reviews and send notifications to a Slack channel, providing game developers or community managers with real-time feedback.",

            "Server Room Relocation": "Server Room Relocation",
            "Server Room Description": "Complete server room migration project with focus on zero downtime.",
            "Server Room Details": "Led a complete server room relocation project involving 3 physical servers, networking equipment, and storage systems. Coordinated IT team to ensure minimal downtime during the migration process. Implemented new rack layouts and improved cooling solutions, enhancing overall data center efficiency and reliability. Utilized Proxmox for efficient virtualization management.",

            "IT Dashboard": "IT Dashboard",
            "IT Dashboard Description": "Admin dashboard with Google and ADFS login displaying users and statuses from multiple sources (AD, Google, Slack, Miro) for centralized management",
            "IT Dashboard Details": "A comprehensive IT dashboard designed for administrators. Features include Google and ADFS login, displaying user statuses from multiple sources (Active Directory, Google, Slack, Miro) for centralized management. Built with React and Node.js, using PostgreSQL for the database, this dashboard focuses on efficient data visualization and granular user access control.",

            "VLAN Configuration": "VLAN Configuration",
            "VLAN Description": "Implementation and optimization of VLANs for network segmentation and security.",
            "VLAN Details": "Designed and implemented VLAN (Virtual Local Area Network) configurations across our network infrastructure to enhance security, reduce broadcast domains, and improve network performance. This project involved planning IP address schemes, configuring managed switches Ubiquiti, and ensuring seamless connectivity for different departments and device types while maintaining network stability and compliance. Also involved detailed documentation and testing of the new segmentation.",

            "TableMate": "TableMate",
            "TableMate Description": "Unified platform for company resource management (desks, rooms, parking) and ordering services",
            "TableMate Details": "TableMate is a unified platform designed to streamline company resource management. It centralizes reservations for desks, conference rooms, and parking spots, and also handles food and IT equipment ordering. Developed using Next.js with a focus on user experience and efficient resource allocation, integrated with NeonDB for scalable data storage.",

            "Gramatyk": "Gramatyk",
            "Gramatyk Description": "Web app fetching Polish word declensions from an external source via a serverless proxy API.",
            "Gramatyk Details": "Gramatyk is a Next.js web application that fetches Polish word morphological declensions from an external site using a serverless proxy API. It then parses and displays the results in a formatted table, providing a helpful tool for linguists and developers working with Polish language data.",

            "Discord Integration Bot": "Discord Integration Bot",
            "Discord Integration Description": "A Discord bot for automated server management and integrations.",
            "Discord Integration Details": "Developed a custom Discord bot to automate server management tasks including role assignments, moderation, and custom commands. Integrated with MongoDB for persistent data storage and implemented slash commands for better user experience. This bot streamlines various administrative tasks and enhances community engagement.",

            "Slack Process Automation": "IT Onboarding/Offboarding Automation",
            "Slack Process Description": "Automated processes for IT onboarding and offboarding, including user provisioning and access management.",
            "Slack Process Details": "Developed an automation system to streamline IT onboarding and offboarding procedures. This solution ensures efficient user lifecycle management, encompassing account creation, access provisioning (e.g., Google, Jira, Slack, Active Directory), and system setup for new hires. For offboarding, it automates access revocation, data archival, and equipment return notifications. The system drastically reduces manual tasks, improves security, and ensures consistent compliance across the IT infrastructure.",

            "ScholarHub": "ScholarHub",
            "ScholarHub Description": "University platform supporting recruitment, online meetings, chat, and grading system.",
            "ScholarHub Details": "ScholarHub is a React-based university platform designed to enhance the student experience. It supports recruitment processes, facilitates online meetings, provides a chat function for communication, and includes a comprehensive grading system for higher education institutions. The backend is powered by Java Spring Boot with MongoDB as the database.",

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
            allRightsReserved: "Wszystkie prawa zastrzeżone",

            // --- Header ---

            // --- Hero Section ---
            heroTitle: "Administrator IT & Web Developer",
            heroDescription: "Specjalista IT i administrator systemów z umiejętnościami full-stack development. Moim celem jest usprawnianie procesów IT poprzez automatyzację i tworzenie intuicyjnych aplikacji.",

            // --- Sekcja O mnie ---
            about: "O mnie",
            aboutText1: "Jestem Administratorem IT z doświadczeniem w zarządzaniu sieciami i systemami (AD, Proxmox), zwiększaniu bezpieczeństwa, automatyzacji zadań (PowerShell) i tworzeniu aplikacji webowych. Obecnie studiuję na Politechnice Warszawskiej na kierunku Informatyka.",
            aboutText2: "Pasjonuję się tworzeniem efektywnych rozwiązań IT i intuitywnych aplikacji webowych. Specjalizuję się w administracji systemami, wirtualizacji i full-stack developmencie z naciskiem na praktyczne, skoncentrowane na użytkowniku rozwiązania.",
            contact: "Dane kontaktowe",
            contactLocationLabel: "Lokalizacja:",
            contactLocationValue: "Warszawa, Polska",
            contactPhoneLabel: "Telefon:",
            contactPhoneValue: "+48 504 977 011",
            contactEmailLabel: "Email:",
            contactEmailValue: "ivo.urbanski@gmail.com",
            contactGithubLabel: "GitHub:",
            contactGithubValue: "github.com/frogalo",
            downloadCV: "Pobierz CV",

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
            "Portfolio Website": "Strona Portfolio",
            "Portfolio Description": "Strona portfolio prezentująca moje umiejętności i projekty.",
            "Portfolio Details": "Ta strona jest moim osobistym portfolio, zbudowanym przy użyciu Next.js. Wykorzystuje internacjonalizację (i18n) dla wielu języków, dynamiczną zmianę motywów (jasny/ciemny) oraz responsywny design, aby skutecznie prezentować moje projekty i umiejętności.",

            "Steam Reviews": "Recenzje Steam",
            "Steam Reviews Description": "Aplikacja webowa do wyświetlania najnowszych recenzji gier Steam i wysyłania automatycznych powiadomień na Slacka.",
            "Steam Reviews Details": "Ten projekt integruje się z API Steam, aby pobierać i wyświetlać najnowsze recenzje dla konkretnych gier. Zawiera również mechanizm do automatycznego tłumaczenia recenzji i wysyłania powiadomień na kanał Slack, zapewniając deweloperom gier lub menedżerom społeczności bieżące informacje zwrotne.",

            "Server Room Relocation": "Migracja Serwerowni",
            "Server Room Description": "Kompletny projekt migracji serwerowni z naciskiem na brak przestojów.",
            "Server Room Details": "Prowadziłem kompleksowy projekt relokacji serwerowni, obejmujący 3 serwery fizyczne, sprzęt sieciowy i systemy przechowywania danych. Koordynowałem działania zespołu IT, aby zapewnić minimalny czas przestoju podczas migracji. Wdrożyłem nowe układy szaf serwerowych i ulepszone rozwiązania chłodzące, zwiększając ogólną wydajność i niezawodność centrum danych. Wykorzystałem Proxmox do efektywnego zarządzania wirtualizacją.",

            "IT Dashboard": "IT Dashboard",
            "IT Dashboard Description": "Panel administratora z logowaniem Google i ADFS wyświetlający użytkowników i statusy z wielu źródeł (AD, Google, Slack, Miro) do scentralizowanego zarządzania",
            "IT Dashboard Details": "Kompleksowy panel IT zaprojektowany dla administratorów. Funkcje obejmują logowanie Google i ADFS, wyświetlanie statusów użytkowników z wielu źródeł (Active Directory, Google, Slack, Miro) dla scentralizowanego zarządzania. Zbudowany w React i Node.js, z użyciem PostgreSQL jako bazy danych, ten panel koncentruje się na efektywnej wizualizacji danych i szczegółowej kontroli dostępu użytkowników.",

            "VLAN Configuration": "Konfiguracja VLAN",
            "VLAN Description": "Wdrożenie i optymalizacja sieci VLAN dla segmentacji i bezpieczeństwa sieci.",
            "VLAN Details": "Zaprojektowałem i wdrożyłem konfiguracje sieci VLAN (Virtual Local Area Network) w całej naszej infrastrukturze sieciowej w celu zwiększenia bezpieczeństwa, zmniejszenia domen rozgłoszeniowych i poprawy wydajności sieci. Projekt ten obejmował planowanie schematów adresacji IP, konfigurację zarządzalnych przełączników Ubiquiti oraz zapewnienie płynnej łączności dla różnych działów i typów urządzeń, przy jednoczesnym zachowaniu stabilności i zgodności sieci. Obejmował również szczegółową dokumentację i testy nowej segmentacji.",

            "TableMate": "TableMate",
            "TableMate description": "Ujednolicona platforma do zarządzania zasobami firmy (stanowiska, sale konferencyjne, parkingi) i zamawiania usług",
            "TableMate Details": "TableMate to ujednolicona platforma zaprojektowana do usprawnienia zarządzania zasobami firmy. Centralizuje rezerwacje biurek, sal konferencyjnych i miejsc parkingowych, a także obsługuje zamawianie jedzenia i sprzętu IT. Opracowana w Next.js z naciskiem na doświadczenie użytkownika i efektywne przydzielanie zasobów, zintegrowana z NeonDB dla skalowalnego przechowywania danych.",

            "Gramatyk": "Gramatyk",
            "Gramatyk Description": "Aplikacja webowa pobierająca odmiany polskich słów z zewnętrznego źródła przez serwerowe API proxy.",
            "Gramatyk Details": "Gramatyk to aplikacja webowa Next.js, która pobiera morfologiczne odmiany polskich słów z zewnętrznej strony za pomocą serwerowego API proxy. Następnie parsje i wyświetla wyniki w sformatowanej tabeli, stanowiąc przydatne narzędzie dla językoznawców i programistów pracujących z polskimi danymi językowymi.",

            "Discord Integration Bot": "Bot Integracyjny Discord",
            "Discord Integration Description": "Bot Discord do automatyzacji zarządzania serwerem i integracji.",
            "Discord Integration Details": "Opracowałem niestandardowego bota Discord do automatyzacji zadań zarządzania serwerem, w tym przypisywania ról, moderacji i niestandardowych komend. Zintegrowany z MongoDB dla trwałego przechowywania danych i zaimplementowano komendy slash dla lepszego doświadczenia użytkownika. Ten bot usprawnia różne zadania administracyjne i zwiększa zaangażowanie społeczności.",


            "Slack Process Automation": "Automatyzacja Onboardingu/Offboardingu IT",
            "Slack Process Description": "Zautomatyzowane procesy onboardingu i offboardingu IT, w tym zarządzanie kontami użytkowników i dostępami.",
            "Slack Process Details": "Opracowałem system automatyzacji procesów onboardingu i offboardingu IT. To rozwiązanie zapewnia efektywne zarządzanie cyklem życia użytkowników, obejmujące tworzenie kont, nadawanie dostępu (np. Google, Jira, Slack, Active Directory) i konfigurację systemów dla nowych pracowników. W przypadku offboardingu automatyzuje cofanie dostępu, archiwizację danych i powiadomienia o zwrocie sprzętu. System drastycznie redukuje zadania manualne, poprawia bezpieczeństwo i zapewnia spójną zgodność w całej infrastrukturze IT.",

            "ScholarHub": "ScholarHub",
            "ScholarHub Description": "Platforma uniwersytecka wspierająca rekrutację, spotkania online, czat i system oceniania.",
            "ScholarHub Details": "ScholarHub to platforma uniwersytecka oparta na React, zaprojektowana w celu poprawy doświadczenia studentów. Obsługuje procesy rekrutacyjne, ułatwia spotkania online, zapewnia funkcję czatu do komunikacji oraz zawiera kompleksowy system oceniania dla szkół wyższych. Backend jest zasilany przez Java Spring Boot z MongoDB jako bazą danych.",

            // --- Experience Section ---
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