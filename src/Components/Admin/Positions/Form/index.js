import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import Input from 'Components/Shared/Input';
import styles from './form.module.css';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addPosition, getPositionById, updatePosition } from 'redux/positions/thunks';
import { clearPositionsError } from 'redux/positions/actions';

function Form() {
  const [clientIdValue, setClientIdValue] = useState('');
  const [jobValue, setJobValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const selectedItem = useSelector((store) => store.positions.selectedItem);
  const loading = useSelector((store) => store.positions.isLoading);
  const error = useSelector((store) => store.positions.error);
  const dispatch = useDispatch();
  const history = useHistory();

  const params = useQuery();
  const positionId = params.get('id');

  useEffect(() => {
    if (positionId) {
      dispatch(getPositionById(positionId));
    }
  }, []);

  useEffect(() => {
    if (positionId) {
      if (Object.keys(selectedItem).length) {
        setClientIdValue(selectedItem.clientId);
        setJobValue(selectedItem.job);
        setDescriptionValue(selectedItem.description);
      }
    }
  }, [selectedItem]);

  const values = {
    clientId: clientIdValue,
    job: jobValue,
    description: descriptionValue
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
    history.replace('/admin/positions/list');
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
          content={positionId ? 'Update Position' : 'Create position'}
          disabled={disableButton}
        />
      </form>
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => dispatch(clearPositionsError())}
        type={'Error'}
      />
    </div>
  );
}

export default Form;