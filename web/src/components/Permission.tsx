import { englishList } from "../lib/format";
import SectionLink from "./ui/section-link";

interface IProps {
    name: string;
    code?: string;
    bit: number;
    open: boolean;
    T?: boolean;
    V?: boolean;
    S?: boolean;
    MFA?: boolean;
    H?: boolean;
}

export default function Permission({ name, code, bit, open, T, V, S, MFA, H }: IProps) {
    code ??= name.toUpperCase().replaceAll(/\s+/g, "_");

    return (
        <>
            <SectionLink id={code}>
                <h3 className="center-row gap-1 text-2xl" dangerouslySetInnerHTML={{ __html: name }}></h3>
            </SectionLink>
            {open ? (
                <>
                    <p>
                        <code>{code}</code> &mdash;{" "}
                        <code>
                            1 &lt;&lt; {bit} = {1 << bit}
                        </code>{" "}
                        &mdash;{" "}
                        <b className="text-muted-foreground">
                            {T || V || S ? (
                                <>
                                    This permission can be set server-wide or in {englishList([T && "text", V && "voice", S && "stage"].filter((x) => x))}{" "}
                                    channels.
                                </>
                            ) : (
                                <>This permission can be set server-wide.</>
                            )}{" "}
                            {MFA ? (
                                <>
                                    If the 2FA requirement for moderation is enabled in the server, users must have 2FA enabled on their account to take actions
                                    requiring this permission.
                                </>
                            ) : null}{" "}
                            {H ? <>This permission is subject to role hierarchy.</> : null}
                        </b>
                    </p>
                </>
            ) : null}
        </>
    );
}
