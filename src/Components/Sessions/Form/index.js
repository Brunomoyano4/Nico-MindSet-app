import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Select from '../../Shared/Select';
import Button from '../../Shared/Button/index';
import Modal from '../../Shared/Modal';

const Form = (params) => {
  const [error, setError] = useState('');
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
    return {
      value: s._id,
      label: `${s.firstName} ${s.lastName}`
    };
  });

  let PostulantList = params.postulants.map((s) => {
    return {
      value: s._id,
      label: `${s.firstName} ${s.lastName}`
    };
  });

  const saveSessions = (e) => {
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
        if (response.status !== 201) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        if (response.psychologyId === session.psychologyId) {
          setCreated(true);
          return response.json();
        }
      })
      .catch((error) => setError(error.toString()));
  };

  const updateSession = (e) => {
    e.stopPropagation();
    fetch(`${process.env.REACT_APP_API}/sessions/${session._id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(session)
    })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return response.json();
      })
      .catch((error) => setError(error.toString()));
  };

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
  }

  useEffect(() => {
    params.session.id ? setCreate(false) : setCreate(true);
  });

  return (
    <div>
      {error}
      {created ? (
        <div>session created</div>
      ) : (
        <form className={styles.form}>
          <Select
            className={styles.select}
            value={selectedPsychology}
            onChange={(e) => {
              setPsychology(e.target.value);
              handleSelectChange(e.target.id, e.target.value, e.target.name);
            }}
            label="Psychology Id"
            id="psychology"
            name="psychology"
            options={PsychologyList}
          />
          <Select
            className={styles.select}
            value={selectedPostulant}
            onChange={(e) => {
              setPostulant(e.target.value);
              handleSelectChange(e.target.id, e.target.value, e.target.name);
            }}
            label="Postulant Id"
            id="postulant"
            name="postulant"
            options={PostulantList}
          />
          <Input
            className={styles.input}
            label="date"
            name="date"
            id="date"
            type="datetime"
            value={session.date}
            onChange={handleInputChange}
            required
          />
          <Input
            className={styles.input}
            label="time"
            name="time"
            id="time"
            type="text"
            value={session.time}
            onChange={handleInputChange}
            required
          />
          <Input
            className={styles.input}
            label="stat"
            name="stat"
            id="stat"
            type="text"
            value={session.stat}
            onChange={handleInputChange}
            required
          />
          <Button
            className={styles.button}
            content={params.session._id ? 'SAVE' : 'Create Session'}
            onClick={(e) => {
              params.session._id ? updateSession(e) : saveSessions(e);
            }}
          />
        </form>
      )}
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => setError('')}
        type={'Error'}
      />
    </div>
  );
};

export default Form;
