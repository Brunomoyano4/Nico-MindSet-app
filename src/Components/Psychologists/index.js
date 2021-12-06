import { useEffect, useState } from 'react';
import Psychologist from './Psychologist';
import CreateBtn from './CreateBtn';
import styles from './psychologists.module.css';

function Psychologists() {
  const [psychologists, setPsychologists] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/psychologists`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return response.json();
      })
      .then((data) => setPsychologists(data))
      .catch((error) => setError(error.toString()));
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
            <tbody>
              {psychologists.map((psychologist) => {
                return <Psychologist key={psychologist._id} psychologist={psychologist} />;
              })}
            </tbody>
          </table>
        </div>
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
