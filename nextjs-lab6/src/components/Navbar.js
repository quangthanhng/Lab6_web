'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog (SSG)' },
  { href: '/products', label: 'Products (ISR)' },
  { href: '/dashboard', label: 'Dashboard (CSR)' },
  { href: '/about', label: 'About' },
  { href: '/docs/introduction', label: 'Docs' },
  { href: '/legacy/ssr', label: 'Legacy SSR' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>NX</span>
          <span className={styles.logoText}>Next.js Lab 6</span>
        </Link>
        
        <div className={styles.links}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${pathname === link.href ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
