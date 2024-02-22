"use client";

import { useEffect, useState } from "react";

function getWindowDimensions() {
    return { width: window.innerWidth, height: window.innerHeight };
}

export default function useViewport() {
    const [windowDimensions, setWindowDimensions] = useState({ width: 3200, height: 2000 });

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}
