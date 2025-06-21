"use server";
import { uploadFile } from "@/servers/fileActions";

export async function handleFileUpload(formData) {
    const file = formData.get("file");
    if (!file) throw new Error("No file provided");
    await uploadFile(file);
}
