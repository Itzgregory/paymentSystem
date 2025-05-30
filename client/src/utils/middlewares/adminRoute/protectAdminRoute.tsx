"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingPage from "@/utils/loader/loadingPage";
import { getAuthToken, isTokenValid, getUserRole } from "@/utils/auth/authutils";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const validateAuth = async () => {
      setIsLoading(true);

      const token = getAuthToken();
      const tokenValid = isTokenValid();

      if (!token || !tokenValid) {
        router.push("/login");
        return;
      }

      const role = getUserRole();
      if (!role || role !== "admin") {
        router.push("/unauthorized"); 
        return;
      }

      setIsAuthorized(true);
      setIsLoading(false);
    };

    validateAuth();
  }, [router]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;