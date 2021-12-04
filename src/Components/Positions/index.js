import styles from './positions.module.css';
import { useEffect, useState } from 'react';
import DeleteBtn from './DeleteBtn';
import Form from './Form';

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
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not fetch data properly');
        }
        return response.json();
      })
      .then((response) => {
        if (response !== positions) setPositions(response);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [positions.length]);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Positions</h2>
      <h4>{error}</h4>
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
          positions.length ? (
            <table className={styles.tablePositions}>
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
                          className={styles.deleteButton}
                          positionId={position._id}
                          positions={positions}
                          filterPosition={updatePositions}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <span>No positions found</span>
          )
        ) : (
          <Form position={state === STATES.UPDATE ? positionToUpdate : {}} />
        )}
      </div>
    </section>
  );
}

export default GetPositions;
