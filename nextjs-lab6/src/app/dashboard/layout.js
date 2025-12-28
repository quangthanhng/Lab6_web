import Link from 'next/link';
import styles from './layout.module.css';

export const metadata = {
  title: 'Dashboard | Next.js Lab 6',
  description: 'Dashboard demonstrating Client-Side Rendering and nested layouts.',
};

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3>Dashboard</h3>
          <span className="badge csr">CSR</span>
        </div>
        <nav className={styles.nav}>
          <Link href="/dashboard" className={styles.navLink}>
            <span className={styles.navIcon}>H</span> Overview
          </Link>
          <Link href="/dashboard/settings" className={styles.navLink}>
            <span className={styles.navIcon}>S</span> Settings
          </Link>
        </nav>
        <div className={styles.sidebarInfo}>
          <h4>Nested Layout</h4>
          <p>This sidebar is defined in <code>dashboard/layout.js</code> and shared across all dashboard pages.</p>
        </div>
      </aside>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
