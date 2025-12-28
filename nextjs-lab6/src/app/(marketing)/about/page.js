import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'About Us | Next.js Lab 6',
  description: 'Learn about the Next.js Lab 6 project - demonstrating Route Groups.',
};

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.badges}>
          <span className="badge">Route Group</span>
          <span className="badge ssg">SSG</span>
        </div>
        <h1>About <span className="gradient-text">Next.js Lab 6</span></h1>
        <p className={styles.description}>
          This page demonstrates <strong>Route Groups</strong> — organizing files without affecting URLs.
        </p>
      </header>

      <div className="glass-card" style={{ marginBottom: 'var(--space-xl)' }}>
        <h4 style={{ marginBottom: 'var(--space-sm)' }}>Route Groups Explained</h4>
        <ul className={styles.infoList}>
          <li><strong>File Location:</strong> <code>app/(marketing)/about/page.js</code></li>
          <li><strong>URL Path:</strong> <code>/about</code> (not <code>/(marketing)/about</code>)</li>
          <li>Parentheses <code>()</code> in folder names are excluded from URLs</li>
          <li>Useful for organizing code by feature, team, or layout type</li>
        </ul>
      </div>

      <section className={styles.content}>
        <div className={`glass-card ${styles.card}`}>
          <span className={styles.icon}>[P]</span>
          <h3>Purpose</h3>
          <p>
            This project demonstrates all key concepts from Module 6: Advanced Next.js Framework 
            Architecture and Application, including rendering strategies, routing, and data fetching.
          </p>
        </div>

        <div className={`glass-card ${styles.card}`}>
          <span className={styles.icon}>[L]</span>
          <h3>What You Will Learn</h3>
          <ul>
            <li>Client-Side Rendering (CSR)</li>
            <li>Server-Side Rendering (SSR)</li>
            <li>Static Site Generation (SSG)</li>
            <li>Incremental Static Regeneration (ISR)</li>
            <li>File-Based Routing</li>
            <li>App Router Architecture</li>
          </ul>
        </div>

        <div className={`glass-card ${styles.card}`}>
          <span className={styles.icon}>[T]</span>
          <h3>Technologies</h3>
          <ul>
            <li>Next.js 14 (App Router)</li>
            <li>React 18</li>
            <li>CSS Modules</li>
            <li>Server and Client Components</li>
          </ul>
        </div>
      </section>

      <section className={styles.useCases}>
        <h2>Route Groups Use Cases</h2>
        <div className={styles.useCaseGrid}>
          <div className="glass-card">
            <h4>Multiple Layouts</h4>
            <pre>
{`app/
├── (marketing)/
│   ├── layout.js    <- Marketing layout
│   ├── about/
│   └── contact/
├── (shop)/
│   ├── layout.js    <- Shop layout
│   ├── products/
│   └── cart/`}
            </pre>
          </div>
          <div className="glass-card">
            <h4>Team Organization</h4>
            <pre>
{`app/
├── (team-a)/
│   ├── feature-1/
│   └── feature-2/
├── (team-b)/
│   ├── feature-3/
│   └── feature-4/`}
            </pre>
          </div>
        </div>
      </section>

      <div className={styles.cta}>
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
        <Link href="/docs/introduction" className="btn btn-secondary">
          Read Documentation
        </Link>
      </div>
    </div>
  );
}
