"use client"
import { Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { CircleAlert, LogIn, Eye, EyeOff } from 'lucide-react';
import Button from '../../../globalElements/Button';
import React from 'react';

export default function LoginForm() {
    const t = useTranslations('LoginPage')

    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false);

    const formSchema = Yup.object().shape({
        email: Yup.string().email().required(`${t('emailRequired')}`),
        password: Yup.string()
            .min(7, `${t("PasswordLength")}`)
            .required(`${t('passwordRequired')}`),
    })

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 p-6">
            <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md outline-3 outline-gray-100">
                <h2 className="text-xl font-bold text-center text-green-600 mb-8 tracking-tight">
                    {t('title', { appName: 'QuickScribe' })}
                </h2>

                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={formSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={async (values, { setSubmitting, setFieldError }) => {
                        try {
                            const res = await signIn('credentials', {
                                redirect: false,
                                callbackUrl: '/dashboard',
                                email: values.email,
                                password: values.password
                            });
                            
                            if(res.ok){
                                router.push('/dashboard');
                            }
                            else{
                                setFieldError('password', t('invalidCredentials'));
                            }
                        }
                        catch (error) {
                            console.error(error);
                        }
                        finally {
                            setSubmitting(false);
                        }

                    }}
                >
                    {({ errors, touched, isSubmitting, handleChange }) => (
                        <Form className="flex flex-col gap-4">
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
                                    <span className="flex gap-2 items-center text-xs text-red-500 mt-2 animate-fadeIn"><CircleAlert size={14} /> {errors.email}!</span>
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
                                    <span className="flex gap-2 items-center text-xs text-red-500 mt-2 animate-fadeIn"><CircleAlert size={14} />{errors.password}!</span>
                                )}
                            </div>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                icon={!isSubmitting ? <LogIn size={20}/> : null}
                                className="gap-2 font-bold"
                            >
                                {isSubmitting ? t('logging-in') : t('login')}
                            </Button>
                            <div className="flex flex-col justify-center items-center mt-2">
                                <a href="/register" className="text-green-600 hover:text-green-700 text-xs transition-all font-bold hover:underline">{t('register-link')}</a>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}