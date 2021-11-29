import { useEffect, useState } from 'react';
import Psychologist from './Psychologist';
import CreateBtn from './CreateBtn';
import styles from './psychologists.module.css';

function Psychologists() {
  const [psychologists, setPsychologists] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/psychologists`)
      .then((response) => response.json())
      .then((response) => {
        setPsychologists(response);
      });
  }, []);
  return (
    <>
      <section className={styles.container}>
        <div className={styles.header}>
          <h2>Psychologist</h2>
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
        <CreateBtn name="CreateBtn" />
      </section>
    </>
  );
}

export default Psychologists;
