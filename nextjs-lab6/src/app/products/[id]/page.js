import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct, getAllProducts } from '@/lib/data';
import styles from './page.module.css';

// ISR for product detail pages
export const revalidate = 60;

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} | Next.js Lab 6`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  const generatedAt = new Date().toISOString();

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link href="/products">← Back to Products</Link>
      </div>

      <div className={styles.productLayout}>
        <div className={styles.productImage}>
          <span>{product.image}</span>
        </div>

        <div className={styles.productInfo}>
          <div className={styles.badges}>
            <span className="badge isr">ISR</span>
            <span className="badge">Dynamic Route</span>
          </div>

          <span className={styles.category}>{product.category}</span>
          <h1>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.priceRow}>
            <span className={styles.price}>${product.price}</span>
            <span className={styles.rating}>⭐ {product.rating} / 5.0</span>
          </div>

          <div className={styles.actions}>
            <button className="btn btn-primary">Add to Cart</button>
            <button className="btn btn-secondary">Save for Later</button>
          </div>
        </div>
      </div>

      <aside className="glass-card" style={{ marginTop: 'var(--space-2xl)' }}>
        <h3>🔄 ISR + Dynamic Route</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-sm)' }}>
          This page combines <strong>ISR</strong> with <strong>dynamic routes</strong>.
        </p>
        <ul className={styles.infoList}>
          <li><strong>File:</strong> <code>app/products/[id]/page.js</code></li>
          <li><strong>Current ID:</strong> <code>{id}</code></li>
          <li><strong>Revalidate:</strong> <code>60 seconds</code></li>
          <li><strong>Generated:</strong> <code>{generatedAt}</code></li>
        </ul>
      </aside>
    </div>
  );
}
