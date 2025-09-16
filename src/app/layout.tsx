import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { arkitype, helvetica, bungee } from "../../styles/fonts";
import { Toaster } from 'react-hot-toast'; 
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Strict typing with Metadata
export const metadata: Metadata = {
  title: "Dr. Ramdas M Pai - Chancellor of Manipal Academy of Higher Education",
  description:
    "Learn about Dr. Ramdas M Pai, Chancellor of Manipal Academy of Higher Education and Padma Bhushan awardee 2011, his vision, achievements, and contributions to higher education.",
  keywords: [
    "Dr Ramdas M Pai",
    "Manipal University",
    "Manipal Academy of Higher Education",
    "Chancellor",
    "Padma Bhushan",
    "leadership",
    "education",
    "birthday",
  ],
  openGraph: {
    title: "Dr. Ramdas M Pai - Chancellor of Manipal Academy of Higher Education",
    description:
      "Discover the achievements and vision of Dr. Ramdas M Pai, Padma Bhushan awardee and Chancellor of Manipal Academy of Higher Education.",
    url: "https://www.manipal.edu",
    siteName: "Manipal Academy of Higher Education",
    images: [
      {
        url: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSPXTx1R9W6sFVPwCGQV-QrrqJz_XOKYotN-3KE9bo-N5MZcea85l777VCzJTw6t8dgESs-4ajq45ZZbwjnbCAkA8gOUMSQ2rYm0gHB86xZjw",
        width: 1200,
        height: 630,
        alt: "Dr. Ramdas M Pai",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Ramdas M Pai - Chancellor of Manipal Academy of Higher Education",
    description:
      "Learn about Dr. Ramdas M Pai, Chancellor of Manipal Academy of Higher Education and Padma Bhushan awardee 2011.",
    images: [
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSPXTx1R9W6sFVPwCGQV-QrrqJz_XOKYotN-3KE9bo-N5MZcea85l777VCzJTw6t8dgESs-4ajq45ZZbwjnbCAkA8gOUMSQ2rYm0gHB86xZjw",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${arkitype.variable} ${helvetica.variable} ${bungee.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" reverseOrder={false} /> {/* Add this line */}

      </body>
    </html>
  );
}
