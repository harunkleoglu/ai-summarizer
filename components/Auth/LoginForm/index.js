"use client"
import { Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';

export default function LoginForm() {
    const t = useTranslations('LoginPage')

    const router = useRouter();

    const formSchema = Yup.object().shape({
        email: Yup.string().email().required(`${t('emailRequired')}`),
        password: Yup.string()
            .min(7, `${t("PasswordLength")}`)
            .required(`${t('passwordRequired')}`),
    })

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'>
            <div className='bg-white shadow-md rounded-lg p-8 w-full max-w-md'>
                <h2 className='text-2xl font-bold font-mono text-center text-green-600 mb-6'>
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
                    onSubmit={async (values, { setSubmitting }) => {
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
                                actions.setFieldError('email', t('invalidCredentials'));
                                actions.setFieldError('password', t('invalidCredentials'));
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
                        <Form className='flex flex-col gap-6'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="email" className='text-sm font-mono font-medium text-gray-700'>
                                    {t('email')}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className='border border-green-500 rounded-sm font-mono px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500'
                                    onChange={handleChange}
                                />

                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="password" className='text-sm font-mono font-medium text-gray-700'>
                                    {t('password')}
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className='border border-green-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500'
                                    onChange={handleChange}
                                />

                            </div>
                            {errors.email && touched.email || errors.password && touched.password ?
                                <div className='bg-white p-3 rounded-md shadow-sm'>
                                    <ul>
                                        {errors.email && touched.email ? (
                                            <li className='text-xs font-mono text-red-500'>{errors.email}!</li>
                                        ) : null}
                                        {errors.password && touched.password ? (
                                            <li className='text-xs font-mono font-medium text-red-500'>{errors.password}!</li>
                                        ) : null}
                                    </ul>
                                </div>
                                : null
                            }
                            <button
                                className='flex gap-2 justify-center items-center bg-green-500 hover:bg-green-600 transition-all cursor-pointer rounded-md px-4 py-2 text-white font-mono font-bold disabled:opacity-50 disabled:cursor-not-allowed'
                                type="submit"
                                disabled={isSubmitting}
                            >
                                
                                {isSubmitting ? t('logging-in') : <><LogIn size={20}/> {t('login')}</>}
                                
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
