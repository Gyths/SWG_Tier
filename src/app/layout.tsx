// app/layout.tsx
import "~/styles/globals.css";
import { Geist } from "next/font/google";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { AuthProvider } from "./context/AuthContext";
import ConditionalNavBar from "./_components/ConditionalNavBar";

export const metadata: Metadata = {
  title: "Burger Tracker",
  description: "Track your burger adventures",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          <AuthProvider>
            <ConditionalNavBar />
            {children}
          </AuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}