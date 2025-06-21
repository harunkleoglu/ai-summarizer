import Client from "@/lib/cloudflare";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

export async function getFile(path){
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: path
        });
        const response = await Client.send(command);
        return response;
    } catch (error) {
        console.error("Error fetching file:", error);
        throw error;
    }
}

export async function uploadFile(file) {
    try {
        const command = new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: file.name,
            Body: file,
            ContentType: file.type || "application/octet-stream",
        });
        const response = await Client.send(command);
        return response;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
}