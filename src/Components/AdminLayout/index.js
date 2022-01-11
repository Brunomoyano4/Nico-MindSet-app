import AdminHeader from 'Components/AdminHeader/index';
import Footer from 'Components/Footer/index';
import styles from './adminLayout.module.css';
import SideBarMenu from 'Components/SideBarMenu';

const AdminLayout = (props) => {
  const { routes = [] } = props;
  return (
    <div className={styles.container}>
      <AdminHeader className={styles.navbar} routes={routes} authenticated={props.authenticated} />
      <div className={styles.entitiesContainer}>{props.children}</div>
      <SideBarMenu
        className={styles.asideMenu}
        routes={routes}
        authenticated={props.authenticated}
      />
      <Footer />
    </div>
  );
};

export default AdminLayout;
