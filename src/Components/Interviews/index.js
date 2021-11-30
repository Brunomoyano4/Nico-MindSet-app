import { useEffect, useState } from 'react';
import styles from './interviews.module.css';
import Interview from './Interview';
import AddBtn from './AddBtn';

function Interviews() {
  const [interviews, saveInterviews] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        saveInterviews(response);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Interviews</h2>
      <div>
        <table className={styles.list}>
          <thead>
            <th>Position:</th>
            <th>Postulant:</th>
            <th>Date time:</th>
          </thead>
          <tbody>
            {interviews.map((interview) => {
              return <Interview key={interview._id} interview={interview} />;
            })}
          </tbody>
        </table>
        <AddBtn className={styles.button} />
      </div>
    </section>
  );
}

export default Interviews;
