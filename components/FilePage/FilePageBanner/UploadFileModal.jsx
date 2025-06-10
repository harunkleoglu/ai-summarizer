import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { X } from 'lucide-react';
import { Button } from '@/globalElements';

const validationSchema = Yup.object({
    file: Yup.mixed().required('A file is required'),
});

export default function UploadFileModal({ onClose }) {
    const formik = useFormik({
        initialValues: {
            file: null,
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('File uploaded:', values.file);
            onClose();
        },
    });

    const handleFileDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            formik.setFieldValue('file', file);
        }
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
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleFileDrop}
                    >
                        {formik.values.file ? (
                            <p className="text-green-500">{formik.values.file.name}</p>
                        ) : (
                            <p className="text-gray-500">Drag and drop a file here, or click to select a file</p>
                        )}
                        <input
                            type="file"
                            className="hidden"
                            onChange={(event) => {
                                formik.setFieldValue('file', event.currentTarget.files[0]);
                            }}
                        />
                    </div>
                    {formik.errors.file && formik.touched.file && (
                        <p className="text-red-500 text-sm">{formik.errors.file}</p>
                    )}
                    <Button type="submit">
                        Upload
                    </Button>
                </form>
            </div>
        </div>
    );
}