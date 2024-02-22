"use client";

import { useUserContext } from "@/context/user";

export default function Home() {
    const user = useUserContext();

    if (user)
        return (
            <>
                <p>Logged in as:</p>
                <pre>{JSON.stringify(user, null, 4)}</pre>
                <a href="/auth/logout">Log Out</a>
            </>
        );
    else
        return (
            <>
                <p>Not logged in.</p>
                <a href="/auth/login">Log In</a>
            </>
        );
}
