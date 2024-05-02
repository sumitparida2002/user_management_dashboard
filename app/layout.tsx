import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { SocketProvider } from "@/providers/socket-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ModalProvider } from "@/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bright Space",
  description: "User Management Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      {/* <Theme> */}
      <html lang="en">
        <body className={inter.className}>
          <SocketProvider>
            <ModalProvider />
            <QueryProvider>{children}</QueryProvider>
          </SocketProvider>
          <Toaster />
        </body>
      </html>
      {/* </Theme> */}
    </ClerkProvider>
  );
}
