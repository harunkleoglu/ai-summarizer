import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return Response.json({ status: 'error', message: 'Yetkisiz' }, { status: 401 });
    }
    
    if (id) {
        const file = await prisma.file.findUnique({
            where: { id: id, userId: session.user.id }
        });
        if (!file) {
            return Response.json({ status: 'error', message: 'Dosya bulunamadı' }, { status: 404 });
        }
        return Response.json({ status: 'success', file });
    } else {
        const files = await prisma.file.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: 'desc' }
        });
        return Response.json({ status: 'success', files });
    }
}

export async function POST(req) {
    const { fileName, fileType, fileSize, fileKey } = await req.json();
    if (!fileName || !fileType || !fileSize || !fileKey) {
        return Response.json({ status: 'error', message: 'Eksik parametre' }, { status: 400 });
    }
    // Kullanıcıyı al
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return Response.json({ status: 'error', message: 'Yetkisiz' }, { status: 401 });
    }
    // Prisma ile kayıt oluştur
    const file = await prisma.file.create({
        data: {
            name: fileName,
            size: fileSize,
            contentType: fileType,
            path: fileKey,
            userId: session.user.id,
        }
    });
    return Response.json({ status: 'success', file });
}
