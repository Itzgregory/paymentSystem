import Link from 'next/link';
import styles from '../Header.module.css';

interface NavbarProps {
  user: any;
  handleLogout: () => void;
}

export const Navbar = ({ user, handleLogout }: NavbarProps) => (
  <div className={styles.desktopMenu}>
    <Link href="/" className={styles.menuItem}>Home</Link>
    {user ? (
      <>
        <Link href="/talentdashboard" className={`${styles.menuItem} global-button`}>
          Dashboard
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </>
    ) : (
      <>
        <Link href="/login" className={styles.menuItem}>Login</Link>
        <Link href="/register" className={styles.menuItem}>Register</Link>
      </>
    )}
  </div>
);