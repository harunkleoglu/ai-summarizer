import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';

const supportedLocales = ['tr', 'en'];
const defaultLocale = 'tr';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  // Locale zaten path'te varsa devam et
  if (supportedLocales.some((locale) => pathname.startsWith(`/${locale}`))) {
    return createMiddleware(routing)(request);
  }

  // Kullanıcının sistem dilini al
  const acceptLang = request.headers.get('accept-language');
  let detectedLocale = defaultLocale;
  if (acceptLang) {
    const preferred = acceptLang.split(',')[0].split('-')[0];
    if (supportedLocales.includes(preferred)) {
      detectedLocale = preferred;
    }
  }

  // Locale yoksa uygun locale'ye yönlendir
  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};