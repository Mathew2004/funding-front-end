import styles from '../../styles/Admin.module.css';

export default function Header({ title, toggleSidebar }) {
  return (
    <header className={styles.header}>
      <button className={styles.menuToggle} onClick={toggleSidebar}>
        ☰
      </button>
      <h1>{title}</h1>
      <div className={styles.headerActions}>
        <div className={styles.notificationBell}>🔔</div>
        <div className={styles.userProfile}>
          <span className={styles.userAvatar}>👤</span>
          <span className={styles.userName}>Admin User</span>
        </div>
      </div>
    </header>
  );
}