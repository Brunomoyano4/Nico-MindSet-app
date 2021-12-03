import styles from './header.module.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.appName}>
          Mind<span className={styles.nameColor}>SET</span>
        </div>
        <ul className={styles.routes}>
          <li>
            <Link to="/admins">admins</Link>
          </li>
          <li>
            <Link to="/applications">applications</Link>
          </li>
          <li>
            <Link to="/clients">clients</Link>
          </li>
          <li>
            <Link to="/interviews">interviews</Link>
          </li>
          <li>
            <Link to="/positions">positions</Link>
          </li>
          <li>
            <Link to="/postulants">postulants</Link>
          </li>
          <li>
            <Link to="/profiles">profiles</Link>
          </li>
          <li>
            <Link to="/psychologists">psychologists</Link>
          </li>
          <li>
            <Link to="/sessions">sessions</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
