import { useLocation, useHistory } from 'react-router-dom';
import Modal from '../../Shared/Modal';
import React, { useState, useEffect } from 'react';
import Input from '../../Shared/Input';
import styles from './form.module.css';
import Select from '../../Shared/Select';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import Button from '../../Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addInterviews, updateInterviews } from '../../../redux/interviews/thunks';
import { clearInterviewsError } from '../../../redux/interviews/actions';

function Form() {
  const dispatch = useDispatch();
  const [positionIdValue, setPositionIdValue] = useState('');
  const [postulantIdValue, setPostulantIdValue] = useState('');
  const [dateTimeValue, setDateTimeValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const data = useSelector((store) => store.interviews.list);
  const loading = useSelector((store) => store.interviews.isLoading);
  const error = useSelector((store) => store.interviews.error);

  const setInputValues = (data) => {
    setPositionIdValue(data.positionId || ''),
      setPostulantIdValue(data.postulantId || ''),
      setDateTimeValue(data.dateTime || ''),
      setStatusValue(data.status || '');
  };

  const history = useHistory();
  const params = useQuery();
  const interviewId = params.get('id');

  const values = {
    positionId: positionIdValue,
    postulantId: postulantIdValue,
    dateTime: dateTimeValue,
    status: statusValue
  };

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    if (interviewId) {
      data.forEach((interview) => {
        if (interview._id === interviewId) setInputValues(interview);
      });
    }
  }, [interviewId]);

  const onSubmit = (event) => {
    event.preventDefault();
    setDisableButton(true);
    if (interviewId) {
      dispatch(updateInterviews(interviewId, values));
    } else {
      dispatch(addInterviews(values));
    }
    history.replace('/interviews');
    setDisableButton(false);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2>Form</h2>
        <div className={styles.form}>
          {loading && (
            <div className={styles.spinnerContainer}>
              <LoadingSpinner />
            </div>
          )}
          <Input
            className={styles.input}
            name="Position Id"
            placeholder="Position's Id"
            value={positionIdValue}
            onChange={(event) => {
              setPositionIdValue(event.target.value);
            }}
            required
          />
          <Input
            className={styles.input}
            name="Postulant Id"
            placeholder="Postulant's Id"
            value={postulantIdValue}
            onChange={(event) => {
              setPostulantIdValue(event.target.value);
            }}
            required
          />
          <Input
            className={styles.input}
            name="Date time"
            placeholder="DD/MM/YYYY HH:MM"
            value={dateTimeValue}
            onChange={(event) => {
              setDateTimeValue(event.target.value);
            }}
            required
          />
          <Select
            className={styles.select}
            name="Status"
            value={statusValue}
            onChange={(event) => {
              setStatusValue(event.target.value);
            }}
            required
            options={[
              { value: 'pending', label: 'Pending' },
              { value: 'cancelled', label: 'Cancelled' },
              { value: 'next step', label: 'Next Step' },
              { value: 'finished', label: 'Finished' }
            ]}
          />
        </div>
        <Button content={'SAVE'} disabled={loading || disableButton} />
      </form>
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => dispatch(clearInterviewsError())}
        type={'Error'}
      />
      {loading && (
        <div className={styles.spinnerContainer}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

export default Form;
