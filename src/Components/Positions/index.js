import { useEffect, useState } from 'react';
import styles from './positions.module.css';
import AddBtn from './AddBtn';
import Position from './Position';

function Positions() {
  const [positions, savePositions] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => response.json())
      .then((response) => {
        savePositions(response);
      });
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>Positions</h2>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Client</th>
              <th>Job</th>
              <th>Description</th>
              <th>Creation Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => {
              return <Position key={position._id} position={position} />;
            })}
          </tbody>
        </table>
        <AddBtn className={styles.button} />
      </div>
    </section>
  );
}

export default Positions;
