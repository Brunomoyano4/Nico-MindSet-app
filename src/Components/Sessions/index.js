import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './sessions.module.css';
import Session from './Session';
import DeleteBtn from '../Shared/DeleteBtn/index';
import LoadingSpinner from '../Shared/LoadingSpinner';
import Button from '../Shared/Button/index';
import Modal from '../Shared/Modal';

function GetSessions() {
  const [error, setError] = useState('');
  const [sessions, setSessions] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/sessions`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data !== sessions) setSessions(data);
      })
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  }, []);

  const deleteSessions = (Id, event) => {
    event.stopPropagation();
    fetch(`${process.env.REACT_APP_API}/sessions/${Id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        setShowConfirmModal(false);
        return history.go(0);
      })
      .catch((error) => setError(error.toString()));
  };

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
        // onConfirm={(e) => deleteSessions(sessionToDelete, e)}
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

export default GetSessions;
