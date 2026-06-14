'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './nav.module.css';

const links = [
  { href: '/', label: 'Trang chủ' },
  { href: '/about', label: 'Giới thiệu' },
  { href: '/products', label: 'Sản phẩm' },
  { href: '/contact', label: 'Liên hệ' },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={pathname === link.href ? styles.active : styles.link}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
