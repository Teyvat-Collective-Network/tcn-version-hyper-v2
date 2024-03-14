export type Vote = {
    user: string;
    abstain: boolean;
    yes: boolean;
    verdict: "preinduct" | "induct" | "extend" | "reject";
    candidates: Record<string, number>;
    selected: string[];
};

export type Poll = {
    id: number;
    message: string;
    mode: "induction" | "proposal" | "election" | "selection";
    close: number;
    closed: boolean;
    live: boolean;
    min: number;
    max: number;
    preinduct: boolean;
    question: string;
    quorum: number;
    restricted: boolean;
    seats: number;
    server: string;
    wave: number;
    candidates: string[];
    options: string[];
    votes: Vote[];
};
