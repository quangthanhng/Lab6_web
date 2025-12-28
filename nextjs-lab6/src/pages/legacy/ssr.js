import Link from 'next/link';
import styles from './legacy.module.css';

export async function getServerSideProps(context) {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const data = {
    serverTime: new Date().toISOString(),
    userAgent: context.req.headers['user-agent'] || 'Unknown',
    method: context.req.method,
    url: context.req.url,
    cookies: Object.keys(context.req.cookies || {}).length,
  };

  return {
    props: { data }
  };
}

export default function SSRPage({ data }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.badges}>
          <span className="badge ssr">SSR</span>
          <span className="badge">Pages Router</span>
          <span className="badge">getServerSideProps</span>
        </div>
        <h1>Server-Side Rendering Demo</h1>
        <p className={styles.description}>
          This page is rendered on the server <strong>on every request</strong> using 
          <code>getServerSideProps</code> from the Pages Router.
        </p>
      </header>

      <div className={`glass-card ${styles.infoCard}`}>
        <h4>SSR Characteristics</h4>
        <ul className={styles.infoList}>
          <li>+ Fresh data on every request</li>
          <li>+ Access to request object (cookies, headers)</li>
          <li>+ SEO-friendly (full HTML sent to client)</li>
          <li>- Slower TTFB (server processing required)</li>
          <li>- Higher server load under traffic</li>
        </ul>
      </div>

      <div className={`glass-card ${styles.dataCard}`}>
        <h3>Request Data (from server)</h3>
        <p className={styles.hint}>Refresh the page to see new data!</p>
        
        <div className={styles.dataGrid}>
          <div className={styles.dataItem}>
            <span className={styles.dataLabel}>Server Time</span>
            <code className={styles.dataValue}>{data.serverTime}</code>
          </div>
          <div className={styles.dataItem}>
            <span className={styles.dataLabel}>Request Method</span>
            <code className={styles.dataValue}>{data.method}</code>
          </div>
          <div className={styles.dataItem}>
            <span className={styles.dataLabel}>Request URL</span>
            <code className={styles.dataValue}>{data.url}</code>
          </div>
          <div className={styles.dataItem}>
            <span className={styles.dataLabel}>User Agent</span>
            <code className={styles.dataValue}>{data.userAgent.substring(0, 50)}...</code>
          </div>
          <div className={styles.dataItem}>
            <span className={styles.dataLabel}>Cookies Count</span>
            <code className={styles.dataValue}>{data.cookies}</code>
          </div>
        </div>
      </div>

      <section className={styles.codeSection}>
        <h3>How It Works</h3>
        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.dot} style={{background: '#ff5f56'}}></span>
            <span className={styles.dot} style={{background: '#ffbd2e'}}></span>
            <span className={styles.dot} style={{background: '#27ca40'}}></span>
            <span className={styles.fileName}>pages/legacy/ssr.js</span>
          </div>
          <pre>
{`// This function runs on EVERY request
export async function getServerSideProps(context) {
  // Access request object
  const userAgent = context.req.headers['user-agent'];
  
  // Fetch data from database/API
  const data = await fetchLatestData();
  
  return {
    props: { data, userAgent }
    // You can also return:
    // notFound: true     - returns 404
    // redirect: { destination: '/login' }
  };
}

export default function Page({ data, userAgent }) {
  // This data was fetched on the server
  return <div>{data.message}</div>;
}`}
          </pre>
        </div>
      </section>

      <div className={styles.nav}>
        <Link href="/legacy/ssg" className="btn btn-secondary">
          View SSG Demo
        </Link>
        <Link href="/legacy/isr" className="btn btn-secondary">
          View ISR Demo
        </Link>
      </div>
    </div>
  );
}
