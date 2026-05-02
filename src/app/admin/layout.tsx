import React from "react";
import { getServerSession } from "next-auth";
import AuthProvider from "@/components/layout/AuthProvider";
import { authOptions } from "@/lib/auth";
import AdminLayoutContent from "./AdminLayoutContent";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <AuthProvider session={session}>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}
