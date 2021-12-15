import { useDispatch, useSelector } from 'react-redux';
import { addSession, updateSession, getSessionById } from '../../../redux/sessions/thunks';
import { clearSessionsError } from '../../../redux/sessions/actions';
import { getPsychologists } from '../../../redux/psychologists/thunks';
import { getPostulants } from '../../../redux/postulants/thunks';
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
  const [disableButton, setDisableButton] = useState(false);
  const selectedItem = useSelector((store) => store.sessions.selectedItem);
  const error = useSelector((store) => store.sessions.error);
  const loading = useSelector((store) => store.sessions.isLoading);
  const psychologists = useSelector((store) => store.psychologists.list);
  const postulants = useSelector((store) => store.postulants.list);

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useQuery();
  const sessionId = params.get('id');

  useEffect(() => {
    if (sessionId) {
      dispatch(getSessionById(sessionId));
    }
    dispatch(getPsychologists());
    setPsychologistOption(
      psychologists.map((psychologist) => ({
        value: psychologist._id,
        label: `${psychologist.firstName} ${psychologist.lastName}`
      }))
    );

    dispatch(getPostulants());
    setPostulantsOption(
      postulants.map((postulant) => ({
        value: postulant._id,
        label: `${postulant.firstName} ${postulant.lastName}`
      }))
    );
  }, []);

  useEffect(() => {
    if (sessionId) {
      if (Object.keys(selectedItem).length) {
        setPostulantsValue(selectedItem.postulant.firstName);
        setPsychologistValue(selectedItem.psychology);
        setDateValue(selectedItem.date);
        setTimeValue(selectedItem.time);
        setStatusValue(selectedItem.stat);
      }
    }
  }, [selectedItem]);

  const values = {
    psychology: psychologistValue,
    postulant: postulantValue,
    date: dateValue,
    time: timeValue,
    stat: statusValue
  };

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setDisableButton(true);
    if (sessionId) {
      dispatch(updateSession(sessionId, values));
    } else {
      dispatch(addSession(values));
    }
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
          label="Postulant:"
          id="postulant"
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
        closeModal={() => dispatch(clearSessionsError())}
        type={'Error'}
      />
    </div>
  );
};

export default Form;
