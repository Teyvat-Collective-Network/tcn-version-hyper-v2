import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";
import { TCNFileRouter } from "../app/api/uploadthing/core.js";

export const UploadButton = generateUploadButton<TCNFileRouter>();
export const UploadDropzone = generateUploadDropzone<TCNFileRouter>();
