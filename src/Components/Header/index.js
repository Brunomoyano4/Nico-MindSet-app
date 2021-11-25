import styles from './header.module.css';

function Header() {
  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.appName}>
          Mind<span className={styles.nameColor}>SET</span>
        </div>
        <ul className={styles.routes}>
          <li>
            <a href="/admins">admins</a>
          </li>
          <li>
            <a href="/applications">applications</a>
          </li>
          <li>
            <a href="/clients">clients</a>
          </li>
          <li>
            <a href="/interviews">interviews</a>
          </li>
          <li>
            <a href="/positions">positions</a>
          </li>
          <li>
            <a href="/postulants">postulants</a>
          </li>
          <li>
            <a href="/profiles">profiles</a>
          </li>
          <li>
            <a href="/psychologists">psychologists</a>
          </li>
          <li>
            <a href="/sessions">sessions</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
