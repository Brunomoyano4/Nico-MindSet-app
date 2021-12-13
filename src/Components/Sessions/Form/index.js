import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Select from '../../Shared/Select';
import Button from '../../Shared/Button/index';
import Modal from '../../Shared/Modal';
import LoadingSpinner from '../../Shared/LoadingSpinner';

const Form = () => {
  const [postulantsOption, setPostulantsOption] = useState([]);
  const [postulantValue, setPostulantsValue] = useState('');
  const [psychologistsOption, setPsychologistOption] = useState([]);
  const [psychologistValue, setPsychologistValue] = useState('');
  const [dateValue, setDateValue] = useState([]);
  const [timeValue, setTimeValue] = useState([]);
  const [statusValue, setStatusValue] = useState([]);
  const [error, setError] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const [loading, setLoading] = useState({
    postulantLoading: false,
    psychologistLoading: false,
    sessionIdLoading: false
  });

  const history = useHistory();
  const params = useQuery();
  const sessionId = params.get('id');

  useEffect(() => {
    console.log(sessionId);
    setLoading({
      sessionIdLoading: sessionId ? true : false,
      postulantLoading: true,
      psychologistLoading: true
    });
    if (sessionId) {
      fetch(`${process.env.REACT_APP_API}/sessions/${sessionId}`)
        .then((res) => {
          if (res.status !== 200) {
            return res.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return res.json();
        })
        .then((data) => {
          setPostulantsValue(data?.postulant?.firstName, data?.postulant?.lastName);
          setPsychologistValue(data?.psychology?.firstName, data?.psychology?.lastName);
          setDateValue(data?.date);
          setTimeValue(data?.time);
          setStatusValue(data.stat);
        })
        .catch((error) => setError(error.toString()))
        .finally(() =>
          setLoading((prev) => {
            return { ...prev, sessionIdLoading: false };
          })
        );
    }

    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((res) => {
        if (res.status !== 200) {
          return res.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return res.json();
      })
      .then((res) => {
        setPostulantsOption(
          res.map((postulant) => ({
            value: postulant._id,
            label: `${postulant.firstName} ${postulant.lastName}`
          }))
        );
        setPostulantsValue(res[0]._id);
      })
      .catch((error) => setError(error.toString()))
      .finally(() => {
        setLoading((prev) => {
          return { ...prev, postulantLoading: false };
        });
      });

    fetch(`${process.env.REACT_APP_API}/psychologists`)
      .then((res) => {
        if (res.status !== 200) {
          return res.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return res.json();
      })
      .then((res) => {
        setPsychologistOption(
          res.map((psychologist) => ({
            value: psychologist._id,
            label: `${psychologist.firstName} ${psychologist.lastName}`
          }))
        );
        setPsychologistValue(res[0]._id);
      })
      .catch((error) => setError(error.toString()))
      .finally(() => {
        setLoading((prev) => {
          return { ...prev, psychologistLoading: false };
        });
      });
  }, []);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setDisableButton(true);
    let url;
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        psychology: psychologistValue,
        postulant: postulantValue,
        date: dateValue,
        time: timeValue,
        stat: statusValue
      })
    };
    if (sessionId) {
      options.method = 'PUT';
      console.log(options.body);
      url = `${process.env.REACT_APP_API}/sessions/${sessionId}`;
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/sessions`;
    }
    fetch(url, options)
      .then((response) => {
        if (response.status !== 201) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return response.json();
      })
      .then(() => history.replace('/sessions'))
      .catch((error) => setError(error.toString()));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        {Object.values(loading).some(Boolean) && (
          <div className={styles.spinnerContainer}>
            <LoadingSpinner />
          </div>
        )}
        <Select
          className={styles.select}
          value={psychologistValue}
          onChange={(e) => {
            console.log(e.target.id);
            setPsychologistValue(e.target.value);
          }}
          label="Psychologist:"
          id="psychologist"
          options={psychologistsOption}
          required
        />
        <Select
          className={styles.select}
          value={postulantValue}
          onChange={(e) => setPostulantsValue(e.target.value)}
          label="Psychologist:"
          id="psychologist"
          options={postulantsOption}
          required
        />
        <Input
          className={styles.input}
          label="date"
          name="date"
          id="date"
          type="datetime"
          value={dateValue}
          onChange={(e) => setDateValue(e.target.value)}
          required
        />
        <Input
          className={styles.input}
          label="time"
          name="time"
          id="time"
          type="text"
          value={timeValue}
          onChange={(e) => setTimeValue(e.target.value)}
          required
        />
        <Input
          className={styles.input}
          label="stat"
          name="stat"
          id="stat"
          type="text"
          value={statusValue}
          onChange={(e) => setStatusValue(e.target.value)}
          required
        />
        <Button
          className={styles.button}
          content={sessionId ? 'Update Position' : 'Create position'}
          disabled={disableButton}
        />
      </form>
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
