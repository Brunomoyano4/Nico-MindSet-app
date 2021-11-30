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
  const actualizar = (pos) => setPositions(pos);

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
      .then((response) => response.json())
      .then((response) => {
        if (response !== positions) setPositions(response);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Positions</h2>
      <div>
        {state != STATES.LIST ? (
          <button onClick={(e) => changeState(STATES.LIST, e)}>List</button>
        ) : (
          <></>
        )}
        {state === STATES.LIST ? (
          <button onClick={(e) => changeState(STATES.CREATE, e)}>Create</button>
        ) : (
          <></>
        )}
        {}
        {state === STATES.LIST ? (
          positions.map((position) => {
            return (
              <div key={position._id} onClick={(e) => updatePosition(e, position)}>
                {position.clientId} {position.job} {position.description} {position.createdAt}{' '}
                <DeleteBtn
                  positionId={position._id}
                  positions={positions}
                  filterPosition={actualizar}
                ></DeleteBtn>
              </div>
            );
          })
        ) : (
          <Form position={state === STATES.UPDATE ? positionToUpdate : {}} />
        )}
      </div>
    </section>
  );
}

export default GetPositions;
