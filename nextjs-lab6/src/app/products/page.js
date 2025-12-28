import Link from 'next/link';
import { getAllProducts } from '@/lib/data';
import styles from './page.module.css';

export const revalidate = 60;

export const metadata = {
  title: 'Products - ISR Demo | Next.js Lab 6',
  description: 'This page demonstrates Incremental Static Regeneration (ISR) - static pages that update in the background.',
};

export default function ProductsPage() {
  const products = getAllProducts();
  const generatedAt = new Date().toISOString();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.badges}>
          <span className="badge isr">ISR</span>
          <span className="badge">Incremental Static Regeneration</span>
        </div>
        <h1>Products</h1>
        <p className={styles.description}>
          This page uses <strong>ISR with revalidate: 60</strong>. 
          It is static but regenerates in the background every 60 seconds.
        </p>
        
        <div className="glass-card" style={{ marginTop: 'var(--space-lg)', padding: 'var(--space-md)' }}>
          <h4 style={{ marginBottom: 'var(--space-sm)' }}>ISR Characteristics</h4>
          <ul className={styles.infoList}>
            <li>+ Fast initial load (static HTML from cache)</li>
            <li>+ Background regeneration keeps content fresh</li>
            <li>+ Perfect for e-commerce, news sites</li>
            <li>+ Stale-while-revalidate pattern</li>
          </ul>
          <div className={styles.timestamp}>
            <span>Generated at:</span>
            <code>{generatedAt}</code>
            <span className={styles.hint}>Refresh after 60s to see new timestamp</span>
          </div>
        </div>
      </header>

      <section className={styles.productsGrid}>
        {products.map((product, index) => (
          <Link 
            key={product.id} 
            href={`/products/${product.id}`}
            className={`glass-card ${styles.productCard}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={styles.productImage}>{product.image}</div>
            <div className={styles.productContent}>
              <span className={styles.productCategory}>{product.category}</span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className={styles.productFooter}>
                <span className={styles.price}>${product.price}</span>
                <span className={styles.rating}>Rating: {product.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className={styles.codeSection}>
        <h3>How ISR Works</h3>
        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.dot} style={{background: '#ff5f56'}}></span>
            <span className={styles.dot} style={{background: '#ffbd2e'}}></span>
            <span className={styles.dot} style={{background: '#27ca40'}}></span>
            <span className={styles.fileName}>app/products/page.js</span>
          </div>
          <pre>
{`// Set revalidation period (in seconds)
export const revalidate = 60;

export default function ProductsPage() {
  const products = getAllProducts();
  const generatedAt = new Date().toISOString();
  
  // This timestamp changes after revalidation
  return <div>Generated: {generatedAt}</div>;
}

// ISR Flow:
// 1. User A visits -> serves cached page
// 2. After 60s, User B visits -> serves stale, triggers rebuild
// 3. Background: page regenerates with fresh data
// 4. User C visits -> gets the new version`}
          </pre>
        </div>
      </section>
    </div>
  );
}
