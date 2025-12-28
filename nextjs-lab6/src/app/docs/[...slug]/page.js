import Link from 'next/link';
import { docsSections } from '@/lib/data';
import styles from './page.module.css';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const path = slug?.join('/') || 'introduction';
  return {
    title: `${path} - Documentation | Next.js Lab 6`,
    description: `Documentation for ${path}`,
  };
}

export default async function DocsPage({ params }) {
  const { slug } = await params;
  const path = slug || ['introduction'];
  const currentPath = path.join('/');

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h3>Documentation</h3>
        <nav className={styles.nav}>
          <Link href="/docs/introduction" className={styles.navLink}>
            Introduction
          </Link>
          <div className={styles.navGroup}>
            <span className={styles.navGroupTitle}>Getting Started</span>
            <Link href="/docs/getting-started/installation" className={styles.navLink}>
              Installation
            </Link>
            <Link href="/docs/getting-started/project-structure" className={styles.navLink}>
              Project Structure
            </Link>
          </div>
          <div className={styles.navGroup}>
            <span className={styles.navGroupTitle}>Rendering</span>
            <Link href="/docs/rendering/csr" className={styles.navLink}>
              CSR
            </Link>
            <Link href="/docs/rendering/ssr" className={styles.navLink}>
              SSR
            </Link>
            <Link href="/docs/rendering/ssg" className={styles.navLink}>
              SSG
            </Link>
            <Link href="/docs/rendering/isr" className={styles.navLink}>
              ISR
            </Link>
          </div>
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.badges}>
            <span className="badge">Catch-All Route</span>
            <span className="badge ssg">SSG</span>
          </div>
          <div className={styles.breadcrumbs}>
            <Link href="/docs">docs</Link>
            {path.map((segment, index) => (
              <span key={index}>
                <span className={styles.separator}>/</span>
                <span>{segment}</span>
              </span>
            ))}
          </div>
          <h1>{path[path.length - 1].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h1>
        </header>

        <div className="glass-card" style={{ marginBottom: 'var(--space-xl)' }}>
          <h4 style={{ marginBottom: 'var(--space-sm)' }}>Catch-All Routes Explained</h4>
          <ul className={styles.infoList}>
            <li><strong>File:</strong> <code>app/docs/[...slug]/page.js</code></li>
            <li><strong>Current Path:</strong> <code>/docs/{currentPath}</code></li>
            <li><strong>Slug Array:</strong> <code>{JSON.stringify(path)}</code></li>
            <li>The <code>[...slug]</code> captures any number of path segments</li>
          </ul>
        </div>

        <section className={styles.content}>
          <h2>How Catch-All Routes Work</h2>
          <p>
            Catch-all routes use the <code>[...slug]</code> syntax to match any number of 
            path segments. This is perfect for documentation sites, nested categories, 
            or any content with variable depth.
          </p>

          <h3>Examples</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>URL</th>
                <th>Slug Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>/docs/introduction</code></td>
                <td><code>['introduction']</code></td>
              </tr>
              <tr>
                <td><code>/docs/getting-started/installation</code></td>
                <td><code>['getting-started', 'installation']</code></td>
              </tr>
              <tr>
                <td><code>/docs/a/b/c/d</code></td>
                <td><code>['a', 'b', 'c', 'd']</code></td>
              </tr>
            </tbody>
          </table>

          <h3>Optional Catch-All</h3>
          <p>
            Use <code>[[...slug]]</code> (double brackets) to also match the root path:
          </p>
          <ul>
            <li><code>[...slug]</code> - matches <code>/docs/a</code> but NOT <code>/docs</code></li>
            <li><code>[[...slug]]</code> - matches <code>/docs/a</code> AND <code>/docs</code></li>
          </ul>
        </section>

        <section className={styles.codeSection}>
          <h3>Code Example</h3>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.dot} style={{background: '#ff5f56'}}></span>
              <span className={styles.dot} style={{background: '#ffbd2e'}}></span>
              <span className={styles.dot} style={{background: '#27ca40'}}></span>
              <span className={styles.fileName}>app/docs/[...slug]/page.js</span>
            </div>
            <pre>
{`export default async function DocsPage({ params }) {
  const { slug } = await params;
  // slug = ['getting-started', 'installation']
  // for URL /docs/getting-started/installation
  
  const content = getDocContent(slug);
  
  return (
    <article>
      <h1>{content.title}</h1>
      <div>{content.body}</div>
    </article>
  );
}`}
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
}
