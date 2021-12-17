import Header from 'Components/Header/index';
import Footer from 'Components/Footer/index';
import styles from './layout.module.css';

const Layout = (props) => {
  return (
    <div className={styles.container}>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
