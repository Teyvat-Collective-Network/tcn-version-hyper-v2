import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { UserWrapper } from "@/context/user";
import getUser from "@/lib/get-user";
import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"] });

const description =
    "Welcome to the Teyvat Collective Network! Our mission is to unite all mains servers across Teyvat and provide support and promote collaboration between partners.";

export const metadata: Metadata = {
    metadataBase: new URL("https://teyvatcollective.network"),
    title: "TCN",
    description,
    keywords: ["teyvat", "collective", "network", "tcn", "discord", "genshin", "impact"],
    openGraph: {
        type: "website",
        title: "Teyvat Collective Network",
        description,
        url: "https://teyvatcollective.network",
        images: { url: "https://teyvatcollective.network/favicon.ico" },
    },
};

export const viewport: Viewport = {
    colorScheme: "dark",
    themeColor: "#2b2d31",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const user = await getUser();

    return (
        <html lang="en">
            <Script src="https://kit.fontawesome.com/a7d0a79103.js"></Script>
            <body className={rubik.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <UserWrapper user={user}>
                        <div className="min-h-[100vh] flex flex-col">
                            <Navbar></Navbar>
                            <div id="main-body" className="grow flex flex-col">
                                {children}
                            </div>
                        </div>
                    </UserWrapper>
                </ThemeProvider>
            </body>
        </html>
    );
}
