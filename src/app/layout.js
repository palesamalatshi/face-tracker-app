import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Face Tracker App",
  description: "Track faces with style",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Berkshire Swash Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-cover bg-center bg-fixed`}
        style={{
          backgroundImage:
            "url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWhiYnBvN2c1emVndmRhaDB0OGd4ZDU2eTk4eWF6NzNsb3d0Ym4xayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o72F9qF8vBVCBNmN2/giphy.gif')",
          fontFamily: `'Berkshire Swash', cursive`,
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}

