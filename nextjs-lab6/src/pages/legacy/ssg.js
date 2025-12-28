import Link from 'next/link';
import styles from './legacy.module.css';

export async function getStaticProps() {
  const buildTime = new Date().toISOString();
  
  const posts = [
    { id: 1, title: 'Understanding Next.js', views: 1234 },
    { id: 2, title: 'React Server Components', views: 987 },
    { id: 3, title: 'File-Based Routing', views: 756 },
  ];

  return {
    props: {
      buildTime,
      posts,
    }
  };
}

export default function SSGPage({ buildTime, posts }) {
  const currentTime = new Date().toISOString();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.badges}>
          <span className="badge ssg">SSG</span>
          <span className="badge">Pages Router</span>
          <span className="badge">getStaticProps</span>
        </div>
        <h1>Static Site Generation Demo</h1>
        <p className={styles.description}>
          This page was pre-rendered at <strong>build time</strong> using 
          <code>getStaticProps</code>. The content never changes until next build.
        </p>
      </header>

      <div className={`glass-card ${styles.infoCard}`}>
        <h4>SSG Characteristics</h4>
        <ul className={styles.infoList}>
          <li>+ Fastest possible load (served from CDN)</li>
          <li>+ Perfect SEO</li>
          <li>+ Zero server load at runtime</li>
          <li>+ Highly cacheable</li>
          <li>- Content is static until next build</li>
        </ul>
      </div>

      <div className={`glass-card ${styles.dataCard}`}>
        <h3>Time Comparison</h3>
        <p className={styles.hint}>Notice how build time stays the same but current time changes!</p>
        
        <div className={styles.dataGrid}>
          <div className={styles.dataItem}>
            <span className={styles.dataLabel}>Build Time (Static)</span>
            <code className={styles.dataValue}>{buildTime}</code>
          </div>
          <div className={styles.dataItem}>
            <span className={styles.dataLabel}>Current Time (Dynamic)</span>
            <code className={styles.dataValue}>{currentTime}</code>
          </div>
        </div>
      </div>

      <div className={`glass-card ${styles.dataCard}`}>
        <h3>Static Posts (fetched at build)</h3>
        <div className={styles.dataGrid}>
          {posts.map(post => (
            <div key={post.id} className={styles.dataItem}>
              <span className={styles.dataLabel}>Post #{post.id}</span>
              <code className={styles.dataValue}>{post.title} ({post.views} views)</code>
            </div>
          ))}
        </div>
      </div>

      <section className={styles.codeSection}>
        <h3>How It Works</h3>
        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.dot} style={{background: '#ff5f56'}}></span>
            <span className={styles.dot} style={{background: '#ffbd2e'}}></span>
            <span className={styles.dot} style={{background: '#27ca40'}}></span>
            <span className={styles.fileName}>pages/legacy/ssg.js</span>
          </div>
          <pre>
{`// This function runs at BUILD TIME only
export async function getStaticProps() {
  // Fetch data from CMS, database, or API
  const posts = await fetchAllPosts();
  
  return {
    props: {
      posts,
      buildTime: new Date().toISOString()
    }
    // Add revalidate for ISR:
    // revalidate: 60
  };
}

export default function Page({ posts, buildTime }) {
  // This data was fetched at build time
  // It won't change until next build
  return <div>Built at: {buildTime}</div>;
}`}
          </pre>
        </div>
      </section>

      <div className={styles.nav}>
        <Link href="/legacy/ssr" className="btn btn-secondary">
          View SSR Demo
        </Link>
        <Link href="/legacy/isr" className="btn btn-secondary">
          View ISR Demo
        </Link>
      </div>
    </div>
  );
}
