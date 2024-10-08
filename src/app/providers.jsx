"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryClientProvider } from "@/components/Shared/ReactQueryClientProvider";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer/Footer";
import { Toaster } from "react-hot-toast";
import StateProvider from "@/contexts/StateProvider/StateProvider";
import { AuthProvider } from "@/contexts/AuthProvider/AuthProvider";
import NewHeader from "@/components/Shared/NewHeader";
import { usePathname } from "next/navigation";

const Providers = ({ children }) => {
  const pathname = usePathname();

  const isDashboardPage = pathname.includes("/dashboard");
  const queryClient = new QueryClient();
  return (
    <div>
      <ReactQueryClientProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <StateProvider>
              <Toaster />
              <div className={isDashboardPage ? "" : "mb-32"}>
                <Header />
                {/* <NewHeader /> */}
              </div>
              <div>{children}</div>
              <Footer />
            </StateProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ReactQueryClientProvider>
    </div>
  );
};

export default Providers;
