import { useEffect, useState } from 'react';
import styles from './interviews.module.css';
import Interview from './Interview';
import AddBtn from './AddBtn';
import LoadingSpinner from '../Shared/LoadingSpinner';

function Interviews() {
  const [interviews, saveInterviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        saveInterviews(response);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className={styles.container}>
      <h2>Interviews</h2>
      <div>
        <table className={styles.list}>
          <thead>
            <tr>
              <th>Position:</th>
              <th>Postulant:</th>
              <th>Date time:</th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {interviews.map((interview) => {
                return <Interview key={interview._id} interview={interview} />;
              })}
            </tbody>
          )}
        </table>
        {loading && <LoadingSpinner circle={false} />}
        {!loading && !interviews.length && (
          <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>
        )}
        <AddBtn className={styles.button} />
      </div>
    </section>
  );
}

export default Interviews;
