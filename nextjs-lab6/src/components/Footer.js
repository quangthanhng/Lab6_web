import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <span className={styles.logo}>Next.js Lab 6</span>
            <p className={styles.description}>
              Module 6: Advanced Next.js Framework Architecture and Application
            </p>
          </div>
          
          <div className={styles.section}>
            <h4>Rendering Strategies</h4>
            <ul>
              <li><span className="badge csr">CSR</span> Client-Side Rendering</li>
              <li><span className="badge ssr">SSR</span> Server-Side Rendering</li>
              <li><span className="badge ssg">SSG</span> Static Site Generation</li>
              <li><span className="badge isr">ISR</span> Incremental Static Regeneration</li>
            </ul>
          </div>
          
          <div className={styles.section}>
            <h4>Resources</h4>
            <ul>
              <li><a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">Next.js Docs</a></li>
              <li><a href="https://react.dev" target="_blank" rel="noopener noreferrer">React Docs</a></li>
              <li><a href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel</a></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>© 2024 Lab 6 - MSc. Tran Vinh Khiem</p>
        </div>
      </div>
    </footer>
  );
}
