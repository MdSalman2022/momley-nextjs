import { Inter } from "next/font/google";
import "./globals.css";
import StateProvider from "@/contexts/StateProvider/StateProvider";
import { ReactQueryClientProvider } from "@/components/Shared/ReactQueryClientProvider";
import { AuthProvider } from "@/contexts/AuthProvider/AuthProvider";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import Favicon from "./favicon.ico";

export const metadata = {
  title: "Momley",
  icons: [{ rel: "icon", url: Favicon.src }],
};

const inter = Inter({ subsets: ["latin"] });

// Move the QueryClient instance creation inside the component that uses it
export default function RootLayout({ children }) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <AuthProvider>
          <StateProvider>
            <body className={inter.className}>
              <Header />
              <div>{children}</div>
              <Footer />
            </body>
          </StateProvider>
        </AuthProvider>
      </html>
    </ReactQueryClientProvider>
  );
}
