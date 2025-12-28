'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    autoSave: false,
    language: 'en',
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.badges}>
          <span className="badge csr">CSR</span>
          <span className="badge">Nested Route</span>
        </div>
        <h1>Settings</h1>
        <p className={styles.description}>
          Demonstrating <strong>nested routing</strong> within the dashboard layout.
        </p>
      </header>

      <div className="glass-card" style={{ marginBottom: 'var(--space-xl)' }}>
        <h4 style={{ marginBottom: 'var(--space-sm)' }}>Nested Route Structure</h4>
        <ul className={styles.infoList}>
          <li><strong>URL:</strong> <code>/dashboard/settings</code></li>
          <li><strong>File:</strong> <code>app/dashboard/settings/page.js</code></li>
          <li><strong>Layout:</strong> Inherits from <code>app/dashboard/layout.js</code></li>
          <li>The sidebar persists because it is in the parent layout</li>
        </ul>
      </div>

      <div className={`glass-card ${styles.settingsCard}`}>
        <h3>Preferences</h3>
        
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <h4>Notifications</h4>
            <p>Receive email notifications for updates</p>
          </div>
          <button 
            onClick={() => handleToggle('notifications')}
            className={`${styles.toggle} ${settings.notifications ? styles.active : ''}`}
          >
            <span className={styles.toggleCircle}></span>
          </button>
        </div>

        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <h4>Dark Mode</h4>
            <p>Use dark theme throughout the app</p>
          </div>
          <button 
            onClick={() => handleToggle('darkMode')}
            className={`${styles.toggle} ${settings.darkMode ? styles.active : ''}`}
          >
            <span className={styles.toggleCircle}></span>
          </button>
        </div>

        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <h4>Auto-Save</h4>
            <p>Automatically save changes</p>
          </div>
          <button 
            onClick={() => handleToggle('autoSave')}
            className={`${styles.toggle} ${settings.autoSave ? styles.active : ''}`}
          >
            <span className={styles.toggleCircle}></span>
          </button>
        </div>

        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <h4>Language</h4>
            <p>Select your preferred language</p>
          </div>
          <select 
            value={settings.language}
            onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
            className={styles.select}
          >
            <option value="en">English</option>
            <option value="vi">Tiếng Việt</option>
            <option value="ja">Japanese</option>
          </select>
        </div>
      </div>

      <section className={styles.codeSection}>
        <h3>Nested Routes Explained</h3>
        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.dot} style={{background: '#ff5f56'}}></span>
            <span className={styles.dot} style={{background: '#ffbd2e'}}></span>
            <span className={styles.dot} style={{background: '#27ca40'}}></span>
            <span className={styles.fileName}>File Structure</span>
          </div>
          <pre>
{`app/
├── dashboard/
│   ├── layout.js      <- Shared layout (sidebar)
│   ├── page.js        <- /dashboard
│   └── settings/
│       └── page.js    <- /dashboard/settings
                           (inherits layout.js)

// Layout wraps all child routes automatically
// State in layout persists across navigation`}
          </pre>
        </div>
      </section>
    </div>
  );
}
