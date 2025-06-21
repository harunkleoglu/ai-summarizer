import { PutObjectCommand, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand, AbortMultipartUploadCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
import Client from "@/lib/cloudflare";
import slugify from "slugify";

const MULTIPART_THRESHOLD = 5 * 1024 * 1024;

export async function Upload(formData) {
    console.log('formData keys:', Array.from(formData.keys()));
    const file = formData.get('file');
    console.log('file:', file);
    // fileName ve fileType fallback olarak al
    const fileNameFromForm = formData.get('fileName');
    const fileTypeFromForm = formData.get('fileType');

    // file.name ve file.type yoksa formdan geleni kullan
    const originalName = (file && file.name) || fileNameFromForm || 'file';
    const extension = originalName.split('.').pop();
    const safeName = slugify(originalName, { lower: true, strict: true });
    const fileName = `${safeName}-${uuidv4()}.${extension}`;
    const contentType = (file && file.type) || fileTypeFromForm || "application/octet-stream";

    if (!file) {
        return {
            status: 'error',
            message: 'Invalid or missing file'
        }
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const key = `uploads/${fileName}`;

    try {
        if (buffer.length < MULTIPART_THRESHOLD) {
            // Simple upload for files smaller than the threshold
            const command = new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: key,
                Body: buffer,
                ContentType: contentType
            });

            await Client.send(command);
            return {
                status: 'success',
                message: 'File uploaded successfully',
                fileName: fileName,
                key: key
            };
        }
        else {
            const create = await Client.send(
                new CreateMultipartUploadCommand({
                    Bucket: process.env.R2_BUCKET_NAME,
                    Key: key,
                    ContentType: contentType
                })
            );

            const uploadId = create.uploadId;

            const partSize = 5 * 1024 * 1024; // 5 MB
            const partCount = Math.ceil(buffer.length / partSize);
            const parts = [];

            for (let i = 0; i < partCount; i++) {
                // Upload each part
                if (i >= 10000) {
                    // AWS S3 limits the number of parts to 10,000
                    throw new Error("File is too large to upload in parts");
                }
                const start = i * partSize;
                const end = Math.min(start + partSize, buffer.length);
                const partBuffer = buffer.subarray(start, end);

                const uploadPart = await Client.send(
                    new UploadPartCommand({
                        Bucket: process.env.R2_BUCKET_NAME,
                        Key: key,
                        UploadId: uploadId,
                        PartNumber: i + 1,
                        Body: partBuffer
                    })
                );

                parts.push({
                    ETag: uploadPart.ETag,
                    PartNumber: i + 1
                });
            }

            // Complete the multipart upload
            await Client.send(
                new CompleteMultipartUploadCommand({
                    Bucket: process.env.R2_BUCKET_NAME,
                    Key: key,
                    UploadId: uploadId,
                    MultipartUpload: {
                        Parts: parts
                    }
                })
            );
        }

        return {
            status: 'success',
            file: {
                fileName,
                path: key,
                size: buffer.length,
            }
        }

    }
    catch (error) {
        return {
            status: 'error',
            message: 'Failed to upload file',
            file: fileName
        }
    }
}