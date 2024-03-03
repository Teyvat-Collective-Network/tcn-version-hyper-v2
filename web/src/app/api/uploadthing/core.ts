import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import getUser from "../../../lib/get-user";

const f = createUploadthing();

export const fileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        .middleware(async ({ req }) => {
            const user = await getUser(req.cookies.get("discord_access_token")?.value ?? "");
            if (!user?.observer) throw new UploadThingError("Unauthorized");

            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            return { uploadedBy: metadata.userId, ...file };
        }),
} satisfies FileRouter;

export type TCNFileRouter = typeof fileRouter;
