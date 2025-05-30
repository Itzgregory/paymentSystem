import { X } from 'lucide-react';
import Link from 'next/link';
import { LogoBrand } from "../components/logoBrand";
import styles from '../Header.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  user: any;
  handleLogout: () => void;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, user, handleLogout, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.sideMenu}>
        <div className={styles.sideMenuHeader}>
          <LogoBrand />
          <button className={styles.closeButton} onClick={onClose} aria-label="Close menu">
            <X size={28} />
          </button>
        </div>
        <div className={styles.sideMenuItems}>
          <Link href="/" className={styles.sideMenuItem} onClick={onClose}>Home</Link>
          <Link href="/clients" className={styles.sideMenuItem} onClick={onClose}>Clients</Link>
          <Link href="/talents" className={styles.sideMenuItem} onClick={onClose}>Talents</Link>
          {user ? (
            <>
              <Link href="/talentdashboard" className={styles.sideMenuItem} onClick={onClose}>
                Dashboard
              </Link>
              <button onClick={() => { handleLogout(); onClose(); }} className={styles.sideMenuItem}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.sideMenuItem} onClick={onClose}>Login</Link>
              <Link href="/register" className={styles.sideMenuItem} onClick={onClose}>Register</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};