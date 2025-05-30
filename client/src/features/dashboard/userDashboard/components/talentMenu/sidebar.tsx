"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  FaHome, 
  FaUser, 
  FaBriefcase, 
  FaFileAlt, 
  FaEnvelope, 
  FaCompass,
  FaTimes,
  FaBars
} from "react-icons/fa";
import Image from "next/image";
import logo from "../../../../../../public/asset/logo.png";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      setIsMobile(mobile);
      if (mobile && !mobileOpen) {
        window.dispatchEvent(
          new CustomEvent('sidebarStateChange', { 
            detail: { collapsed: true } 
          })
        );
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileOpen]);

  useEffect(() => {
    if (isMobile) {
      setMobileOpen(!collapsed);
    }
  }, [collapsed, isMobile]);

  const toggleSidebar = () => {
    const newState = !collapsed;
    if (isMobile) {
      setMobileOpen(!collapsed);
    }
    window.dispatchEvent(
      new CustomEvent('sidebarStateChange', { 
        detail: { collapsed: newState } 
      })
    );
  };

  const menuItems = [
    { name: "Home", path: "/talentdashboard", icon: <FaHome size={20} /> },
  ];

  return (
    <aside 
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""} ${
        isMobile && !collapsed ? styles.mobileOpen : ""
      } ${isMobile ? styles.mobile : ""}`}
    >
      <div className={styles.sidebarContent}>
        {!isMobile && (
          <div className={styles.header}>
            {!collapsed && 
              <Link href="/" className={styles.brand}>
                <Image 
                  src={logo} 
                  alt="Logo" 
                  className={styles.logo}
                  width={40}
                  height={40}
                  priority
                />
                <span className={styles.brandName}>Payment</span>
              </Link>
            }
            <button 
              onClick={toggleSidebar} 
              className={styles.toggleButton}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <FaBars size={20} /> : <FaTimes size={20} />}
            </button>
          </div>
        )}
        
        <nav>
          <ul className={styles.menuList}>
            {menuItems.map((item) => (
              <li key={item.path} className={styles.menuItem}>
                <Link
                  href={item.path}
                  className={`${styles.link} ${
                    pathname === item.path ? styles.activeLink : ""
                  }`}
                  onClick={() => isMobile && toggleSidebar()}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  {!collapsed && <span className={styles.linkText}>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;