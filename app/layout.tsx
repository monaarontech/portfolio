import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mon-aaron-marcelo.vercel.app"),
  title: "Mon Aaron Marcelo — Full-Stack Developer & IT Scholar",
  description:
    "Official portfolio of Mon Aaron Marcelo — Full-Stack Software Developer, BSIT student at NEUST, and lead engineer of One Palayan-Kalinga Hub. Specializing in civic web systems, secure backend architectures, and high-performance digital experiences.",
  keywords: [
    "Mon Aaron Marcelo",
    "Portfolio",
    "Full-Stack Developer",
    "NEUST",
    "Palayan Kalinga Hub",
    "Software Engineer",
    "PHP",
    "MySQL",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Mon Aaron Marcelo" }],
  openGraph: {
    title: "Mon Aaron Marcelo — Full-Stack Developer & IT Scholar",
    description:
      "Engineering purpose-built civic software architectures, robust database ecosystems, and cinematic web experiences.",
    url: "https://mon-aaron-marcelo.vercel.app",
    siteName: "Mon Aaron Marcelo Portfolio",
    images: [
      {
        url: "/images/portrait.jpg",
        width: 768,
        height: 1024,
        alt: "Mon Aaron Marcelo — Portrait",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#090A0F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#090A0F] text-[#F5F5F7] antialiased selection:bg-[#FF2A4D] selection:text-white">
        {children}
      </body>
    </html>
  );
}
