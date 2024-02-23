"use client";

import { Suspense, useEffect, useState } from "react";
import { FaAt, FaSpinner } from "react-icons/fa6";
import { useTagsContext } from "../../context/tags";
import { getTag } from "../../lib/actions";
import Mention from "./mention";

export default function UserMention({ id }: { id: string }) {
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => setIsClient(true), [setIsClient]);

    const loading = (
        <Mention>
            <FaSpinner></FaSpinner> Loading user {id}
        </Mention>
    );

    if (!isClient) return loading;

    return (
        <Suspense fallback={loading}>
            <Core id={id}></Core>
        </Suspense>
    );
}

async function Core({ id }: { id: string }) {
    const { tags, setTag } = useTagsContext();
    const tag = tags[id] ?? (await setTag(id, getTag(id)));
    return (
        <Mention>
            <FaAt></FaAt> {tag}
        </Mention>
    );
}
