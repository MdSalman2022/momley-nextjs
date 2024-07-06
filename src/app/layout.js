import { Inter } from "next/font/google";
import "./globals.css";
import StateProvider from "@/contexts/StateProvider/StateProvider";
import { ReactQueryClientProvider } from "@/components/Shared/ReactQueryClientProvider";
import { AuthProvider } from "@/contexts/AuthProvider/AuthProvider";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";

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
              <div className="mt-24">{children}</div>
              <Footer />
            </body>
          </StateProvider>
        </AuthProvider>
      </html>
    </ReactQueryClientProvider>
  );
}
