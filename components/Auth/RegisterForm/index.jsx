"use client"
import { Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';
import * as Yup from 'yup';
import { CircleAlert, LogIn, Check, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '@/globalElements';

export default function RegisterForm() {
    const t = useTranslations('RegisterPage');
    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false);

    const formSchema = Yup.object().shape({
        name: Yup.string().required(`${t('nameRequired')}`),
        email: Yup.string().email().required(`${t('emailRequired')}`),
        password: Yup.string()
            .min(7, `${t("PasswordLength")}`)
            .required(`${t('passwordRequired')}`),
        terms: Yup.bool().oneOf([true], `You must accept the terms.`), // terms validasyonu eklendi
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 p-6">
            <div className="bg-white/90 shadow-2xl rounded-2xl p-10 w-full max-w-md outline-3 outline-gray-100">
                <h2 className="text-xl font-bold text-center text-green-600 mb-8 tracking-tight">
                    {t('title', { appName: 'QuickScribe' })}
                </h2>

                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        terms: false
                    }}
                    validationSchema={formSchema}
                    validateOnBlur={false}
                    validateOnChange={true}
                    onSubmit={async (values, { setSubmitting, setFieldError }) => {
                        try {
                            const res = await fetch('/api/auth/register', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(values),
                            });

                            if (res.ok) {
                                router.push('/login');
                            } else {
                                const errorData = await res.json();
                                setFieldError('email', errorData.error);
                            }
                        } catch (error) {
                            console.error(error);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ errors, touched, isSubmitting, handleChange, values, setFieldValue }) => (
                        <Form className="flex flex-col gap-4">
                            <div className="flex flex-col relative">
                                <label htmlFor="name" className="text-sm font-semibold text-gray-600 mb-1">
                                    {t('name')}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="border border-gray-300 bg-gray-50 text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                                    onChange={handleChange}
                                />
                                {errors.name && touched.name && (
                                    <span className="flex gap-2 items-center text-xs text-red-500 mt-2 animate-fadeIn">
                                        <CircleAlert size={14} /> {errors.name}!
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col relative">
                                <label htmlFor="email" className="text-sm font-semibold text-gray-600 mb-1">
                                    {t('email')}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="border border-gray-300 bg-gray-50 text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                                    onChange={handleChange}
                                />
                                {errors.email && touched.email && (
                                    <span className="flex gap-2 items-center text-xs text-red-500 mt-2 animate-fadeIn">
                                        <CircleAlert size={14} /> {errors.email}!
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col relative">
                                <label htmlFor="password" className="text-sm font-semibold text-gray-600 mb-1">
                                    {t('password')}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        className="border border-gray-300 bg-gray-50 text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition w-full pr-10"
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && touched.password && (
                                    <span className="flex gap-2 items-center text-xs text-red-500 mt-2 animate-fadeIn">
                                        <CircleAlert size={14} /> {errors.password}!
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col items-start gap-2 ms-1">
                                <label htmlFor="terms" className="flex items-center cursor-pointer select-none">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            name="terms"
                                            id="terms"
                                            className="sr-only"
                                            onChange={() => setFieldValue('terms', !values.terms)}
                                            checked={values.terms}
                                        />
                                        <div className={`w-4 h-4 rounded border-2 transition-all duration-200 flex items-center justify-center ${values.terms
                                            ? 'bg-green-500 border-green-500'
                                            : 'bg-white border-gray-300 hover:border-green-400'
                                            }`}>
                                            {values.terms && (
                                                <Check size={14} className="text-white" />
                                            )}
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-600 ml-2">
                                        I agree to the <span className="text-green-600 underline cursor-pointer">terms and conditions</span>
                                    </span>
                                </label>
                                {/* Hata mesajı */}
                                {errors.terms && touched.terms && (
                                    <span className="text-xs text-red-500 animate-fadeIn">
                                        <CircleAlert size={14} className="inline mr-1" /> {errors.terms}
                                    </span>
                                )}
                            </div>
                            <Button
                                className="gap-2 font-bold"
                                type="submit"
                                icon={!isSubmitting ? <LogIn size={20}/> : null}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? t('registering') : t('register')}
                            </Button>
                            <div className="flex flex-col justify-center items-center mt-2">
                                <a href="/login" className="text-green-600 hover:text-green-700 text-xs transition-all font-bold hover:underline">
                                    {t('login-link')}
                                </a>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
