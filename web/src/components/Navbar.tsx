"use client";

import { useUserContext } from "@/context/user";
import { useTheme } from "next-themes";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import {
    FaAddressCard,
    FaBars,
    FaBolt,
    FaBook,
    FaBuildingColumns,
    FaCheckToSlot,
    FaChevronDown,
    FaChevronRight,
    FaCircleCheck,
    FaCircleInfo,
    FaClipboard,
    FaClock,
    FaClockRotateLeft,
    FaDiscord,
    FaDoorClosed,
    FaDoorOpen,
    FaFileContract,
    FaFileLines,
    FaFolderOpen,
    FaGavel,
    FaGear,
    FaGears,
    FaGlobe,
    FaHandshake,
    FaHandshakeAngle,
    FaHeartPulse,
    FaHouse,
    FaLink,
    FaList,
    FaListOl,
    FaMessage,
    FaMoon,
    FaRobot,
    FaShieldHalved,
    FaSnowflake,
    FaSun,
    FaTowerBroadcast,
    FaTowerCell,
    FaUpload,
} from "react-icons/fa6";
import { IconType } from "react-icons/lib";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";

export default function Navbar() {
    const { setTheme } = useTheme();
    const user = useUserContext();
    const pathname = usePathname();

    const [openItems, setOpenItems] = useState<string[]>([]);

    function isOpen(key: string) {
        return openItems.includes(key);
    }

    function toggleOpen(key: string) {
        setOpenItems((open) => (open.includes(key) ? open.filter((x) => x !== key) : [...open, key]));
    }

    const links: [string, string, boolean?][] = [
        ["/", "Home"],
        ["/about", "About"],
        ["/partners", "Partners"],
        ["/join", "Apply Now", true],
    ];

    type MenuLink = [string, IconType | null, string, string?, boolean?];

    const menuLinks: MenuLink[] = [
        ["/", FaHouse, "Home"],
        ["/about", FaCircleInfo, "About Us"],
        ["/partners", FaHandshake, "Partners"],
        ["/join", FaDoorOpen, "Join"],
        ["/info/constitution", FaBuildingColumns, "Constitution"],
        ["/contact", FaAddressCard, "Contact Us"],
        ["", null, "Info Pages", "info", true],
        ["/info/quickstart", FaBolt, "Quickstart", "info"],
        ["/info/partner-list", FaList, "Partner List & Autosync", "info"],
        ["/info/banshares", FaTowerBroadcast, "Banshares", "info"],
        ["/info/global", FaGlobe, "Global Chat", "info"],
        ["/info/other-bots", FaRobot, "Other Bots", "info"],
        ["/info/discord", FaDiscord, "Discord Guides", "info"],
        ["/info/glossary", FaBook, "Glossary", "info"],
        ["/info/exit-procedure", FaDoorClosed, "Exit Procedure", "info"],
        ["", null, "Tools", "tools", true],
        ["/tools/embeds", FaMessage, "Embeds", "tools"],
        ["/tools/timestamps", FaClock, "Timestamp Generator", "tools"],
        ["/tools/snowflakes", FaSnowflake, "Snowflakes (IDs)", "tools"],
        ["/tools/url-shortener", FaLink, "URL Shortener", "tools"],
        ...(user?.staff
            ? ([
                  ["", null, "Network Staff", "staff", true],
                  ["/banshare", FaUpload, "Submit Banshare", "staff"],
              ] satisfies MenuLink[])
            : []),
        ...(user?.council
            ? ([
                  ["", null, "TCN Council", "council", true],
                  ["/vote", FaCheckToSlot, "Voting Center", "council"],
                  ["/docs", FaFileLines, "Documents", "council"],
                  ["/records", FaClockRotateLeft, "Historical Records", "council"],
              ] satisfies MenuLink[])
            : []),
        ...(user?.observer
            ? ([
                  ["", null, "Observers", "observers", true],
                  ["/admin/api-manager", FaGear, "API Manager", "observers"],
                  ["/admin/files", FaFolderOpen, "Files", "observers"],
                  ["/admin/audit-logs", FaListOl, "Audit Logs", "observers"],
                  ["/admin/monitor", FaHeartPulse, "Monitor", "observers"],
                  ["/docs/observer-onboarding", FaHandshakeAngle, "Onboarding Guide", "observers"],
              ] satisfies MenuLink[])
            : []),
        ["", null, "Documentation", "docs", true],
        ["/docs/global-chat-rules", FaGavel, "Global Chat Rules", "docs"],
        ["/docs/observer-tasks", FaCircleCheck, "Observer Tasks", "docs"],
        ["/docs/hub-communication-standards", FaTowerCell, "Hub Communication Standards", "docs"],
        ["/docs/global-chat-moderation", FaShieldHalved, "Global Chat Moderation", "docs"],
        ["/docs/global-chat-mod-agreement", FaFileContract, "Global Chat Mod Agreement", "docs"],
        ["/docs/observation-guide", FaClipboard, "Observation Guide", "docs"],
        ...(user?.owner ? ([["/manage", FaGears, "Manage Servers"]] satisfies MenuLink[]) : []),
    ];

    return (
        <>
            <nav className="fixed w-full center-row justify-between border-b border-border overflow-hidden dark:bg-background/75 backdrop-blur-[2px]">
                <div className="center-row">
                    <a href="/" className="center-row gap-4 px-4 py-2 hover:bg-foreground/5">
                        <Image className="rounded" width={48} height={48} src="/favicon.ico" alt="TCN Icon"></Image>
                        <h1 className="hidden sm:block text-2xl font-bold">Teyvat Collective Network</h1>
                        <h1 className="block sm:hidden text-2xl font-bold">TCN</h1>
                    </a>
                </div>
                <div className="hidden lg:flex items-center">
                    {links.map(([href, label, highlight], index) => (
                        <Fragment key={index}>
                            {index === 0 ? null : <Separator className="h-8" orientation="vertical"></Separator>}
                            <a href={href} className="center-row px-8 py-5 hover:bg-foreground/5">
                                {highlight ? <b>{label}</b> : label}
                            </a>
                        </Fragment>
                    ))}
                </div>
                <div className="center-row">
                    {user ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="center-row gap-4 px-4 py-3 hover:bg-foreground/5 outline-none">
                                    <Avatar>
                                        <AvatarImage src={user.image ?? ""} alt={`@${user.name}`}></AvatarImage>
                                        <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <span className="hidden sm:block">Hello, {user.name}!</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <a href="/account">My Account</a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <a href={`/auth/logout?redirect=${encodeURIComponent(pathname)}`}>Sign Out</a>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <a href={`/auth/login?redirect=${encodeURIComponent(pathname)}`} className="px-4 py-5 hover:bg-foreground/5">
                            Log In
                        </a>
                    )}
                    <button className="hidden dark:flex h-16 w-16 flex-col items-center justify-center hover:bg-foreground/5" onClick={() => setTheme("light")}>
                        <FaSun></FaSun>
                    </button>
                    <button className="flex dark:hidden h-16 w-16 flex-col items-center justify-center hover:bg-foreground/5" onClick={() => setTheme("dark")}>
                        <FaMoon></FaMoon>
                    </button>
                    <Sheet>
                        <SheetTrigger className="h-16 w-16 center-col justify-center hover:bg-foreground/5">
                            <FaBars></FaBars>
                        </SheetTrigger>
                        <SheetContent>
                            <ScrollArea className="h-full">
                                <div className="flex flex-col justify-between gap-8">
                                    <div className="w-full flex flex-col">
                                        {menuLinks.map(([href, icon, label, category, parent], index) => (
                                            <a
                                                key={`${index}`}
                                                href={href || "javascript:void(0)"}
                                                className={`${
                                                    category && !parent && !isOpen(category) ? "hidden" : "center-row"
                                                } gap-4 px-4 py-2 w-full hover:bg-foreground/5`}
                                                onClick={category && parent ? () => toggleOpen(category) : undefined}
                                            >
                                                {category && !parent ? <div className="mr-4"></div> : null}
                                                {category && parent ? (
                                                    isOpen(category) ? (
                                                        <FaChevronDown></FaChevronDown>
                                                    ) : (
                                                        <FaChevronRight></FaChevronRight>
                                                    )
                                                ) : (
                                                    icon?.({})
                                                )}
                                                <span>{label}</span>
                                            </a>
                                        ))}
                                    </div>
                                    <div className="w-full flex flex-col gap-2">
                                        <span className="text-muted-foreground">&copy; 2024 TCN Development Team</span>
                                        <span className="text-muted-foreground">Loaded {new Date().toLocaleString()}</span>
                                    </div>
                                </div>
                            </ScrollArea>
                        </SheetContent>
                        <SheetClose className="outline-none"></SheetClose>
                    </Sheet>
                </div>
            </nav>
            <div className="pt-16"></div>
        </>
    );
}
