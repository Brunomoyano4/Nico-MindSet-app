import { useState } from 'react';
import styles from './form.module.css';

function Form(params) {
  const initialState = params.session._id
    ? params.session
    : {
        psychologyId: null,
        postulantId: null,
        date: '',
        time: '',
        stat: ''
      };

  const [session, setSession] = useState(initialState);
  const [created, setCreated] = useState(false);

  function saveSessions(e) {
    e.stopPropagation();
    fetch(`${process.env.REACT_APP_API}/sessions`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(session)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.psychologyId === session.psychologyId) {
          setCreated(true);
        }
      });
  }

  function updateSession(e) {
    e.stopPropagation();
    fetch(`${process.env.REACT_APP_API}/sessions/${session._id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(session)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.psychologyId === session.psychologyId) {
          console.log('Session Updated!');
        }
      });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setSession({ ...session, [name]: value });
  }

  return (
    <div>
      {created ? (
        <div>session created</div>
      ) : (
        <form className={styles.sessionsForm}>
          <label>Psychology Id</label>
          <input
            type="text"
            id="psychologyId"
            name="psychologyId"
            value={session.psychologyId}
            onChange={handleInputChange}
            required
          />
          <label>Postulant Id</label>
          <input
            type="text"
            id="postulantId"
            name="postulantId"
            value={session.postulantId}
            onChange={handleInputChange}
            required
          />
          <label>time</label>
          <input
            type="text"
            id="time"
            name="time"
            value={session.time}
            onChange={handleInputChange}
            required
          />
          <label>stat</label>
          <input
            type="text"
            id="stat"
            name="stat"
            value={session.stat}
            onChange={handleInputChange}
            required
          />
          <button
            onClick={(e) => {
              console.log(params);
              params.session._id ? updateSession(e) : saveSessions(e);
            }}
          >
            {params.session._id ? 'Update Session' : 'Create session'}
          </button>
        </form>
      )}
    </div>
  );
}

export default Form;
