import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "AltaRasa — An elevated essence of South Asian design",
  description: "A refined editorial exploration of South Asian design. Join the newsletter for launch updates.",
  metadataBase: new URL("https://coming-soon-site-zeta.vercel.app/"),
  openGraph: {
    title: "AltaRasa — An elevated essence of South Asian design",
    description: "A refined editorial exploration of South Asian design. Join the newsletter for launch updates.",
    url: "/",
    siteName: "AltaRasa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AltaRasa — An elevated essence of South Asian design",
    description: "A refined editorial exploration of South Asian design. Join the newsletter for launch updates.",
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
