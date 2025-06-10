import { Poppins, Open_Sans, Noto_Sans } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins"
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-open-sans"
});

export const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700"],
  variable: "--font-noto-sans"
});
