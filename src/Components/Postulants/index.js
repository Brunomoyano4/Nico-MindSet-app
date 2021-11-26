import { useEffect, useState } from 'react';
import styles from './postulants.module.css';
import List from './List';

function Postulants() {
  const [postulants, savePostulants] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((response) => {
        savePostulants(response);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Postulants</h2>
      <div>
        <List thName={['Name', 'Mail', 'Phone', 'Location', 'Actions']} dataList={postulants} />
      </div>
    </section>
  );
}

export default Postulants;
