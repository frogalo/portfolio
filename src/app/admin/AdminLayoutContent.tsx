"use client";

import React, { useEffect } from "react";
import ThemeSwitcher from "@/components/icons/ThemeSwitcher";
import { useTheme } from "@/components/layout/ThemeProvider";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [status, router, pathname]);

  if (status === "loading" && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-white min-h-screen transition-colors duration-500">
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <aside className="fixed left-0 top-0 h-full flex flex-col h-screen w-64 border-r border-outline-variant/10 bg-surface-container-high/70 backdrop-blur-xl shadow-[0_0_24px_rgba(0,0,0,0.06)] z-50 transition-colors duration-500">
        <div className="p-6">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-headline tracking-tight">
            NeonTerminal
          </div>
          <div className="text-xs font-mono text-on-surface-variant mt-1 uppercase tracking-widest opacity-60">
            System Root
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 font-headline tracking-tight">
          {[
            { name: "Dashboard", href: "/admin", icon: "dashboard" },
            { name: "Analytics", href: "/admin/analytics", icon: "bar_chart" },
            { name: "Projects", href: "/admin/projects", icon: "workspaces" },
            { name: "Experience", href: "/admin/experience", icon: "work" },
            { name: "Education", href: "/admin/education", icon: "school" },
          ].map((item) => (
            <a
              key={item.name}
              className={`flex items-center gap-3 px-4 py-3 font-mono text-xs uppercase transition-all duration-200 rounded-lg group ${
                pathname === item.href
                  ? "text-primary bg-primary-container/10 border-r-2 border-primary"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest"
              }`}
              href={item.href}
            >
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
        <div className="p-4 mt-auto space-y-4">
          <div className="flex justify-center mb-2">
            <ThemeSwitcher currentTheme={theme} onThemeChangeAction={setTheme} />
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-sm font-bold">add</span>
            <span>New Entry</span>
          </button>
          <div className="pt-4 border-t border-outline-variant/10 space-y-1">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-error font-mono text-xs uppercase hover:bg-error/5 transition-colors duration-200 rounded-lg"
            >
              <span className="material-symbols-outlined text-lg text-error">logout</span>
              <span className="text-error">Logout</span>
            </button>
            <a
              className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-on-surface font-mono text-xs uppercase hover:bg-surface-container-highest transition-colors duration-200 rounded-lg"
              href="/"
            >
              <span className="material-symbols-outlined text-lg">terminal</span>
              <span>Exit Admin</span>
            </a>
          </div>
        </div>
      </aside>

      <header className="fixed top-0 right-0 left-64 h-16 flex justify-between items-center px-8 z-40 bg-surface-container-high/70 backdrop-blur-xl font-headline border-b border-outline-variant/10 transition-colors duration-500">
        <div className="text-xl font-black text-on-surface tracking-tighter">Portfolio OS</div>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-6"></nav>
          <div className="h-8 w-px bg-outline-variant/20 mx-2"></div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-all">
              notifications
            </span>
            <div className="flex items-center gap-3 bg-surface-container-low pl-3 pr-1 py-1 rounded-full border border-outline-variant/10">
              <span className="text-xs font-mono text-on-surface-variant truncate max-w-[100px]">
                {session?.user?.name || "Admin_Root"}
              </span>
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border border-primary/30">
                {session?.user?.image ? (
                  <img src={session.user.image} alt="Admin" className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-sm text-primary">person</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="ml-64 pt-24 min-h-screen px-8 pb-12 tonal-shift-grid">
        {children}
      </main>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-50">
        <div className="bg-surface-container-highest/80 backdrop-blur-2xl border border-primary/20 rounded-xl p-3 shadow-2xl flex items-center gap-4">
          <span className="material-symbols-outlined text-primary">terminal</span>
          <input
            className="bg-transparent border-0 focus:ring-0 text-on-surface font-mono text-sm w-full placeholder:text-on-surface-variant/50"
            placeholder="Jump to entry... [CTRL + K]"
            type="text"
          />
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-mono text-on-surface-variant bg-surface-container-low px-1.5 py-0.5 rounded border border-outline-variant/20">
              âŒ˜
            </span>
            <span className="text-[10px] font-mono text-on-surface-variant bg-surface-container-low px-1.5 py-0.5 rounded border border-outline-variant/20">
              K
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
