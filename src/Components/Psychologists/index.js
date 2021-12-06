import { useEffect, useState } from 'react';
import Psychologist from './Psychologist';
import CreateBtn from './CreateBtn';
import styles from './psychologists.module.css';
import LoadingSpinner from '../Shared/LoadingSpinner';

function Psychologists() {
  const [psychologists, setPsychologists] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/psychologists`)
      .then((response) => response.json())
      .then((response) => setPsychologists(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className={styles.container}>
        <div className={styles.header}>
          <h2>Psychologists</h2>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {psychologists.map((psychologist) => {
                  return <Psychologist key={psychologist._id} psychologist={psychologist} />;
                })}
              </tbody>
            )}
          </table>
        </div>
        {loading && <LoadingSpinner circle={false} />}
        {!loading && !psychologists.length && (
          <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>
        )}
      </section>
      <section className={styles.createBtnSection}>
        {error && <div className={styles.error}>{error}</div>}
        <div>
          <CreateBtn name="CreateBtn" />
        </div>
      </section>
    </>
  );
}

export default Psychologists;
