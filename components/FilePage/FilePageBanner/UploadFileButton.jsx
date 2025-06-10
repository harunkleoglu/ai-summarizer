import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import UploadFileModal from './UploadFileModal';
import { Button } from '@/globalElements';

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
            <Button onClick={handleOpenModal} icon={<Upload size={18} />}>
                {t("upload-file")}
            </Button>
            {isModalOpen && <UploadFileModal onClose={handleCloseModal} />}
        </>
    );
}