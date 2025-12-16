export const projects = {
    projects: "Projekty",
    "all": "Wszystkie",
    "web": "Web",
    "infrastructure": "Infrastruktura",
    "automation": "Automatyzacja",

    // Grid Tags
    gridWeb: "WEB",
    gridLive: "LIVE",
    gridProject: "PROJEKT",

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
    "TableMate Description": "Ujednolicona platforma do zarządzania zasobami firmy (stanowiska, sale konferencyjne, parkingi) i zamawiania usług",
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
    "Leaf Logger Details": "Lekki, konfigurowalny logger z kolorowym wyjściem i ikonami emoji dla aplikacji Node.js. Zawiera kolorowe wiadomości logów, ikony emoji, obsługę znaczników czasu, wiele poziomów logowania, konfigurowalny tryb debugowania, logowanie obiektów, obsługę Promise i brak zależności."
};
