'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

async function fetchDashboardData() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    visitors: Math.floor(Math.random() * 10000) + 5000,
    pageViews: Math.floor(Math.random() * 50000) + 20000,
    bounceRate: (Math.random() * 30 + 20).toFixed(1),
    avgSession: (Math.random() * 5 + 2).toFixed(1),
    recentActivity: [
      { id: 1, action: 'User signed up', time: '2 min ago', icon: 'U' },
      { id: 2, action: 'New order placed', time: '5 min ago', icon: 'O' },
      { id: 3, action: 'Comment added', time: '12 min ago', icon: 'C' },
      { id: 4, action: 'Page published', time: '25 min ago', icon: 'P' },
      { id: 5, action: 'Settings updated', time: '1 hour ago', icon: 'S' },
    ],
  };
}

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState(null);

  useEffect(() => {
    fetchDashboardData().then(result => {
      setData(result);
      setLoading(false);
      setLastFetched(new Date().toISOString());
    });
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchDashboardData().then(result => {
      setData(result);
      setLoading(false);
      setLastFetched(new Date().toISOString());
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <div className={styles.badges}>
            <span className="badge csr">CSR</span>
            <span className="badge">Client Component</span>
          </div>
          <h1>Dashboard Overview</h1>
          <p className={styles.description}>
            This page uses <strong>Client-Side Rendering</strong>. Data is fetched in the browser using <code>useEffect</code>.
          </p>
        </div>
        <button onClick={handleRefresh} className="btn btn-primary" disabled={loading}>
          {loading ? 'Loading...' : 'Refresh Data'}
        </button>
      </header>

      <div className="glass-card" style={{ marginBottom: 'var(--space-xl)' }}>
        <h4 style={{ marginBottom: 'var(--space-sm)' }}>CSR Characteristics</h4>
        <ul className={styles.infoList}>
          <li>+ Rich interactivity with React hooks</li>
          <li>+ Real-time data updates</li>
          <li>+ Minimal server load</li>
          <li>- SEO challenges (empty initial HTML)</li>
          <li>- Loading state visible to users</li>
        </ul>
        {lastFetched && (
          <p style={{ marginTop: 'var(--space-sm)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Last fetched: <code>{lastFetched}</code>
          </p>
        )}
      </div>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Fetching data from API...</p>
        </div>
      ) : (
        <>
          <div className={styles.statsGrid}>
            <div className={`glass-card ${styles.statCard}`}>
              <span className={styles.statIcon}>V</span>
              <div>
                <h3>{data.visitors.toLocaleString()}</h3>
                <p>Visitors Today</p>
              </div>
            </div>
            <div className={`glass-card ${styles.statCard}`}>
              <span className={styles.statIcon}>P</span>
              <div>
                <h3>{data.pageViews.toLocaleString()}</h3>
                <p>Page Views</p>
              </div>
            </div>
            <div className={`glass-card ${styles.statCard}`}>
              <span className={styles.statIcon}>B</span>
              <div>
                <h3>{data.bounceRate}%</h3>
                <p>Bounce Rate</p>
              </div>
            </div>
            <div className={`glass-card ${styles.statCard}`}>
              <span className={styles.statIcon}>T</span>
              <div>
                <h3>{data.avgSession} min</h3>
                <p>Avg. Session</p>
              </div>
            </div>
          </div>

          <div className={`glass-card ${styles.activityCard}`}>
            <h3>Recent Activity</h3>
            <ul className={styles.activityList}>
              {data.recentActivity.map(item => (
                <li key={item.id} className={styles.activityItem}>
                  <span className={styles.activityIcon}>{item.icon}</span>
                  <span className={styles.activityText}>{item.action}</span>
                  <span className={styles.activityTime}>{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <section className={styles.codeSection}>
        <h3>How It Works</h3>
        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.dot} style={{background: '#ff5f56'}}></span>
            <span className={styles.dot} style={{background: '#ffbd2e'}}></span>
            <span className={styles.dot} style={{background: '#27ca40'}}></span>
            <span className={styles.fileName}>app/dashboard/page.js (Client Component)</span>
          </div>
          <pre>
{`'use client'; // Required directive for Client Components

import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Data fetching happens in the browser
    fetchDashboardData().then(result => {
      setData(result);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingSpinner />;
  return <DashboardUI data={data} />;
}`}
          </pre>
        </div>
      </section>
    </div>
  );
}
