import styles from './AdminHeader.module.css';
// import { Link } from 'react-router-dom';
import LogOutButton from 'Components/Shared/ButtonLogOut';

function AdminHeader(props) {
  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.titles}>
          {/* <Link to="/" className={styles.appName}>
            Mind<span className={styles.nameColor}>SET</span>
          </Link> */}
          <h1 className={styles.title}>ADMINS</h1>
        </div>
        {props.authenticated && <LogOutButton className={styles.logOutButton} />}
      </nav>
    </header>
  );
}

export default AdminHeader;
