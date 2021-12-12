import styles from './positions.module.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Position from './Position';
import LoadingSpinner from '../Shared/LoadingSpinner';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { getPositions } from '../../redux/positions/thunks';

function Positions() {
  const dispatch = useDispatch();
  const positions = useSelector((store) => store.positions.list);
  const loading = useSelector((store) => store.positions.isLoading);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    dispatch(getPositions());
  }, [dispatch]);

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
