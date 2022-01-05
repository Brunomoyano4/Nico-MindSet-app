import styles from './home.module.css';
import PsychologistHome from 'Components/Psychologist/Home/psychologistHome';

function Home() {
  return (
    <section className={styles.container}>
      <PsychologistHome />
    </section>
  );
}

export default Home;
