import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export const useScrollVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < lastScrollY || window.scrollY < 100);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return isVisible;
};

export const useDashboardCheck = () => {
  const pathname = usePathname();
  return pathname?.startsWith('/admin') || pathname?.startsWith('/talentdashboard');
};