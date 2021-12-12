import styles from './positions.module.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Position from './Position';
import LoadingSpinner from '../Shared/LoadingSpinner';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';

function Positions() {
  const [positions, setPositions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return response.json();
      })
      .then((response) => setPositions(response))
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  }, [positions.length]);

  const CreateBtn = () => {
    history.push(`/positions/form`);
  };

  return (
    <section className={styles.container}>
      <h2>Positions</h2>
      <div className={styles.list}>
        <table className={styles.list}>
          <thead>
            <tr>
              <th>ID</th>
              <th>JOB</th>
              <th>DESCRIPTION</th>
              <th>DATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => {
              return <Position key={position._id} position={position} />;
            })}
          </tbody>
        </table>
        {loading && <LoadingSpinner circle={false} />}
        {!loading && !positions.length && (
          <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>
        )}
        <Button className={styles.button} onClick={CreateBtn} content={'CREATE POSITION'} />
      </div>
      <Modal
        title="Are you sure you want to delete the selected Position?"
        show={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        type={'Confirm'}
      />
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

export default Positions;
