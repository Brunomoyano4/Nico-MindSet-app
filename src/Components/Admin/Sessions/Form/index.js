import { useDispatch, useSelector } from 'react-redux';
import {
  addSession,
  updateSession,
  getSessionById,
  getSessionsOptions
} from 'redux/sessions/thunks';
import { clearSessionsError } from 'redux/sessions/actions';
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Button from 'Components/Shared/Button/index';
import Modal from 'Components/Shared/Modal';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';

const Form = () => {
  const [postulantValue, setPostulantsValue] = useState('');
  const [psychologistValue, setPsychologistValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const selectedItem = useSelector((store) => store.sessions.selectedItem);
  const error = useSelector((store) => store.sessions.error);
  const loading = {
    sessionsLoading: useSelector((store) => store.sessions.isLoading),
    psychologistsLoading: useSelector((store) => store.psychologists.isLoading),
    postulantsLoading: useSelector((store) => store.postulants.isLoading)
  };
  const options = useSelector((store) => store.sessions.options);

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useQuery();
  const sessionId = params.get('id');

  useEffect(() => {
    if (sessionId) {
      dispatch(getSessionById(sessionId));
    }
    dispatch(getSessionsOptions('postulants'));
    dispatch(getSessionsOptions('psychologists'));
  }, [dispatch]);

  useEffect(() => {
    if (sessionId) {
      if (Object.keys(selectedItem).length) {
        setPostulantsValue(`${selectedItem?.postulant?._id}`);
        setPsychologistValue(selectedItem?.psychology?._id);
        setDateValue(selectedItem.date);
        setTimeValue(selectedItem.time);
        setStatusValue(selectedItem.stat);
      }
    } else {
      setPostulantsValue(`${options?.postulants[0]?.value}`);
      setPsychologistValue(options?.psychologists[0]?.value);
    }
  }, [selectedItem]);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const onSubmit = (e) => {
    const values = {
      psychology: psychologistValue,
      postulant: postulantValue,
      date: dateValue,
      time: timeValue,
      stat: statusValue
    };
    e.preventDefault();
    setDisableButton(true);
    if (sessionId) {
      dispatch(updateSession(sessionId, values));
    } else {
      dispatch(addSession(values));
    }
    history.replace('/admin/sessions/list');
    setDisableButton(false);
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
            setPsychologistValue(e.target.value);
          }}
          label="Psychologist:"
          id="psychologist"
          options={options.psychologists}
          required
        />
        <Select
          className={styles.select}
          value={postulantValue}
          onChange={(e) => {
            setPostulantsValue(e.target.value);
          }}
          label="Postulant:"
          id="postulant"
          options={options.postulants}
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
        closeModal={() => dispatch(clearSessionsError())}
        type={'Error'}
      />
    </div>
  );
};

export default Form;