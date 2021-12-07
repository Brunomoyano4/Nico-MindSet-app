import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styles from './interviews.module.css';
import Interview from './Interview';
import Button from '../Shared/Button';
import LoadingSpinner from '../Shared/LoadingSpinner';

function Interviews() {
  const [interviews, saveInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        saveInterviews(response);
      })
      .finally(() => setLoading(false));
  }, []);

  const CreateBtn = () => {
    history.push(`/interviews/form`);
  };

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
        <Button onClick={CreateBtn} content={'CREATE INTERVIEW'} />
      </div>
    </section>
  );
}

export default Interviews;
