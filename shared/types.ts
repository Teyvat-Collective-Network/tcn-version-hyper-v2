export interface AuthUser {
    id: string;
    username: string;
    observer: boolean;
    owner: boolean;
}

export interface TCNUser {
    id: string;
    observer: boolean;
    owner: boolean;
    advisor: boolean;
    voter: boolean;
    council: boolean;
    staff: boolean;
    roles: string[];
    guilds: Record<string, { owner: boolean; advisor: boolean; voter: boolean; council: boolean; staff: boolean; roles: string[] }>;
}

export interface TCNGuild {
    id: string;
    name: string;
    mascot: string;
    invite: string;
    owner: string;
    advisor: string | null;
    delegated: boolean;
    voter: string;
    users: Record<string, { staff: boolean; roles: string[] }>;
}

export interface TCNAttribute {
    type: string;
    id: string;
    name: string;
    emoji: string;
}

export interface TCNCharacter {
    id: string;
    name: string;
    short: string;
    avatar: string;
    attributes: Record<string, string>;
}
