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
            aboutText1: "I am an IT Administrator with experience in managing networks and systems (AD, Proxmox), enhancing security, automating tasks, and building web applications. I am currently pursuing a Master's degree in Computer Science at Politechnika Warszawska.",
            aboutText2: "I am passionate about creating efficient IT solutions and intuitive web applications. I specialize in system administration, virtualization, and full-stack development with a focus on practical, user-centered solutions.",
            contact: "Contact Information",
            contactLocationLabel: "Location:",
            contactLocationValue: "Warsaw, Poland",
            contactPhoneLabel: "Phone:",
            contactPhoneValue: "+48 000 000 000",
            contactEmailLabel: "Email:",
            contactEmailValue: "ivo.urbanski@gmail.com",
            contactGithubLabel: "GitHub:",
            contactGithubValue: "github.com/frogalo",
            downloadCV: "Download CV",

            sendMeMessage: "Send me a message",
            name: "Name",
            yourName: "Your name",
            email: "Email",
            yourEmail: "Your email",
            subject: "Subject",
            messageSubject: "Message subject",
            message: "Message",
            yourMessage: "Your message",
            sendMessage: "Send Message",
            sending: "Sending...",
            messageSent: "Message sent successfully!",
            sendMessageError: "Failed to send message. Please try again.",

            // --- Skills Section ---
            "expertise_areas": "Expertise Areas",
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
            "Database Management": "Database Management",

            // Sub-skills translations
            "Windows Server Management": "Windows Server Management",
            "Linux System Administration": "Linux System Administration",
            "User Account Management": "User Account Management",
            "System Monitoring & Performance": "System Monitoring & Performance",
            "Backup & Recovery Solutions": "Backup & Recovery Solutions",
            "Hardware Troubleshooting": "Hardware Troubleshooting",
            "System Updates & Patching": "System Updates & Patching",

            "RESTful API Development": "RESTful API Development",
            "Google APIs": "Google APIs",
            "Slack APIs": "Slack APIs",
            "Steam APIs": "Steam APIs",
            "OAuth & Authentication": "OAuth & Authentication",
            "API Documentation": "API Documentation",
            "Rate Limiting & Throttling": "Rate Limiting & Throttling",
            "Webhook Integration": "Webhook Integration",
            "API Testing & Monitoring": "API Testing & Monitoring",

            "VM Creation & Management": "VM Creation & Management",
            "Container Deployment (LXC)": "Container Deployment (LXC)",
            "Storage Configuration": "Storage Configuration",
            "Network Configuration": "Network Configuration",
            "Backup & Restore": "Backup & Restore",
            "Cluster Management": "Cluster Management",
            "Performance Optimization": "Performance Optimization",

            "Script Development": "Script Development",
            "Module Creation": "Module Creation",
            "Task Automation": "Task Automation",
            "Active Directory Management": "Active Directory Management",
            "Exchange Administration": "Exchange Administration",
            "Azure PowerShell": "Azure PowerShell",
            "Error Handling & Logging": "Error Handling & Logging",
            "Scheduled Task Management": "Scheduled Task Management",

            "User & Group Management": "User & Group Management",
            "Email Configuration": "Email Configuration",
            "SharePoint Administration": "SharePoint Administration",
            "Teams Management": "Teams Management",
            "Security & Compliance": "Security & Compliance",
            "License Management": "License Management",
            "Migration Services": "Migration Services",

            "Ubuntu/CentOS Administration": "Ubuntu/CentOS Administration",
            "Windows Server 2019/2022": "Windows Server 2019/2022",
            "Service Configuration": "Service Configuration",
            "File System Management": "File System Management",
            "Performance Tuning": "Performance Tuning",
            "Log Analysis": "Log Analysis",
            "Security Hardening": "Security Hardening",

            "React": "React",
            "Next.js": "Next.js",
            "Node.js": "Node.js",
            "HTML/CSS/JavaScript": "HTML/CSS/JavaScript",
            "Responsive Design": "Responsive Design",
            "Database Integration": "Database Integration",
            "Version Control (Git)": "Version Control (Git)",
            "Testing & Debugging": "Testing & Debugging",

            "Domain Controller Management": "Domain Controller Management",
            "Group Policy Configuration": "Group Policy Configuration",
            "DNS & DHCP Integration": "DNS & DHCP Integration",
            "Certificate Services": "Certificate Services",
            "Federation Services": "Federation Services",
            "Security Groups Management": "Security Groups Management",
            "Organizational Unit Design": "Organizational Unit Design",

            "Subnetting & VLANS": "Subnetting & VLANs",
            "DNS Configuration": "DNS Configuration",
            "DHCP Management": "DHCP Management",
            "Firewall Configuration": "Firewall Configuration",
            "Network Troubleshooting": "Network Troubleshooting",
            "Switch & Router Configuration": "Switch & Router Configuration",

            "SCCM/Intune Management": "SCCM/Intune Management",
            "Software Deployment": "Software Deployment",
            "Device Compliance": "Device Compliance",
            "Mobile Device Management": "Mobile Device Management",
            "Patch Management": "Patch Management",
            "Remote Support Tools": "Remote Support Tools",

            "MongoDB": "MongoDB",
            "PosgreSQL": "PostgreSQL",
            "MariaDB": "MariaDB",
            "MySQL": "MySQL",
            "NEON": "NEON",

            "Container Creation": "Container Creation",
            "Docker Compose": "Docker Compose",
            "Image Management": "Image Management",
            "Volume & Network Configuration": "Volume & Network Configuration",
            "Container Orchestration": "Container Orchestration",

            "Network Security": "Network Security",
            "Access Control": "Access Control",
            "Vulnerability Assessment": "Vulnerability Assessment",
            "Incident Response": "Incident Response",
            "Security Auditing": "Security Auditing",
            "Encryption Implementation": "Encryption Implementation",
            "Security Policy Development": "Security Policy Development",

            // --- Projects Section ---
            projects: "Projects",
            "all": "All",
            "web": "Web",
            "infrastructure": "Infrastructure",
            "automation": "Automation",

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

            "Minecraft Server": "Modded Minecraft Server Hosting",
            "Minecraft Server Description": "Self-hosted and maintained a modded Minecraft server for 2+ years, ensuring high performance and an engaging player experience.",
            "Minecraft Server Details": "Managed and maintained a self-hosted modded Minecraft server for over two years, providing a stable and enhanced gaming environment. My responsibilities include regular server and modpack updates, moderate discord server (guild), meticulous performance tuning, and optimization of server settings (e.g., JVM arguments, Spigot/Paper configs) to minimize lag and ensure smooth gameplay even with a large number of mods and concurrent players. I proactively implement backup strategies and monitor server health to guarantee data integrity and high availability. This ongoing project showcases my practical skills in Linux server administration, network management, performance optimization, and commitment to delivering a reliable and enjoyable service to a dedicated player community.",

            "Uber Analytics": "Uber Analytics",
            "Uber Analytics Description":
                "Analyzes costs of Uber rides and Uber Eats orders, shown on graphs.",
            "Uber Analytics Details":
                "This project analyzes the costs associated with Uber rides and Uber Eats orders. It processes data from uploaded files, visualizing spending patterns and trends through interactive graphs. Users can gain insights into their transportation and food delivery expenses, helping them make informed decisions.",

            "Money Tracker": "Money Tracker",
            "Money Tracker Description":
                "Lets you add costs for analysis, shows what you spent most on, and your investments.",
            "Money Tracker Details":
                "Money Tracker is a personal finance application that allows users to track their expenses and investments. It provides detailed analysis of spending habits, highlighting areas where money is spent the most and showing investment performance. The application helps users understand their financial situation and make informed decisions to optimize their spending and investments.",

            "Habit Rythm": "Habit Rythm",
            "Habit Rythm Description":
                "A modern, full-stack habit tracker built with Next.js 15, MongoDB, and NextAuth.",
            "Habit Rythm Details":
                "Habit Rythm is a modern, full-stack habit tracker built with Next.js 15, MongoDB, and NextAuth. Track your habits with a beautiful dot calendar, color customization, and secure authentication. Features include: Dot calendar, habit management, color customization, toast notifications.",

            "Leaf Logger": "Leaf Logger",
            "Leaf Logger Description": "A customizable logger with colorful output and emoji icons for Node.js applications.",
            "Leaf Logger Details": "A lightweight, customizable logger with colorful output and emoji icons for Node.js applications. Features include colorful log messages, emoji icons, timestamp support, multiple log levels, configurable debug mode, object logging, Promise handling and zero dependencies.",


            // --- Experience Section ---
            "Experience": "Experience",
            "Reikon Games": "Reikon Games",
            "IT Manager": "IT Manager",
            "Spearheading the development and maintenance of network infrastructure": "Spearheading the development and maintenance of network infrastructure",
            "Leading the modernization and expansion of server infrastructure": "Leading the modernization and expansion of server infrastructure",
            "Managing asset logistics, including the organization of equipment deliveries": "Managing asset logistics, including the organization of equipment deliveries",
            "Overseeing the monitoring and performance of the overall IT infrastructure": "Overseeing the monitoring and performance of the overall IT infrastructure",
            "Supervising user account and access management (AD, Google, Slack, Access Control System)": "Supervising user account and access management (AD, Google, Slack, Access Control System)",
            "Directing the administration of various SaaS platforms": "Directing the administration of various SaaS platforms",
            "Overseeing server administration for Linux (Debian, Ubuntu) and Windows Server 2022": "Overseeing server administration for Linux (Debian, Ubuntu) and Windows Server 2022",
            "Providing and managing second-line technical support (L2)": "Providing and managing second-line technical support (L2)",
            "Ensuring the maintenance of comprehensive technical documentation": "Ensuring the maintenance of comprehensive technical documentation",
            "Collaborating in the creation and enforcement of IT policies and procedures": "Collaborating in the creation and enforcement of IT policies and procedures",
            "Training and mentoring team members and users for enhanced operational efficiency": "Training and mentoring team members and users for enhanced operational efficiency",
            "Managing licenses and subscriptions": "Managing licenses and subscriptions",
            "Agile Development, IT Project & Program Management, Linux, Windows Server, Networking, Cybersecurity, Cloud Computing, SaaS Management": "Agile Development, IT Project & Program Management, Linux, Windows Server, Networking, Cybersecurity, Cloud Computing, SaaS Management",

            "IT Assistant": "IT Assistant",
            "Organizing asset delivery and equipment preparation": "Organizing asset delivery and equipment preparation",
            "Overseeing IT infrastructure monitoring": "Overseeing IT infrastructure monitoring",
            "Providing first-line technical support (L1)": "Providing first-line technical support (L1)",
            "Managing user accounts and access (AD, Google, Slack, Access Control System)": "Managing user accounts and access (AD, Google, Slack, Access Control System)",
            "Administering SaaS platforms": "Administering SaaS platforms",
            "Handling server administration on Linux (Debian, Ubuntu) and Windows Server 2022": "Handling server administration on Linux (Debian, Ubuntu) and Windows Server 2022",
            "Maintaining technical documentation": "Maintaining technical documentation",
            "Assisting with IT policy and procedure development": "Assisting with IT policy and procedure development",
            "Contributing to server infrastructure setup": "Contributing to server infrastructure setup",
            "Managed assets system": "Managed assets system",
            "Conducting technical onboarding for users": "Conducting technical onboarding for users",
            "Linux, Windows Server, Networking, IT Support, Help Desk, Active Directory, Google Workspace, Slack, Jira, Asset Management": "Linux, Windows Server, Networking, IT Support, Help Desk, Active Directory, Google Workspace, Slack, Jira, Asset Management",

            "CIE Center for Innovative Education": "CIE Center for Innovative Education",
            "Dział planowania i analizy kosztów": "Planning and Cost Analysis Department",
            "Analyzing planning and cost data to identify areas for efficiency improvement.": "Analyzing planning and cost data to identify areas for efficiency improvement.",
            "Assisting with budget preparation and financial reporting.": "Assisting with budget preparation and financial reporting.",
            "Developing tools for data visualization and performance tracking.": "Developing tools for data visualization and performance tracking.",
            "Adobe Photoshop, Adobe Premiere Pro, Data Analysis, Cost Management": "Adobe Photoshop, Adobe Premiere Pro, Data Analysis, Cost Management",

            "Orange Polska": "Orange Poland",
            "Praktykant": "CEX Team Intern",
            "Participating in projects related to customer experience (CEX) analysis.": "Participating in projects related to customer experience (CEX) analysis.",
            "Assisting with user research and UX design processes.": "Assisting with user research and UX design processes.",
            "Contributing to mobile application testing and bug reporting.": "Contributing to mobile application testing and bug reporting.",
            "Adobe Photoshop, User Experience (UX), Mobile Application Testing, Customer Experience": "Adobe Photoshop, User Experience (UX), Mobile Application Testing, Customer Experience",

            "European Parliament": "European Parliament",
            "Intern in the Warsaw office of Danuta Hübner": "Intern in the Warsaw office of Danuta Hübner",
            "Warsaw, Mazowieckie, Poland": "Warsaw, Mazowieckie, Poland",
            "Assisting with research on European studies and civilization topics.": "Assisting with research on European studies and civilization topics.",
            "Preparing reports and presentations for internal use.": "Preparing reports and presentations for internal use.",
            "Supporting general office administration tasks.": "Supporting general office administration tasks.",
            "Adobe Photoshop, Adobe Premiere Pro, Research, Administrative Support": "Adobe Photoshop, Adobe Premiere Pro, Research, Administrative Support",


            // --- Education Section Additions ---
            "Education": "Education",
            "Warsaw University of Technology": "Warsaw University of Technology",
            "Master's degree, Computer Science": "Master's degree, Computer Science",
            "Debugging, User Experience (UX), Algorithms, LAN-WAN, Agile Development, GitHub, REST APIs, Databases, Programming, Jira, Troubleshooting, Application Servers, Networking, Node.js, Operating Systems, Problem Solving, Software Development, HTML5, Scriptwriting, Windows, Network Security": "Debugging, User Experience (UX), Algorithms, LAN-WAN, Agile Development, GitHub, REST APIs, Databases, Programming, Jira, Troubleshooting, Application Servers, Networking, Node.js, Operating Systems, Problem Solving, Software Development, HTML5, Scriptwriting, Windows, Network Security",

            "Polish-Japanese Academy of Information Technology": "Polish-Japanese Academy of Information Technology",
            "Informatyka": "Engineer's degree, Computer Science",
            "Debugging, User Experience (UX), Adobe Premiere Pro, Algorithms, LAN-WAN, Agile Development, Web Development, Java, Dashboards, GitHub, REST APIs, Databases, React.js, Programming, Web Design, C#, Jira, Project Management, Java Spring Boot, Troubleshooting, Application Servers, Web Services, Networking, Node.js, Operating Systems, Cascading Style Sheets (CSS), Problem Solving, Software Development, MongoDB, Content Management Systems (CMS), Microsoft Office, HTML5, Adobe Photoshop, Computer Repair, JavaScript, Network Troubleshooting, Scriptwriting, Web Applications, Windows, HTML, Network Security": "Debugging, User Experience (UX), Adobe Premiere Pro, Algorithms, LAN-WAN, Agile Development, Web Development, Java, Dashboards, GitHub, REST APIs, Databases, React.js, Programming, Web Design, C#, Jira, Project Management, Java Spring Boot, Troubleshooting, Application Servers, Web Services, Networking, Node.js, Operating Systems, Cascading Style Sheets (CSS), Problem Solving, Software Development, MongoDB, Content Management Systems (CMS), Microsoft Office, HTML5, Adobe Photoshop, Computer Repair, JavaScript, Network Troubleshooting, Scriptwriting, Web Applications, Windows, HTML, Network Security",

            "University of Warsaw": "University of Warsaw",
            "European Studies/Civilization": "European Studies",
            "Microsoft Office": "Microsoft Office, Basic Economic, Basic Law"
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
            aboutText1: "Jestem Administratorem IT z doświadczeniem w zarządzaniu sieciami i systemami (AD, Proxmox), zwiększaniu bezpieczeństwa, automatyzacji zadań i tworzeniu aplikacji webowych. Obecnie studiuję na Politechnice Warszawskiej na kierunku Informatyka.",
            aboutText2: "Pasjonuję się tworzeniem efektywnych rozwiązań IT i intuitywnych aplikacji webowych. Specjalizuję się w administracji systemami, wirtualizacji i full-stack developmencie z naciskiem na praktyczne, skoncentrowane na użytkowniku rozwiązania.",
            contact: "Dane kontaktowe",
            contactLocationLabel: "Lokalizacja:",
            contactLocationValue: "Warszawa, Polska",
            contactPhoneLabel: "Telefon:",
            contactPhoneValue: "+48 000 000 000",
            contactEmailLabel: "Email:",
            contactEmailValue: "ivo.urbanski@gmail.com",
            contactGithubLabel: "GitHub:",
            contactGithubValue: "github.com/frogalo",
            downloadCV: "Pobierz CV",

            sendMeMessage: "Wyślij wiadomość",
            name: "Imię",
            yourName: "Twoje imię",
            email: "Email",
            yourEmail: "Twój email",
            subject: "Temat",
            messageSubject: "Temat wiadomości",
            message: "Wiadomość",
            yourMessage: "Twoja wiadomość",
            sendMessage: "Wyślij wiadomość",
            sending: "Wysyłanie...",
            messageSent: "Wiadomość została wysłana pomyślnie!",
            sendMessageError: "Nie udało się wysłać wiadomości. Spróbuj ponownie.",

            // --- Sekcja Umiejętności ---
            "expertise_areas": "Szczegóły",
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
            "Database Management": "Zarządzanie bazami danych",

            // Tłumaczenia podumiejętności
            "Windows Server Management": "Zarządzanie Windows Server",
            "Linux System Administration": "Administracja systemami Linux",
            "User Account Management": "Zarządzanie kontami użytkowników",
            "System Monitoring & Performance": "Monitorowanie i wydajność systemów",
            "Backup & Recovery Solutions": "Rozwiązania kopii zapasowych",
            "Hardware Troubleshooting": "Rozwiązywanie problemów sprzętowych",
            "System Updates & Patching": "Aktualizacje i łatki systemowe",

            "RESTful API Development": "Tworzenie API RESTful",
            "Google APIs": "API Google",
            "Slack APIs": "API Slack",
            "Steam APIs": "API Steam",
            "OAuth & Authentication": "OAuth i uwierzytelnianie",
            "API Documentation": "Dokumentacja API",
            "Rate Limiting & Throttling": "Ograniczenia i dławienie API",
            "Webhook Integration": "Integracja webhooków",
            "API Testing & Monitoring": "Testowanie i monitorowanie API",

            "VM Creation & Management": "Tworzenie i zarządzanie VM",
            "Container Deployment (LXC)": "Wdrażanie kontenerów (LXC)",
            "Storage Configuration": "Konfiguracja pamięci masowej",
            "Network Configuration": "Konfiguracja sieci",
            "Backup & Restore": "Kopia zapasowa i przywracanie",
            "Cluster Management": "Zarządzanie klastrem",
            "Performance Optimization": "Optymalizacja wydajności",

            "Script Development": "Tworzenie skryptów",
            "Module Creation": "Tworzenie modułów",
            "Task Automation": "Automatyzacja zadań",
            "Active Directory Management": "Zarządzanie Active Directory",
            "Exchange Administration": "Administracja Exchange",
            "Azure PowerShell": "Azure PowerShell",
            "Error Handling & Logging": "Obsługa błędów i logowanie",
            "Scheduled Task Management": "Zarządzanie zadaniami zaplanowanymi",

            "User & Group Management": "Zarządzanie użytkownikami i grupami",
            "Email Configuration": "Konfiguracja poczty elektronicznej",
            "SharePoint Administration": "Administracja SharePoint",
            "Teams Management": "Zarządzanie Teams",
            "Security & Compliance": "Bezpieczeństwo i zgodność",
            "License Management": "Zarządzanie licencjami",
            "Migration Services": "Usługi migracji",

            "Ubuntu/CentOS Administration": "Administracja Ubuntu/CentOS",
            "Windows Server 2019/2022": "Windows Server 2019/2022",
            "Service Configuration": "Konfiguracja usług",
            "File System Management": "Zarządzanie systemem plików",
            "Performance Tuning": "Optymalizacja wydajności",
            "Log Analysis": "Analiza logów",
            "Security Hardening": "Wzmocnienie bezpieczeństwa",

            "React": "React",
            "Next.js": "Next.js",
            "Node.js": "Node.js",
            "HTML/CSS/JavaScript": "HTML/CSS/JavaScript",
            "Responsive Design": "Projektowanie responsywne",
            "Database Integration": "Integracja z bazami danych",
            "Version Control (Git)": "Kontrola wersji (Git)",
            "Testing & Debugging": "Testowanie i debugowanie",

            "Domain Controller Management": "Zarządzanie kontrolerem domeny",
            "Group Policy Configuration": "Konfiguracja zasad grupowych",
            "DNS & DHCP Integration": "Integracja DNS i DHCP",
            "Certificate Services": "Usługi certyfikatów",
            "Federation Services": "Usługi federacji",
            "Security Groups Management": "Zarządzanie grupami bezpieczeństwa",
            "Organizational Unit Design": "Projektowanie jednostek organizacyjnych",

            "Subnetting & VLANS": "Podsieci i VLAN-y",
            "DNS Configuration": "Konfiguracja DNS",
            "DHCP Management": "Zarządzanie DHCP",
            "Firewall Configuration": "Konfiguracja zapory ogniowej",
            "Network Troubleshooting": "Rozwiązywanie problemów sieciowych",
            "Switch & Router Configuration": "Konfiguracja przełączników i routerów",

            "SCCM/Intune Management": "Zarządzanie SCCM/Intune",
            "Software Deployment": "Wdrażanie oprogramowania",
            "Device Compliance": "Zgodność urządzeń",
            "Mobile Device Management": "Zarządzanie urządzeniami mobilnymi",
            "Patch Management": "Zarządzanie łatkami",
            "Remote Support Tools": "Narzędzia zdalnego wsparcia",

            "MongoDB": "MongoDB",
            "PosgreSQL": "PostgreSQL",
            "MariaDB": "MariaDB",
            "MySQL": "MySQL",
            "NEON": "NEON",

            "Container Creation": "Tworzenie kontenerów",
            "Docker Compose": "Docker Compose",
            "Image Management": "Zarządzanie obrazami",
            "Volume & Network Configuration": "Konfiguracja wolumenów i sieci",
            "Container Orchestration": "Orkiestracja kontenerów",

            "Network Security": "Bezpieczeństwo sieci",
            "Access Control": "Kontrola dostępu",
            "Vulnerability Assessment": "Ocena podatności",
            "Incident Response": "Reagowanie na incydenty",
            "Security Auditing": "Audyt bezpieczeństwa",
            "Encryption Implementation": "Implementacja szyfrowania",
            "Security Policy Development": "Tworzenie polityk bezpieczeństwa",

            // --- Sekcja Projekty ---
            "all": "Wszystkie",
            "web": "Web",
            "infrastructure": "Infrastruktura",
            "automation": "Automatyzacja",

            projects: "Projekty",
            "Portfolio Website": "Strona Portfolio",
            "Portfolio Description": "Strona portfolio prezentująca moje umiejętności i projekty.",
            "Portfolio Details": "Ta strona jest moim osobistym portfolio, zbudowanym przy użyciu Next.js. Wykorzystuje internacjonalizację (i18n) dla wielu języków, dynamiczną zmianę motywów (jasny/ciemny) oraz responsywny design, aby skutecznie prezentować moje projekty i umiejętności.",

            "Steam Reviews": "Recenzje Steam",
            "Steam Reviews Description": "Aplikacja webowa do wyświetlania najnowszych recenzji gier Steam i wysyłania automatycznych powiadomień na Slacka. Wykorzystuje własny model LLM do analizy sentymentu recenzji.",
            "Steam Reviews Details": "Ten projekt integruje się z API Steam, aby pobierać i wyświetlać najnowsze recenzje dla konkretnych gier. Zawiera również mechanizm do automatycznego tłumaczenia recenzji, przeprowadzania analizy sentymentu przy użyciu własnego modelu LLM oraz wysyłania powiadomień na kanał Slack, zapewniając deweloperom gier lub menedżerom społeczności bieżące i szczegółowe informacje zwrotne.",

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

            "Minecraft Server": "Hosting Serwera Minecraft",
            "Minecraft Server Description": "Samodzielne hostowanie i utrzymywanie modowanego serwera Minecraft przez ponad 2 lata, zapewniając wysoką wydajność i angażujące doświadczenie dla graczy.",
            "Minecraft Server Details": "Zarządzałem i utrzymywałem samodzielnie hostowany, modowany serwer Minecraft przez ponad dwa lata, zapewniając stabilne i ulepszone środowisko gry. Do moich obowiązków należy regularna aktualizacja serwera i paczki modów, moderacja serwera discord, skrupulatne strojenie wydajności oraz optymalizacja ustawień serwera (np. argumenty JVM, konfiguracje Spigot/Paper) w celu minimalizacji lagów i zapewnienia płynnej rozgrywki, nawet przy dużej liczbie modów i jednoczesnych graczy. Proaktywne wdrażam strategie tworzenia kopii zapasowych i monitoruję stan serwera, aby zagwarantować integralność danych i wysoką dostępność. Ten bieżący projekt prezentuje moje praktyczne umiejętności w administracji serwerami Linux, zarządzaniu siecią, optymalizacji wydajności oraz zaangażowanie w dostarczanie niezawodnej i przyjemnej usługi dedykowanej społeczności graczy.",

            "Uber Analytics": "Uber Analytics",
            "Uber Analytics Description":
                "Analizuje koszty przejazdów Uberem i zamówień Uber Eats, prezentowane na wykresach.",
            "Uber Analytics Details":
                "Ten projekt analizuje koszty związane z przejazdami Uberem i zamówieniami Uber Eats. Przetwarza dane z przesłanych plików, wizualizując wzorce wydatków i trendy za pomocą interaktywnych wykresów. Użytkownicy mogą uzyskać wgląd w swoje wydatki na transport i dostawę jedzenia, co pomaga im podejmować świadome decyzje.",

            "Money Tracker": "Money Tracker",
            "Money Tracker Description":
                "Umożliwia dodawanie kosztów do analizy, pokazuje, na co wydajesz najwięcej i Twoje inwestycje.",
            "Money Tracker Details":
                "Money Tracker to aplikacja do zarządzania finansami osobistymi, która umożliwia użytkownikom śledzenie swoich wydatków i inwestycji. Zapewnia szczegółową analizę nawyków wydatkowych, podkreślając obszary, w których wydawane są największe kwoty, i pokazując wyniki inwestycji. Aplikacja pomaga użytkownikom zrozumieć swoją sytuację finansową i podejmować świadome decyzje w celu optymalizacji swoich wydatków i inwestycji.",

            "Habit Rythm": "Habit Rythm",
            "Habit Rythm Description":
                "Nowoczesny, pełnostosowy tracker nawyków zbudowany za pomocą Next.js 15, MongoDB i NextAuth.",
            "Habit Rythm Details":
                "Habit Rythm to nowoczesny, pełnostosowy tracker nawyków zbudowany za pomocą Next.js 15, MongoDB i NextAuth. Śledź swoje nawyki za pomocą pięknego kalendarza kropkowego, personalizacji kolorów i bezpiecznego uwierzytelniania. Funkcje obejmują: Kalendarz kropkowy, zarządzanie nawykami, personalizację kolorów, powiadomienia toast.",

            "Leaf Logger": "Leaf Logger",
            "Leaf Logger Description": "Konfigurowalny logger z kolorowym wyjściem i ikonami emoji dla aplikacji Node.js.",
            "Leaf Logger Details": "Lekki, konfigurowalny logger z kolorowym wyjściem i ikonami emoji dla aplikacji Node.js. Zawiera kolorowe wiadomości logów, ikony emoji, obsługę znaczników czasu, wiele poziomów logowania, konfigurowalny tryb debugowania, logowanie obiektów, obsługę Promise i brak zależności.",


            // --- Experience Section ---

            "Experience": "Doświadczenie",
            "experience": "Doświadczenie",
            "Reikon Games": "Reikon Games",
            "IT Manager": "Menedżer IT",
            "Spearheading the development and maintenance of network infrastructure": "Prowadzenie rozwoju i utrzymania infrastruktury sieciowej",
            "Leading the modernization and expansion of server infrastructure": "Kierowanie modernizacją i rozbudową infrastruktury serwerowej",
            "Managing asset logistics, including the organization of equipment deliveries": "Zarządzanie logistyką aktywów, w tym organizacja dostaw sprzętu",
            "Overseeing the monitoring and performance of the overall IT infrastructure": "Nadzorowanie monitorowania i wydajności całej infrastruktury IT",
            "Supervising user account and access management (AD, Google, Slack, Access Control System)": "Nadzorowanie zarządzania kontami użytkowników i dostępami (AD, Google, Slack, system kontroli dostępu)",
            "Directing the administration of various SaaS platforms": "Kierowanie administracją różnych platform SaaS",
            "Overseeing server administration for Linux (Debian, Ubuntu) and Windows Server 2022": "Nadzorowanie administracji serwerami Linux (Debian, Ubuntu) i Windows Server 2022",
            "Providing and managing second-line technical support (L2)": "Świadczenie i zarządzanie wsparciem technicznym drugiego poziomu (L2)",
            "Ensuring the maintenance of comprehensive technical documentation": "Zapewnienie utrzymania kompleksowej dokumentacji technicznej",
            "Collaborating in the creation and enforcement of IT policies and procedures": "Współpraca przy tworzeniu i egzekwowaniu zasad i procedur IT",
            "Training and mentoring team members and users for enhanced operational efficiency": "Szkolenie i mentoring członków zespołu oraz użytkowników w celu zwiększenia efektywności operacyjnej",
            "Managing licenses and subscriptions": "Zarządzanie licencjami i subskrypcjami",
            "Agile Development, IT Project & Program Management, Linux, Windows Server, Networking, Cybersecurity, Cloud Computing, SaaS Management": "Rozwój Agile, Zarządzanie Projektami i Programami IT, Linux, Serwery Windows, Sieci, Cyberbezpieczeństwo, Chmura Obliczeniowa, Zarządzanie SaaS",

            "IT Assistant": "Asystent IT",
            "Organizing asset delivery and equipment preparation": "Organizacja dostaw aktywów i przygotowania sprzętu",
            "Overseeing IT infrastructure monitoring": "Nadzorowanie monitorowania infrastruktury IT",
            "Providing first-line technical support (L1)": "Świadczenie wsparcia technicznego pierwszego poziomu (L1)",
            "Managing user accounts and access (AD, Google, Slack, Access Control System)": "Zarządzanie kontami użytkowników i dostępami (AD, Google, Slack, system kontroli dostępu)",
            "Administering SaaS platforms": "Administrowanie platformami SaaS",
            "Handling server administration on Linux (Debian, Ubuntu) and Windows Server 2022": "Obsługa administracji serwerami Linux (Debian, Ubuntu) i Windows Server 2022",
            "Maintaining technical documentation": "Utrzymywanie dokumentacji technicznej",
            "Assisting with IT policy and procedure development": "Wsparcie w rozwoju zasad i procedur IT",
            "Contributing to server infrastructure setup": "Wkład w konfigurację infrastruktury serwerowej",
            "Managed assets system": "System zarządzania sprzętem",
            "Conducting technical onboarding for users": "Przeprowadzanie technicznego onboardingu dla użytkowników",
            "Linux, Windows Server, Networking, IT Support, Help Desk, Active Directory, Google Workspace, Slack, Jira, Asset Management": "Linux, Serwer Windows, Sieci, Wsparcie IT, Help Desk, Active Directory, Google Workspace, Slack, Jira, Zarządzanie Sprzętem i Licencjami",

            "CIE Center for Innovative Education": "CIE Centrum Innowacyjnej Edukacji",
            "Dział planowania i analizy kosztów": "Dział planowania i analizy kosztów",
            "Analyzing planning and cost data to identify areas for efficiency improvement.": "Analiza danych planowania i kosztów w celu identyfikacji obszarów do poprawy efektywności.",
            "Assisting with budget preparation and financial reporting.": "Wsparcie w przygotowaniu budżetu i raportowaniu finansowym.",
            "Developing tools for data visualization and performance tracking.": "Rozwój narzędzi do wizualizacji danych i śledzenia wydajności.",
            "Adobe Photoshop, Adobe Premiere Pro, Data Analysis, Cost Management": "Adobe Photoshop, Adobe Premiere Pro, Analiza Danych, Zarządzanie Kosztami",

            "Orange Polska": "Orange Polska",
            "Praktykant": "Praktykant w dziale CEX",
            "Participating in projects related to customer experience (CEX) analysis.": "Udział w projektach związanych z analizą doświadczeń klienta (CEX).",
            "Assisting with user research and UX design processes.": "Wsparcie w badaniach użytkowników i procesach projektowania UX.",
            "Contributing to mobile application testing and bug reporting.": "Współudział w testowaniu aplikacji mobilnych i raportowaniu błędów.",
            "Adobe Photoshop, User Experience (UX), Mobile Application Testing, Customer Experience": "Adobe Photoshop, Doświadczenie Użytkownika (UX), Testowanie Aplikacji Mobilnych, Doświadczenie Klienta",

            "European Parliament": "Parlament Europejski",
            "Intern in the Warsaw office of Danuta Hübner": "Staże w biurze Danuty Hübner w Warszawie",
            "Warsaw, Mazowieckie, Poland": "Warszawa, Mazowieckie, Polska",
            "Assisting with research on European studies and civilization topics.": "Pomoc w badaniach nad zagadnieniami studiów europejskich i cywilizacji.",
            "Preparing reports and presentations for internal use.": "Przygotowywanie raportów i prezentacji do użytku wewnętrznego.",
            "Supporting general office administration tasks.": "Wspieranie ogólnych zadań administracji biurowej.",
            "Adobe Photoshop, Adobe Premiere Pro, Research, Administrative Support": "Adobe Photoshop, Adobe Premiere Pro, Badania, Wsparcie Administracyjne",

            // --- Education Section Additions ---
            "Education": "Edukacja",
            "Warsaw University of Technology": "Politechnika Warszawska",
            "Master's degree, Computer Science": "Magister inżynier, Informatyka",
            "Debugging, User Experience (UX), Algorithms, LAN-WAN, Agile Development, GitHub, REST APIs, Databases, Programming, Jira, Troubleshooting, Application Servers, Networking, Node.js, Operating Systems, Problem Solving, Software Development, HTML5, Scriptwriting, Windows, Network Security": "Debugowanie, Doświadczenie Użytkownika (UX), Algorytmy, Sieci LAN-WAN, Rozwój Agile, GitHub, API REST, Bazy Danych, Programowanie, Jira, Rozwiązywanie Problemów, Serwery Aplikacji, Sieci, Node.js, Systemy Operacyjne, Rozwiązywanie Problemów, Rozwój Oprogramowania, HTML5, Pisanie Skryptów, Windows, Bezpieczeństwo Sieci",

            "Polish-Japanese Academy of Information Technology": "Polsko-Japońska Akademia Technik Komputerowych",
            "Informatyka": "Inżynier, Informatyka",
            "Debugging, User Experience (UX), Adobe Premiere Pro, Algorithms, LAN-WAN, Agile Development, Web Development, Java, Dashboards, GitHub, REST APIs, Databases, React.js, Programming, Web Design, C#, Jira, Project Management, Java Spring Boot, Troubleshooting, Application Servers, Web Services, Networking, Node.js, Operating Systems, Cascading Style Sheets (CSS), Problem Solving, Software Development, MongoDB, Content Management Systems (CMS), Microsoft Office, HTML5, Adobe Photoshop, Computer Repair, JavaScript, Network Troubleshooting, Scriptwriting, Web Applications, Windows, HTML, Network Security": "Debugowanie, Doświadczenie Użytkownika (UX), Adobe Premiere Pro, Algorytmy, Sieci LAN-WAN, Rozwój Agile, Tworzenie Aplikacji Webowych, Java, Pulpity Nawigacyjne, GitHub, API REST, Bazy Danych, React.js, Programowanie, Projektowanie Stron Internetowych, C#, Jira, Zarządzanie Projektami, Java Spring Boot, Rozwiązywanie Problemów, Serwery Aplikacji, Usługi Webowe, Sieci, Node.js, Systemy Operacyjne, Kaskadowe Arkusze Stylów (CSS), Rozwiązywanie Problemów, Rozwój Oprogramowania, MongoDB, Systemy Zarządzania Treścią (CMS), Microsoft Office, HTML5, Adobe Photoshop, Naprawa Komputerów, JavaScript, Rozwiązywanie Problemów Sieciowych, Pisanie Skryptów, Aplikacje Webowe, Windows, HTML, Bezpieczeństwo Sieci",

            "University of Warsaw": "Uniwersytet Warszawski",
            "European Studies/Civilization": "Studia Europejskie",
            "Microsoft Office": "Microsoft Office, Podstawy Prawa, Podstawy Ekonomii"
        }
    }
};

export default resources;