import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import Input from '../../Shared/Input';
import styles from './form.module.css';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import Modal from '../../Shared/Modal';
import Button from '../../Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addPosition, updatePosition, getPositions } from '../../../redux/positions/thunks';

function Form() {
  const [clientIdValue, setClientIdValue] = useState('');
  const [jobValue, setJobValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [createdAtValue, setCreatedAtValue] = useState('');
  const [error, setError] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const positions = useSelector((store) => store.positions.list);
  const loading = useSelector((store) => store.positions.isLoading);
  const dispatch = useDispatch();
  const history = useHistory();

  const setInputValues = (data) => {
    setClientIdValue(data.clientId || 'N/A');
    setJobValue(data.job || 'N/A');
    setDescriptionValue(data.description || 'N/A');
    setCreatedAtValue(data.createdAt || 'N/A');
  };

  const params = useQuery();
  const positionId = params.get('id');

  useEffect(() => {
    if (positionId) {
      positions.forEach((position) => {
        if (position._id === positionId) setInputValues(position);
      });
    }
  }, []);

  const values = {
    clientId: clientIdValue,
    job: jobValue,
    description: descriptionValue,
    createdAt: createdAtValue
  };

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setDisableButton(true);
    if (positionId) {
      dispatch(updatePosition(positionId, values));
    } else {
      dispatch(addPosition(values));
    }
    dispatch(getPositions());
    history.replace('/positions');
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
            label="Id"
            name="clientId"
            id="id"
            type="text"
            value={clientIdValue}
            onChange={(e) => setClientIdValue(e.target.value)}
            required
          />
          <Input
            className={styles.input}
            label="Job"
            name="job"
            id="job"
            type="text"
            value={jobValue}
            onChange={(e) => setJobValue(e.target.value)}
            required
          />
          <Input
            className={styles.input}
            label="Description"
            name="description"
            id="description"
            type="text"
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            required
          />
        </div>
        <Button
          className={styles.button}
          onClick={onSubmit}
          content={positionId ? 'Update Position' : 'Create position'}
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
}

export default Form;
