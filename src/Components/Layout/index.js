import Header from '../Header/index';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
import AdminsForm from '../Admins/Form';
import Applications from '../Applications/index';
import Clients from '../Clients/index';
import ClientsForm from '../Clients/Form';
import Interviews from '../Interviews/index';
import InterviewsForm from '../Interviews/Form';
import Positions from '../Positions/index';
import Postulants from '../Postulants/index';
import PostulantsForm from '../Postulants/Form/';
import Profiles from '../Profiles/index';
import ProfilesForm from '../Profiles/Form';
import Psychologists from '../Psychologists/index';
import PsychologistsForm from '../Psychologists/Form';
import Sessions from '../Sessions/index';
import Home from '../Home/index';
import styles from './layout.module.css';

function Layout() {
  let currentScreen = <Home />;
  switch (window.location.pathname) {
    case '/admins':
      currentScreen = <Admins />;
      break;
    case '/admins/form':
      currentScreen = <AdminsForm />;
      break;
    case '/applications':
      currentScreen = <Applications />;
      break;
    case '/clients':
      currentScreen = <Clients />;
      break;
    case '/clients/form':
      currentScreen = <ClientsForm />;
      break;
    case '/interviews':
      currentScreen = <Interviews />;
      break;
    case '/interviews/form':
      currentScreen = <InterviewsForm />;
      break;
    case '/positions':
      currentScreen = <Positions />;
      break;
    case '/postulants':
      currentScreen = <Postulants />;
      break;
    case '/postulants/form':
      currentScreen = <PostulantsForm />;
      break;
    case '/profiles':
      currentScreen = <Profiles />;
      break;
    case '/profiles/form':
      currentScreen = <ProfilesForm />;
      break;
    case '/psychologists':
      currentScreen = <Psychologists />;
      break;
    case '/psychologists/form':
      currentScreen = <PsychologistsForm />;
      break;
    case '/sessions':
      currentScreen = <Sessions />;
      break;
    default:
      break;
  }

  return (
    <div className={styles.container}>
      <Header />
      {currentScreen}
      <Footer />
    </div>
  );
}

export default Layout;
