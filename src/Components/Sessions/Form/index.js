import { useEffect, useState } from 'react';
import styles from './form.module.css';

function Form(params) {
  const [create, setCreate] = useState(true);
  const [created, setCreated] = useState(false);
  const [selectedPsychology, setPsychology] = useState(
    params.psychologys ? params.psychologys[0]._id : session.psychology
  );
  const [selectedPostulant, setPostulant] = useState(
    params.postulants ? params.postulants[0]._id : session.postulant
  );
  const initialState = params.session._id
    ? params.session
    : {
        psychology: selectedPsychology,
        postulant: selectedPostulant,
        date: '',
        time: '',
        stat: ''
      };
  const [session, setSession] = useState(initialState);
  let PsychologyList = params.psychologys.map((s) => {
    return (
      <option key={s._id} value={s._id}>
        {s.firstName} {s.lastName}
      </option>
    );
  });

  let PostulantList = params.postulants.map((s) => {
    return (
      <option key={s._id} value={s._id}>
        {s.firstName} {s.lastName}
      </option>
    );
  });

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

  function handleSelectChange(person, id, name) {
    let obj;
    params.allSessions.map((s) => {
      person === 'psychology'
        ? s.psychology._id === id
          ? (obj = s.psychology)
          : ''
        : s.postulant._id === id
        ? (obj = s.postulant)
        : '';
    });
    create ? setSession({ ...session, [name]: id }) : setSession({ ...session, [person]: obj });
    console.log(session);
  }

  useEffect(() => {
    params.session.id ? setCreate(false) : setCreate(true);
  });

  return (
    <div>
      {created ? (
        <div>session created</div>
      ) : (
        <form className={styles.sessionsForm}>
          <label>Psychology Id</label>
          <select
            value={selectedPsychology}
            id="psychology"
            onChange={(e) => {
              setPsychology(e.target.value);
              handleSelectChange(e.target.id, e.target.value, e.target.name);
            }}
            name="psychology"
          >
            {PsychologyList}
          </select>
          <label>Postulant Id</label>
          <select
            value={selectedPostulant}
            id="postulant"
            onChange={(e) => {
              setPostulant(e.target.value);
              handleSelectChange(e.target.id, e.target.value, e.target.name);
            }}
            name="postulant"
          >
            {PostulantList}
          </select>
          <label>date</label>
          <input
            type="datetime"
            id="date"
            name="date"
            value={session.date}
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
              console.log(session);
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
