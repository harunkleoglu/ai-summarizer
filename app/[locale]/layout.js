import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import AuthProvider from "@/components/Auth/Provider";
import { poppins } from "../fonts";

export const dynamicParams = false;
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function localeLayout({ children, params }) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    return (
        <html lang={locale}>
            <body className={`bg-white text-gray-900 ${poppins.className}`}>
                <AuthProvider>
                    <NextIntlClientProvider locale={locale}>
                        {children}
                    </NextIntlClientProvider>
                </AuthProvider>
            </body>
        </html>
    )
}