import styles from './header.module.css';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.appName}>
          Mind<span className={styles.nameColor}>SET</span>
        </div>
        <ul className={styles.routes}>
          {props.routes.map((route) => (
            <li key={route.name}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
