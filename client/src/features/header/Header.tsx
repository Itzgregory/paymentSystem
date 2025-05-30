"use client";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { logout } from "@/redux/slices/user/authSlice";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import styles from "./Header.module.css";
import { LogoBrand } from "./components/logoBrand";
import { Navbar } from "./components/navbar"; 
import { MobileMenu } from "./components/mobileMenu";
import { useScrollVisibility, useDashboardCheck } from "./hooks/headerHook";

export const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const isNavbarVisible = useScrollVisibility();
  const isDashboardRoute = useDashboardCheck();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  if (isDashboardRoute) return null;

  return (
    <>
      <nav
        className={styles.navbar}
        style={{
          transform: isNavbarVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div className={styles.container}>
          <LogoBrand />
          <Navbar user={user} handleLogout={handleLogout} />
          <button
            className={styles.mobileMenuButton}
            onClick={() => setSideMenuOpen(!sideMenuOpen)}
            aria-label="Toggle menu"
          >
            {sideMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>
      <MobileMenu 
        isOpen={sideMenuOpen} 
        user={user} 
        handleLogout={handleLogout}
        onClose={() => setSideMenuOpen(false)} 
      />
    </>
  );
};

export default Header;