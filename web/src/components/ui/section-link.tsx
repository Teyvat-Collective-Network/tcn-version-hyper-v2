import { ReactNode } from "react";
import { FaLink } from "react-icons/fa6";
import { Button } from "./button";

export default function SectionLink({ id, children }: { id: string; children: ReactNode }) {
    return (
        <span id={id} className="center-row gap-2">
            <a href={`#${id}`}>
                <Button variant="ghost">
                    <FaLink></FaLink>
                </Button>
            </a>
            {children}
        </span>
    );
}
