import { useEffect, useState } from 'react';
import styles from './postulants.module.css';
import List from './List';
import Modal from '../Shared/Modal';

function Postulants() {
  const [postulants, setPostulants] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return response.json();
      })
      .then((response) => setPostulants(response))
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className={styles.container}>
      <h2>Postulants</h2>
      <div>
        <List
          thName={['Name', 'Mail', 'Phone', 'Location', 'Actions']}
          dataList={postulants}
          setPostulants={setPostulants}
          loading={loading}
        />
      </div>
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => setError('')}
        type={'Error'}
      />
    </section>
  );
}

export default Postulants;
