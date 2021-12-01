import { useEffect, useState } from 'react';
import styles from './postulants.module.css';
import List from './List';

function Postulants() {
  const [postulants, setPostulants] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((response) => {
        setPostulants(response);
      })
      .catch((error) => setError(error));
  }, []);

  return (
    <section className={styles.container}>
      <h2>Postulants</h2>
      <p className={styles.error}>{error}</p>
      <div>
        <List
          thName={['Name', 'Mail', 'Phone', 'Location', 'Actions']}
          dataList={postulants}
          setPostulants={setPostulants}
        />
      </div>
    </section>
  );
}

export default Postulants;
