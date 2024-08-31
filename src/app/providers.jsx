"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryClientProvider } from "@/components/Shared/ReactQueryClientProvider";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import { Toaster } from "react-hot-toast";
import StateProvider from "@/contexts/StateProvider/StateProvider";
import { AuthProvider } from "@/contexts/AuthProvider/AuthProvider";

const Providers = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <div>
      <ReactQueryClientProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <StateProvider>
              <Toaster />
              <Header />
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
