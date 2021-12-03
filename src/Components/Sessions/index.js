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
  const [psychologys, setPsychologys] = useState([]);
  const [postulants, setPostulants] = useState([]);
  const updateSessions = () => setSessions(sessions);

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
    fetch(`${process.env.REACT_APP_API}/psychologists`)
      .then((response) => response.json())
      .then((response) => {
        if (response !== psychologys) setPsychologys(response);
      });
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((response) => {
        if (response !== postulants) setPostulants(response);
      });
  }, [sessions.lenght]);

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
                        {`${session.psychology?.firstName || ''} ${
                          session.psychology?.lastName || ''
                        }`}
                      </td>
                      <td>
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
            <span>No sessions found</span>
          )
        ) : (
          <Form
            session={state === STATES.UPDATE ? sessionToUpdate : {}}
            postulants={postulants}
            psychologys={psychologys}
            allSessions={sessions}
          />
        )}
      </div>
    </section>
  );
}

export default GetSessions;
