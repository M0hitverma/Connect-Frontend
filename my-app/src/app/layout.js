import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UserContext from "@/context/UserContext";
import  Header  from "@/components/Header/Header";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Connect",
  description: "Socialize with your friends",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserContext>
          <Header />
          {children}
        </UserContext>
      </body>
    </html>
  );
}
