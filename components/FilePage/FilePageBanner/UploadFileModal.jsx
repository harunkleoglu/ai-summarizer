import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/globalElements';

export default function UploadFileModal({ onClose }) {
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const formRef = useRef();

    // Dosya seçildiğinde ad ve tipi state'e kaydet
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setProgress(0);
        const file = selectedFile;
        if (!file) {
            setError('Lütfen bir dosya seçin.');
            return;
        }
        // 1. Presigned URL al
        let presigned;
        try {
            const presignedRes = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fileName: file.name, fileType: file.type })
            });
            presigned = await presignedRes.json();
            if (!presigned.url) throw new Error('Presigned URL alınamadı');
        } catch (err) {
            setError('Presigned URL alınamadı.');
            return;
        }
        // 2. Dosyayı presigned URL ile yükle
        const xhr = new window.XMLHttpRequest();
        xhr.open('PUT', presigned.url, true);
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percent = Math.round((event.loaded / event.total) * 100);
                setProgress(percent);
            }
        };
        xhr.onload = async () => {
            if (xhr.status === 200) {
                // 3. Dosya kaydını backend'e bildir
                try {
                    const saveRes = await fetch('/api/file', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            fileName: file.name,
                            fileType: file.type,
                            fileSize: file.size,
                            fileKey: presigned.key
                        })
                    });
                    const saveData = await saveRes.json();
                    if (saveRes.ok && saveData.status === 'success') {
                        window.dispatchEvent(new Event('file-uploaded'));
                        onClose();
                    } else {
                        setError(saveData?.message || 'Kayıt başarısız!');
                    }
                } catch {
                    setError('Kayıt başarısız!');
                }
            } else {
                setError('Yükleme başarısız!');
            }
        };
        xhr.onerror = () => {
            setError('Yükleme başarısız!');
        };
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.send(file);
    };

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Upload File</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>
                {/* Progress Bar */}
                {progress > 0 && (
                    <div className="w-full bg-gray-200 rounded h-2 mb-2">
                        <div className="bg-blue-500 h-2 rounded" style={{ width: `${progress}%` }} />
                    </div>
                )}
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
                    <input type="file" name="file" required onChange={handleFileChange} />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button type="submit">
                        Upload
                    </Button>
                </form>
            </div>
        </div>
    );
}