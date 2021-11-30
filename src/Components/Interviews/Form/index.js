import { useState } from 'react';
import styles from './form.module.css';
import Input from '../Input/index';
import Select from '../Select';

function Form() {
  const [positionIdValue, setPositionIdValue] = useState('');
  const [postulantIdValue, setPostulantIdValue] = useState('');
  const [dateTimeValue, setDateTimeValue] = useState('');
  const [statusValue, setStatusValue] = useState([]);

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

    const params = new URLSearchParams(window.location.search);
    const interviewsId = params.get('id');
    let url = `${process.env.REACT_APP_API}/interviews/${interviewsId}`;

    const options = {
      method: 'POST',
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

    if (interviewsId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/interviews/${interviewsId}`;
    } else {
      options.method = 'POST';
      // eslint-disable-next-line no-const-assign
      url = `${process.env.REACT_APP_API}/interviews`;
    }

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then(() => {
        window.location.href = `${window.location.origin}/interviews`;
      })
      .catch((error) => {
        error.innerText = error;
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h1>INTERVIEWS FORM</h1>
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
        <button className={styles.button} value="Send" type="submit">
          SAVE
        </button>
      </form>
    </div>
  );
}

export default Form;
