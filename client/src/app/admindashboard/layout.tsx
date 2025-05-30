"use client"
import { isTokenValid } from "@/utils/auth/authutils";
import AdminProtectedRoute from "@/utils/middlewares/adminRoute/protectAdminRoute";
import styles from "../talentdashboard/TalentDashboardLayout.module.css";
import { useEffect, useState } from "react";
import Sidebar from "@/features/dashboard/userDashboard/components/talentMenu/sidebar";


export default function AdminLayout({
  children 
 }: { 
   children: React.ReactNode 
 }) {
   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
   const [isMobile, setIsMobile] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
 
   useEffect(() => {
     const handleSidebarToggle = (event: Event) => {
       const customEvent = event as CustomEvent<{ collapsed: boolean }>;
       setSidebarCollapsed(customEvent.detail.collapsed);
     };
     
     window.addEventListener("sidebarStateChange", handleSidebarToggle);
     return () => window.removeEventListener("sidebarStateChange", handleSidebarToggle);
   }, []);
 
   useEffect(() => {
     const checkSize = () => setIsMobile(window.innerWidth < 768);
     checkSize();
     window.addEventListener("resize", checkSize);
     return () => window.removeEventListener("resize", checkSize);
   }, []);
 
   useEffect(() => {
     const isAuthenticated = document.cookie.includes("auth-validated=true") || isTokenValid();
     setIsLoading(!isAuthenticated);
   }, []);
 
   if (isLoading) return <div>Loading...</div>;
 
  return (
    // <AdminProtectedRoute>
      <div className={styles.dashboardContainer}>
        <Sidebar collapsed={isMobile ? false : sidebarCollapsed} />
        <nav className="bg-gray-800 text-white p-4">
          <h1>Admin Panel</h1>
        </nav>
        <main className={`${styles.contentArea} ${!isMobile && sidebarCollapsed ? styles.contentWithCollapsedSidebar : ''}`}>
        {children}
      </main>
      </div>
    // </AdminProtectedRoute>
  );
}