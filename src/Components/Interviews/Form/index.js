import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Select from '../Select';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';

function Form() {
  const [positionIdValue, setPositionIdValue] = useState('');
  const [postulantIdValue, setPostulantIdValue] = useState('');
  const [dateTimeValue, setDateTimeValue] = useState('');
  const [statusValue, setStatusValue] = useState([]);
  const [paramId, setParamId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const history = useHistory();
  const params = useQuery();
  const interviewsId = params.get('id');

  useEffect(() => {
    if (interviewsId) {
      setLoading(true);
      setParamId(interviewsId);
      fetch(`${process.env.REACT_APP_API}/interviews/${interviewsId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ msg }) => {
              throw new Error(msg);
            });
          }
          return response.json();
        })
        .then((data) => {
          setPositionIdValue(data[0].positionId);
          setPostulantIdValue(data[0].postulantId);
          setDateTimeValue(data[0].dateTime);
          setStatusValue(data[0].status);
        })
        .catch((error) => setError(error.toString()))
        .finally(() => setLoading(false));
    }
  }, []);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const onChangePositionIdInput = (event) => {
    setPositionIdValue(event.target.value);
  };
  const onChangePostulantIdInput = (event) => {
    setPostulantIdValue(event.target.value);
  };
  const onChangeDateTimeInput = (event) => {
    setDateTimeValue(event.target.value);
  };
  const onChangeStatusInput = (event) => {
    setStatusValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setDisableButton(true);
    let url = '';
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        positionId: positionIdValue,
        postulantId: postulantIdValue,
        dateTime: dateTimeValue,
        status: statusValue
      })
    };

    if (paramId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/interviews/${paramId}`;
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/interviews`;
    }

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return history.replace('/interviews');
      })
      .catch((error) => setError(error.toString()));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1>INTERVIEWS FORM</h1>
        {loading && (
          <div className={styles.spinnerContainer}>
            <LoadingSpinner />
          </div>
        )}
        <Input
          name="Position Id"
          placeholder="Position's Id"
          value={positionIdValue}
          onChange={onChangePositionIdInput}
          required
        />
        <Input
          name="Postulant Id"
          placeholder="Postulant's Id"
          value={postulantIdValue}
          onChange={onChangePostulantIdInput}
          required
        />
        <Input
          name="Date time"
          placeholder="DD/MM/YYYY HH:MM"
          value={dateTimeValue}
          onChange={onChangeDateTimeInput}
          required
        />
        <Select
          name="Status"
          placeholder="Status"
          value={statusValue}
          onChange={onChangeStatusInput}
          required
          options={[
            { value: 'pending', label: 'Pending' },
            { value: 'cancelled', label: 'Cancelled' },
            { value: 'next step', label: 'Next Step' },
            { value: 'finished', label: 'Finished' }
          ]}
        />
        <Button onClick={onSubmit} content={'SAVE'} disabled={loading || disableButton} />
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
