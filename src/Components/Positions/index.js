import styles from './positions.module.css';
import { useEffect, useState } from 'react';
import DeleteBtn from './DeleteBtn';

function GetPositions() {
  const [positions, savePositions] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => response.json())
      .then((response) => {
        savePositions(response);
      });
  }, [positions]);

  return (
    <section className={styles.container}>
      <h2>Positions</h2>
      <div>
        {positions.map((positions) => {
          return (
            <div key={positions._id}>
              {positions.clientId} {positions.job} {positions.description} {positions.createdAt}{' '}
              <DeleteBtn positionId={positions._id}></DeleteBtn>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default GetPositions;
