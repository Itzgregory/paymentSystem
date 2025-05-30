import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/asset/logo.png';
import styles from '../Header.module.css';

export const LogoBrand = () => (
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
);