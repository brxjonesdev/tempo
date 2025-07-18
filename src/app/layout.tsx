import type { Metadata } from 'next';
import { Work_Sans, Quicksand } from 'next/font/google';
import './globals.css';

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
});

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tempo',
  description: 'Starting is often the hardest part. Tempo is built to reduce friction and make it easy to begin. ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${quicksand.variable} ${workSans.variable} antialiased h-dvh bg-[#d6fcff]`}
      >
        {children}
      </body>
    </html>
  );
}
