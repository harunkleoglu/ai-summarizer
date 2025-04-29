import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import UploadFileModal from './UploadFileModal';

export default function UploadFileButton() {
    const t = useTranslations("DashboardPage.Dashboard-FilesPage")
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <label
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 transition-all"
                onClick={handleOpenModal}
            >
                <Upload size={18} />
                <span className='font-mono'>{t("upload-file")}</span>
            </label>
            {isModalOpen && <UploadFileModal onClose={handleCloseModal} />}
        </>
    );
}