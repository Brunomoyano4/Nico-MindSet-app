import styles from './positions.module.css';
import { useEffect, useState } from 'react';
import DeleteBtn from './DeleteBtn';
import Form from './Form';
import LoadingSpinner from '../Shared/LoadingSpinner';
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
  const updatePositions = () => setPositions([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Positions</h2>
      <div className={styles.content}>
        {state !== STATES.LIST ? (
          <button onClick={(e) => changeState(STATES.LIST, e)}>List</button>
        ) : (
          <></>
        )}
        {state === STATES.LIST ? (
          <button className={styles.createButton} onClick={(e) => changeState(STATES.CREATE, e)}>
            Create
          </button>
        ) : (
          <></>
        )}
        {}
        {state === STATES.LIST ? (
          <>
            <table className={styles.tablePositions}>
              <tr>
                <th>ID</th>
                <th>JOB</th>
                <th>DESCRIPTION</th>
                <th>DATE</th>
                <th>ACTIONS</th>
              </tr>
              {!loading &&
                positions.map((position) => {
                  return (
                    <tr key={position._id} onClick={(e) => updatePosition(e, position)}>
                      <td>{position.clientId}</td>
                      <td>{position.job}</td>
                      <td>{position.description}</td>
                      <td>{position.createdAt}</td>
                      <td>
                        <DeleteBtn
                          className={styles.deleteButton}
                          positionId={position._id}
                          positions={positions}
                          filterPosition={updatePositions}
                        />
                      </td>
                    </tr>
                  );
                })}
            </table>
            {loading && <LoadingSpinner circle={false} />}
            {!loading && !positions.length && (
              <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>
            )}
          </>
        ) : (
          <Form position={state === STATES.UPDATE ? positionToUpdate : {}} />
        )}
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

export default GetPositions;
