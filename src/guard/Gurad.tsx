'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") !== "true") {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
};
