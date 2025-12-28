import Link from 'next/link';
import styles from './page.module.css';

const renderingStrategies = [
  {
    title: 'Client-Side Rendering (CSR)',
    badge: 'csr',
    description: 'JavaScript renders content in the browser. Fast TTFB but delayed FCP. Ideal for dashboards and private apps.',
    href: '/dashboard',
    icon: '[C]',
  },
  {
    title: 'Server-Side Rendering (SSR)',
    badge: 'ssr',
    description: 'Server renders HTML on each request. Great SEO and immediate content visibility. Higher server load.',
    href: '/legacy/ssr',
    icon: '[S]',
  },
  {
    title: 'Static Site Generation (SSG)',
    badge: 'ssg',
    description: 'HTML generated at build time. Fastest performance, perfect for blogs and documentation.',
    href: '/blog',
    icon: '[G]',
  },
  {
    title: 'Incremental Static Regeneration (ISR)',
    badge: 'isr',
    description: 'Static pages that update in the background. Best of both SSG and SSR worlds.',
    href: '/products',
    icon: '[R]',
  },
];

const routingFeatures = [
  {
    title: 'Dynamic Routes',
    description: 'Routes with [param] segments for dynamic content',
    href: '/blog/hello-world',
    code: 'app/blog/[slug]/page.js',
  },
  {
    title: 'Catch-All Routes',
    description: 'Handle multiple path segments with [...slug]',
    href: '/docs/getting-started/installation',
    code: 'app/docs/[...slug]/page.js',
  },
  {
    title: 'Route Groups',
    description: 'Organize routes without affecting URL structure',
    href: '/about',
    code: 'app/(marketing)/about/page.js',
  },
  {
    title: 'Nested Layouts',
    description: 'Share UI across route segments with layout.js',
    href: '/dashboard/settings',
    code: 'app/dashboard/layout.js',
  },
];

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className="badge">Module 6</span>
          <h1>
            Advanced <span className="gradient-text">Next.js</span> Framework
          </h1>
          <p className={styles.heroDescription}>
            Explore rendering strategies, file-based routing, data fetching, and the App Router architecture 
            through interactive demos and practical examples.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/blog" className="btn btn-primary">
              Explore Demos →
            </Link>
            <Link href="/docs/introduction" className="btn btn-secondary">
              Read Documentation
            </Link>
          </div>
        </div>
        
        <div className={styles.heroVisual}>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.dot} style={{background: '#ff5f56'}}></span>
              <span className={styles.dot} style={{background: '#ffbd2e'}}></span>
              <span className={styles.dot} style={{background: '#27ca40'}}></span>
              <span className={styles.fileName}>page.js</span>
            </div>
            <pre className={styles.code}>
{`// Server Component (default)
export default async function Page() {
  const data = await fetchData();
  
  return (
    <div>
      <h1>{data.title}</h1>
      <ClientCounter />
    </div>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Rendering Strategies Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Rendering Strategies</h2>
          <p>Next.js supports multiple rendering strategies. Choose the right one for each use case.</p>
        </div>
        
        <div className={styles.grid}>
          {renderingStrategies.map((strategy) => (
            <Link 
              key={strategy.title} 
              href={strategy.href}
              className={`glass-card ${styles.strategyCard}`}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>{strategy.icon}</span>
                <span className={`badge ${strategy.badge}`}>{strategy.badge.toUpperCase()}</span>
              </div>
              <h3>{strategy.title}</h3>
              <p>{strategy.description}</p>
              <span className={styles.cardLink}>View Demo →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Routing Features Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>File-Based Routing</h2>
          <p>The filesystem is your API. Create routes by adding files to the app directory.</p>
        </div>
        
        <div className={styles.grid}>
          {routingFeatures.map((feature) => (
            <Link 
              key={feature.title} 
              href={feature.href}
              className={`glass-card ${styles.featureCard}`}
            >
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
              <code className={styles.featureCode}>{feature.code}</code>
            </Link>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Strategy Comparison</h2>
          <p>Understanding when to use each rendering strategy is crucial for optimal performance.</p>
        </div>
        
        <div className="glass-card">
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Feature</th>
                <th><span className="badge csr">CSR</span></th>
                <th><span className="badge ssr">SSR</span></th>
                <th><span className="badge ssg">SSG</span></th>
                <th><span className="badge isr">ISR</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Render Timing</td>
                <td>Browser</td>
                <td>Server (per request)</td>
                <td>Build time</td>
                <td>Build + Background</td>
              </tr>
              <tr>
                <td>SEO Quality</td>
                <td>❌ Low</td>
                <td>✅ High</td>
                <td>✅ High</td>
                <td>✅ High</td>
              </tr>
              <tr>
                <td>Server Load</td>
                <td>✅ Minimal</td>
                <td>High</td>
                <td>✅ Negligible</td>
                <td>✅ Low</td>
              </tr>
              <tr>
                <td>Data Freshness</td>
                <td>✅ Real-time</td>
                <td>✅ Fresh</td>
                <td>❌ Stale</td>
                <td>Near-fresh</td>
              </tr>
              <tr>
                <td>Best For</td>
                <td>Dashboards</td>
                <td>Personalized</td>
                <td>Blogs, Docs</td>
                <td>E-commerce</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
