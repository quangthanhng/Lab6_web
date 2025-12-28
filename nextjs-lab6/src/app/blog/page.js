import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/data';
import styles from './page.module.css';

export const metadata = {
  title: 'Blog - Static Site Generation Demo | Next.js Lab 6',
  description: 'This page demonstrates Static Site Generation (SSG) - content is pre-rendered at build time.',
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const buildTime = new Date().toISOString();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.badges}>
          <span className="badge ssg">SSG</span>
          <span className="badge">Static Site Generation</span>
        </div>
        <h1>Blog</h1>
        <p className={styles.description}>
          This page is statically generated at <strong>build time</strong>. 
          The HTML is created once during <code>next build</code> and served from CDN.
        </p>
        
        <div className="glass-card" style={{ marginTop: 'var(--space-lg)', padding: 'var(--space-md)' }}>
          <h4 style={{ marginBottom: 'var(--space-sm)' }}>SSG Characteristics</h4>
          <ul className={styles.infoList}>
            <li>+ Fastest possible load time (served from CDN)</li>
            <li>+ Perfect SEO - full HTML available to crawlers</li>
            <li>+ Low server load - no runtime computation</li>
            <li>- Content is static until next build</li>
          </ul>
          <p style={{ marginTop: 'var(--space-sm)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Generated at: <code>{buildTime}</code>
          </p>
        </div>
      </header>

      <section className={styles.postsGrid}>
        {posts.map((post, index) => (
          <Link 
            key={post.slug} 
            href={`/blog/${post.slug}`}
            className={`glass-card ${styles.postCard}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={styles.postMeta}>
              <span className={styles.category}>{post.category}</span>
              <span className={styles.readTime}>{post.readTime}</span>
            </div>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <div className={styles.postFooter}>
              <span className={styles.author}>{post.author}</span>
              <span className={styles.date}>{post.date}</span>
            </div>
          </Link>
        ))}
      </section>

      <section className={styles.codeSection}>
        <h3>How It Works</h3>
        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.dot} style={{background: '#ff5f56'}}></span>
            <span className={styles.dot} style={{background: '#ffbd2e'}}></span>
            <span className={styles.dot} style={{background: '#27ca40'}}></span>
            <span className={styles.fileName}>app/blog/page.js (Server Component)</span>
          </div>
          <pre>
{`// Server Components are rendered at BUILD TIME for static routes
import { getAllBlogPosts } from '@/lib/data';

export default function BlogPage() {
  // This runs at build time, not on each request
  const posts = getAllBlogPosts();
  
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}`}
          </pre>
        </div>
      </section>
    </div>
  );
}
