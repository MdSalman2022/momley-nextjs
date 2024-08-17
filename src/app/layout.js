"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import StateProvider from "@/contexts/StateProvider/StateProvider";
import { ReactQueryClientProvider } from "@/components/Shared/ReactQueryClientProvider";
import { AuthProvider } from "@/contexts/AuthProvider/AuthProvider";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import Favicon from "./favicon.ico";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

// Move the QueryClient instance creation inside the component that uses it
export default function RootLayout({ children }) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <QueryClientProvider client={queryClient}>
          <body className={inter.className}>
            <AuthProvider>
              <StateProvider>
                <Toaster />
                <Header />
                <div>{children}</div>
                <Footer />
              </StateProvider>
            </AuthProvider>
          </body>
        </QueryClientProvider>
      </html>
    </ReactQueryClientProvider>
  );
}
