import Link from 'next/link';
import styles from './legacy.module.css';

export async function getStaticProps() {
  const generatedAt = new Date().toISOString();
  
  const products = [
    { id: 1, name: 'Next.js Pro', price: 99, stock: Math.floor(Math.random() * 100) + 1 },
    { id: 2, name: 'React Mastery', price: 79, stock: Math.floor(Math.random() * 100) + 1 },
    { id: 3, name: 'TypeScript Guide', price: 59, stock: Math.floor(Math.random() * 100) + 1 },
  ];

  return {
    props: {
      generatedAt,
      products,
    },
    revalidate: 30,
  };
}

export default function ISRPage({ generatedAt, products }) {
  const currentTime = new Date().toISOString();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.badges}>
          <span className="badge isr">ISR</span>
          <span className="badge">Pages Router</span>
          <span className="badge">revalidate: 30</span>
        </div>
        <h1>Incremental Static Regeneration Demo</h1>
        <p className={styles.description}>
          This page uses ISR with <code>revalidate: 30</code>. It is static but regenerates 
          in the background every 30 seconds.
        </p>
      </header>

      <div className={`glass-card ${styles.infoCard}`}>
        <h4>ISR Characteristics</h4>
        <ul className={styles.infoList}>
          <li>+ Fast initial load (cached static page)</li>
          <li>+ Automatic background regeneration</li>
          <li>+ Stale-while-revalidate pattern</li>
          <li>+ Best of both SSG and SSR</li>
          <li>+ On-demand revalidation via API</li>
        </ul>
      </div>

      <div className={`glass-card ${styles.dataCard}`}>
        <h3>ISR in Action</h3>
        <p className={styles.hint}>
          Wait 30 seconds and refresh to see new stock values!
        </p>
        
        <div className={styles.dataGrid}>
          <div className={styles.dataItem}>
            <span className={styles.dataLabel}>Page Generated At</span>
            <code className={styles.dataValue}>{generatedAt}</code>
          </div>
          <div className={styles.dataItem}>
            <span className={styles.dataLabel}>Current Time</span>
            <code className={styles.dataValue}>{currentTime}</code>
          </div>
          <div className={styles.dataItem}>
            <span className={styles.dataLabel}>Revalidate Period</span>
            <code className={styles.dataValue}>30 seconds</code>
          </div>
        </div>
      </div>

      <div className={`glass-card ${styles.dataCard}`}>
        <h3>Products (regenerated with ISR)</h3>
        <p className={styles.hint}>Stock levels update after revalidation</p>
        <div className={styles.dataGrid}>
          {products.map(product => (
            <div key={product.id} className={styles.dataItem}>
              <span className={styles.dataLabel}>{product.name} - ${product.price}</span>
              <code className={styles.dataValue}>Stock: {product.stock} units</code>
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
            <span className={styles.fileName}>pages/legacy/isr.js</span>
          </div>
          <pre>
{`export async function getStaticProps() {
  const products = await fetchProducts();
  
  return {
    props: { products },
    revalidate: 30, // <-- ISR magic!
  };
}

// ISR Flow:
// T=0s:   User A visits -> cached page served
// T=20s:  User B visits -> cached page served
// T=35s:  User C visits -> stale page served
//         Background regeneration triggered
// T=40s:  User D visits -> NEW page served`}
          </pre>
        </div>
      </section>

      <div className={styles.nav}>
        <Link href="/legacy/ssg" className="btn btn-secondary">
          View SSG Demo
        </Link>
        <Link href="/legacy/ssr" className="btn btn-secondary">
          View SSR Demo
        </Link>
      </div>
    </div>
  );
}
