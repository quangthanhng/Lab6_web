import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost, getAllBlogPosts } from '@/lib/data';
import styles from './page.module.css';

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | Next.js Lab 6`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link href="/blog">Back to Blog</Link>
      </div>

      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.badges}>
            <span className="badge ssg">SSG</span>
            <span className="badge">Dynamic Route</span>
            <span className={styles.category}>{post.category}</span>
          </div>
          <h1>{post.title}</h1>
          <div className={styles.meta}>
            <span>{post.author}</span>
            <span>|</span>
            <span>{post.date}</span>
            <span>|</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className={styles.content}>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <div 
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>').replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/## (.*)/g, '<h2>$1</h2>').replace(/# (.*)/g, '<h1>$1</h1>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
          />
        </div>
      </article>

      <aside className="glass-card" style={{ marginTop: 'var(--space-2xl)' }}>
        <h3>Dynamic Route Information</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-sm)' }}>
          This page uses a <strong>dynamic route</strong> with <code>[slug]</code> segment.
        </p>
        <ul className={styles.infoList}>
          <li><strong>File:</strong> <code>app/blog/[slug]/page.js</code></li>
          <li><strong>Current slug:</strong> <code>{slug}</code></li>
          <li><strong>Method:</strong> <code>generateStaticParams()</code></li>
          <li><strong>Rendering:</strong> Static at build time for known slugs</li>
        </ul>
        
        <div className={styles.codeSnippet}>
          <pre>
{`// Generate all paths at build time
export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug, // matches [slug]
  }));
}`}
          </pre>
        </div>
      </aside>
    </div>
  );
}
