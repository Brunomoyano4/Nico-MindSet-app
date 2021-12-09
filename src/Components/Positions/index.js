import styles from './positions.module.css';
import { useEffect, useState } from 'react';
import Form from './Form';
import DeleteBtn from '../Shared/DeleteBtn';
import LoadingSpinner from '../Shared/LoadingSpinner';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';

const STATES = {
  LIST: 1,
  CREATE: 2,
  UPDATE: 3
};

function GetPositions() {
  const [positions, setPositions] = useState([]);
  const [state, setState] = useState(1);
  const [positionToUpdate, setPosition] = useState();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [positionToDelete, setPositionToDelete] = useState('');

  function changeState(n, e) {
    e.preventDefault();
    setState(n);
  }

  function updatePosition(e, position) {
    e.preventDefault();
    setPosition(position);
    setState(STATES.UPDATE);
  }

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
      .then((data) => {
        if (data !== positions) setPositions(data);
      })
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  }, [positions.length]);

  const deletePositions = (Id, event) => {
    event.stopPropagation();
    fetch(`${process.env.REACT_APP_API}/positions/${Id}`, { method: 'DELETE' })
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

  return (
    <section className={styles.container}>
      <h2>Positions</h2>
      <div className={styles.list}>
        {state !== STATES.LIST ? (
          <Button content="BACK" onClick={(e) => changeState(STATES.LIST, e)} />
        ) : (
          <></>
        )}

        {state === STATES.LIST ? (
          <>
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
                  return (
                    <tr key={position._id} onClick={(e) => updatePosition(e, position)}>
                      <td>{position.clientId}</td>
                      <td>{position.job}</td>
                      <td>{position.description}</td>
                      <td>{position.createdAt}</td>
                      <td>
                        <DeleteBtn
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowConfirmModal(true);
                            setPositionToDelete(position._id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {loading && <LoadingSpinner circle={false} />}
            {!loading && !positions.length && (
              <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>
            )}
            {state === STATES.LIST ? (
              <Button
                className={styles.button}
                onClick={(e) => changeState(STATES.CREATE, e)}
                content="CREATE POSITION"
              />
            ) : (
              <></>
            )}
            {}
          </>
        ) : (
          <Form position={state === STATES.UPDATE ? positionToUpdate : {}} />
        )}
      </div>
      <Modal
        title="Are you sure you want to delete the selected Position?"
        onConfirm={(e) => deletePositions(positionToDelete, e)}
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

export default GetPositions;
