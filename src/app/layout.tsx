import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "AltaRasa | Coming Soon",
  description: "A new expression of South Asian style is taking shape - distilled, modern, and quietly luxurious. AltaRasa arrives soon.",
  metadataBase: new URL("https://coming-soon-site-zeta.vercel.app/"),
  openGraph: {
    title: "AltaRasa | Coming Soon",
    description: "A new expression of South Asian style is taking shape - distilled, modern, and quietly luxurious. AltaRasa arrives soon.",
    url: "/",
    siteName: "AltaRasa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AltaRasa | Coming Soon",
    description: "A new expression of South Asian style is taking shape - distilled, modern, and quietly luxurious. AltaRasa arrives soon.",
  },
  icons: {
    icon: [
      {
        url: '/icon.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon2.ico',
        media: '(prefers-color-scheme: dark)',
      },
    ],
}
}
    


export const viewport : Viewport = {
      width: "device-width",
      initialScale: 1,
      viewportFit:"cover",
      themeColor:"white",
      maximumScale:1
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter antialiased bg-white text-neutral-900 m-0 p-0 `}>
        {children}
      </body>
    </html>
  );
}
