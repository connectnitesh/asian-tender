"use client";
import "@/css/global.css"
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { AuthAdminProvider } from '@/context/authadminContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <AuthAdminProvider>
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (
            <main>
                {children}
            </main>
          )}
        </div>
      </body>
    </html>
    </AuthAdminProvider>
  );
}
