import styles from './sessions.module.css';
import { useEffect, useState } from 'react';
import DeleteBtn from './DeleteBtn';
import Form from './Form';

const STATES = {
  LIST: 1,
  CREATE: 2,
  UPDATE: 3
};

function GetSessions() {
  const [sessions, setSessions] = useState([]);
  const [state, setState] = useState(1);
  const [sessionToUpdate, setSession] = useState();
  const updateSessions = () => setSessions([]);

  function changeState(n, e) {
    e.preventDefault();
    setState(n);
  }

  function updateSession(e, session) {
    e.preventDefault();
    setSession(session);
    setState(STATES.UPDATE);
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/sessions`)
      .then((response) => response.json())
      .then((response) => {
        if (response !== sessions) setSessions(response);
      });
  }, [sessions.length]);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Sessions</h2>
      <div className={styles.content}>
        {state != STATES.LIST ? (
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
          sessions.length ? (
            <table className={styles.tableSessions}>
              <thead>
                <tr>
                  <th>PSYCHOLOGY</th>
                  <th>POSTULANT</th>
                  <th>TIME</th>
                  <th>DATE</th>
                  <th>STAT</th>
                  <th>ACCTIONS</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session) => {
                  return (
                    <tr key={session._id} onClick={(e) => updateSession(e, session)}>
                      <td>
                        {' '}
                        {`${session.psychologist?.firstName || ''} ${
                          session.psychologist?.lastName || ''
                        }`}
                      </td>
                      <td>
                        {' '}
                        {`${session.postulant?.firstName || ''} ${
                          session.postulant?.lastName || ''
                        }`}
                      </td>
                      <td>{session.time}</td>
                      <td>{session.date.slice(0, 10)}</td>
                      <td>{session.stat}</td>
                      <td>
                        <DeleteBtn
                          className={styles.deleteButton}
                          sessionId={session._id}
                          sessions={sessions}
                          filterSession={updateSessions}
                        ></DeleteBtn>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <tr>No sessions found</tr>
          )
        ) : (
          <Form session={state === STATES.UPDATE ? sessionToUpdate : {}} />
        )}
      </div>
    </section>
  );
}

export default GetSessions;
