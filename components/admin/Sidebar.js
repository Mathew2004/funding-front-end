import Link from 'next/link';
import styles from '../../styles/Admin.module.css';

export default function Sidebar({ activeTab, setActiveTab, isOpen, onClose }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'donations', label: 'Donations', icon: '💰' },
    { id: 'donors', label: 'Donors', icon: '👥' },
    { id: 'reports', label: 'Reports', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className={`${styles.sidebarOverlay} ${isOpen ? styles.open : ''}`}
          onClick={onClose}
        />
      )}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <div className={styles.sidebarHeader}>
          <h2>Admin Panel</h2>
          <button className={styles.mobileCloseBtn} onClick={onClose}>×</button>
        </div>
        <nav className={styles.sidebarNav}>
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link 
                  href={`/admin/${item.id === 'dashboard' ? '' : item.id}`}
                  className={`${styles.navLink} ${activeTab === item.id ? styles.active : ''}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose();
                  }}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navText}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.sidebarFooter}>
          <Link href="/admin/logout" className={styles.logoutLink}>
            <span className={styles.navIcon}>🚪</span>
            <span className={styles.navText}>Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
}