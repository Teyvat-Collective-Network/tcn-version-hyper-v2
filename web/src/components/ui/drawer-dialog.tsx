"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { ReactNode, useState } from "react";
import { Button } from "./button";
import Container from "./container";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./drawer";

export function DrawerDialog({
    trigger,
    title,
    description,
    children,
    onOpenChange,
}: {
    trigger: ReactNode;
    title?: ReactNode;
    description?: ReactNode;
    children: ReactNode;
    onOpenChange?: (open: boolean) => unknown;
}) {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    function updateOpen(open: boolean) {
        setOpen(open);
        onOpenChange?.(open);
    }

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={updateOpen}>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent className="max-w-[75vw] max-h-[75vh] overflow-y-scroll">
                    {title || description ? (
                        <DialogHeader>
                            {title ? <DialogTitle>{title}</DialogTitle> : null}
                            {description ? <DialogDescription>{description}</DialogDescription> : null}
                        </DialogHeader>
                    ) : null}
                    {children}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={updateOpen}>
            <DrawerTrigger asChild>{trigger}</DrawerTrigger>
            <DrawerContent>
                <Container className="max-h-[75vh] overflow-y-scroll">
                    {title || description ? (
                        <DrawerHeader className="text-left">
                            {title ? <DrawerTitle>{title}</DrawerTitle> : null}
                            {description ? <DrawerDescription>{description}</DrawerDescription> : null}
                        </DrawerHeader>
                    ) : null}
                    {children}
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </Container>
            </DrawerContent>
        </Drawer>
    );
}
