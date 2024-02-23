"use server";

import { redirect } from "next/navigation";
import { ReactNode } from "react";
import getUser from "../../lib/get-user";

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const user = await getUser();
    if (!user?.observer) redirect("/");
    return <>{children}</>;
}
