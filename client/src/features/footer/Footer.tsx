"use client";
import { usePathname } from "next/navigation";

const Footer = () => {
    const pathname = usePathname();
    const isDashboardRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/talentdashboard');

    if (isDashboardRoute) {
        return null; 
    }
    
    return (
        <footer className="p-4 text-center bg-gray-800 text-white">
            © {new Date().getFullYear()}
        </footer>
    );
};

export default Footer;
