import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './sessions.module.css';
import Session from './Session';
import { useSelector, useDispatch } from 'react-redux';
import { getSessions } from 'redux/sessions/thunks';
import { clearSessionsError } from 'redux/sessions/actions';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import Button from 'Components/Shared/Button/index';
import Modal from 'Components/Shared/Modal';

function GetSessions() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const sessions = useSelector((store) => store.sessions.list);
  const error = useSelector((store) => store.sessions.error);
  const loading = useSelector((store) => store.sessions.isLoading);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getSessions());
  }, []);

  const CreateBtn = () => {
    history.push(`/sessions/form`);
  };

  return (
    <section className={styles.container}>
      <h2>Sessions</h2>
      <div className={styles.list}>
        <table className={styles.tableSessions}>
          <thead>
            <tr>
              <th>PSYCHOLOGY</th>
              <th>POSTULANT</th>
              <th>TIME</th>
              <th>DATE</th>
              <th>STAT</th>
              <th>ACTION</th>
            </tr>
          </thead>
          {!Object.values(loading).some(Boolean) && (
            <tbody>
              {sessions.map((session) => {
                return <Session key={session._id} session={session} />;
              })}
            </tbody>
          )}
        </table>
        {loading && <LoadingSpinner circle={false} />}
        {!loading && !sessions.length && (
          <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>
        )}
        <Button className={styles.button} onClick={CreateBtn} content={'CREATE SESSION'} />
      </div>
      <Modal
        title="Are you sure you want to delete the selected Session?"
        show={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        type={'Confirm'}
      />
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => dispatch(clearSessionsError())}
        type={'Error'}
      />
    </section>
  );
}

export default GetSessions;
