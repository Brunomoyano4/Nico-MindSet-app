import styles from './form.module.css';
import Modal from '../../Shared/Modal';
import Input from '../../Shared/Input';
import Select from '../../Shared/Select';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../Shared/Button';
import {
  addApplications,
  updateApplications,
  getApplicationsById,
  getApplicationsOptions
} from '../../../redux/applications/thunks';

function Form() {
  const history = useHistory();
  const params = useQuery();
  const applicationId = params.get('id');
  const dispatch = useDispatch();

  const [positionsValue, setPositionsValue] = useState('');
  const [clientValue, setClientValue] = useState('');
  const [postulantsValue, setPostulantsValue] = useState('');
  const [resultValue, setResultValue] = useState('');

  const [disableButton, setDisableButton] = useState(false);
  const error = useSelector((store) => store.applications.error);
  const isLoading = useSelector((store) => store.applications.isLoading);
  const selectedItem = useSelector((store) => store.applications.selectedItem);
  const options = useSelector((store) => store.applications.options);

  useEffect(() => {
    if (applicationId) {
      dispatch(getApplicationsById(applicationId));
    }
    dispatch(getApplicationsOptions('positions'));
    dispatch(getApplicationsOptions('postulants'));
    dispatch(getApplicationsOptions('clients'));
  }, [dispatch]);

  useEffect(() => {
    if (applicationId) {
      if (Object.keys(selectedItem).length) {
        setPositionsValue(selectedItem.positions._id);
        setPostulantsValue(`${selectedItem?.postulants?._id}`);
        setClientValue(selectedItem.client._id);
        setResultValue(selectedItem.result);
      }
    }
  }, [selectedItem]);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setDisableButton(true);
    const values = {
      positions: positionsValue,
      client: clientValue,
      postulants: postulantsValue,
      result: resultValue
    };
    if (applicationId) {
      dispatch(updateApplications(applicationId, values));
    } else {
      dispatch(addApplications(values));
    }
    history.replace('/applications');
    setDisableButton(false);
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <h2>Form</h2>
          <div className={styles.form}>
            <Modal
              title="Something went wrong!"
              subtitle={error}
              show={error}
              closeModal={() => error}
              type={'Error'}
            />
            <h3 className={error ? styles.error : ''}>{error}</h3>
            {Object.values(isLoading).some(Boolean) && (
              <div className={styles.spinnerContainer}>
                <LoadingSpinner />
              </div>
            )}
            <Select
              className={styles.select}
              value={positionsValue}
              onChange={(e) => setPositionsValue(e.target.value)}
              label="Position:"
              id="positions-select"
              options={options.positions}
              required
            />
            <Select
              className={styles.select}
              value={clientValue}
              onChange={(e) => setClientValue(e.target.value)}
              label="Client:"
              id="client-select"
              options={options.clients}
              required
            />
            <Select
              className={styles.select}
              value={postulantsValue}
              onChange={(e) => setPostulantsValue(e.target.value)}
              label="Postulant:"
              id="postulants-select"
              options={options.postulants}
              required
            />
            <Input
              className={styles.input}
              placeholder="Result"
              value={resultValue}
              onChange={(e) => setResultValue(e.target.value)}
              label="Result:"
              id="result-input"
              required
            />
          </div>
          <Button
            className={styles.button}
            content={applicationId ? 'Update Application' : 'Create Application'}
            disabled={disableButton}
          />
        </form>
      </div>
    </>
  );
}

export default Form;
