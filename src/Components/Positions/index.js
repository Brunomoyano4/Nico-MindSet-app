import styles from './positions.module.css';
import { useEffect, useState } from 'react';

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
      <h2>Positions</h2>
      <div>
        {positions.map((positions) => {
          return <div key={positions._id}> {positions.job} </div>;
        })}
      </div>
    </section>
  );
}

export default Positions;
