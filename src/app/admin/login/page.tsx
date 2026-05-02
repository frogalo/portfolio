"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface-container-low p-8 rounded-2xl border border-outline-variant shadow-2xl text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">admin_panel_settings</span>
          </div>
          <h1 className="text-3xl font-headline font-black text-on-surface tracking-tighter">
            Admin Access
          </h1>
          <p className="text-on-surface-variant font-mono text-sm mt-2">
            Restricted Terminal _ Entry Required
          </p>
        </div>

        <button
          onClick={() => signIn("google")}
          className="w-full py-4 bg-on-surface text-surface font-bold rounded-lg hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          <span>Authenticate with Google</span>
        </button>

        <div className="mt-8 pt-6 border-t border-outline-variant/30">
          <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest opacity-50">
            System Security Protocol v2.4
          </p>
        </div>
      </div>
    </div>
  );
}
