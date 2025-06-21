"use server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from 'uuid';
import slugify from "slugify";

export async function POST(req) {
    const { fileName, fileType } = await req.json();
    if (!fileName || !fileType) {
        return Response.json({ status: 'error', message: 'Eksik parametre' }, { status: 400 });
    }
    const safeName = slugify(fileName, { lower: true, strict: true });
    const extension = fileName.split('.').pop();
    const key = `uploads/${safeName}-${uuidv4()}.${extension}`;

    const client = new S3Client({
        region: process.env.R2_REGION,
        endpoint: process.env.R2_ENDPOINT,
        credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY_ID,
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        },
    });

    const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        ContentType: fileType,
    });

    const url = await getSignedUrl(client, command, { expiresIn: 60 * 5 }); // 5 dakika geçerli

    return Response.json({ url, key });
}
