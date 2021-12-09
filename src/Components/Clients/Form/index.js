import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';

function Form() {
  const [nameValue, setNameValue] = useState('');
  const [branchValue, setBranchValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [paramId, setParamId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const history = useHistory();
  const params = useQuery();
  const clientId = params.get('id');

  useEffect(() => {
    if (clientId) {
      setLoading(true);
      setParamId(clientId);
      fetch(`${process.env.REACT_APP_API}/clients/${clientId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ msg }) => {
              throw new Error(msg);
            });
          }
          return response.json();
        })
        .then((response) => {
          setNameValue(response.customerName);
          setBranchValue(response.branch);
          setPhoneValue(response.phone);
          setEmailValue(response.email);
          setDescriptionValue(response.description);
        })
        .catch((error) => setError(error.toString()))
        .finally(() => setLoading(false));
    }
  }, []);

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const onChangeNameInput = (event) => {
    setNameValue(event.target.value);
  };
  const onChangeBranchInput = (event) => {
    setBranchValue(event.target.value);
  };
  const onChangePhoneInput = (event) => {
    setPhoneValue(event.target.value);
  };
  const onChangeEmailInput = (event) => {
    setEmailValue(event.target.value);
  };
  const onChangeDescriptionInput = (event) => {
    setDescriptionValue(event.target.value);
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
        customerName: nameValue,
        branch: branchValue,
        phone: phoneValue,
        email: emailValue,
        description: descriptionValue
      })
    };

    if (paramId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/clients/${paramId}`;
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/clients`;
    }

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return response.json();
      })
      .then(() => history.replace('/clients'))
      .catch((error) => {
        setError(error.toString());
        setDisableButton(false);
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2>Form</h2>
        <div className={styles.form}>
          <Modal
            title="Something went wrong!"
            subtitle={error}
            show={error}
            closeModal={() => setError('')}
            type={'Error'}
          />
          {loading && (
            <div className={styles.spinnerContainer}>
              <LoadingSpinner />
            </div>
          )}
          <Input
            className={styles.input}
            name="name"
            placeholder="Customer's Name"
            value={nameValue}
            onChange={onChangeNameInput}
            required
          />
          <Input
            className={styles.input}
            name="branch"
            placeholder="Branchs's Name"
            value={branchValue}
            onChange={onChangeBranchInput}
            required
          />
          <Input
            className={styles.input}
            name="phone"
            placeholder="Customer's Phone"
            value={phoneValue}
            onChange={onChangePhoneInput}
            required
          />
          <Input
            className={styles.input}
            name="email"
            placeholder="Customer's Email"
            value={emailValue}
            onChange={onChangeEmailInput}
            required
          />
          <Input
            className={styles.input}
            name="description"
            placeholder="Customer's Description"
            value={descriptionValue}
            onChange={onChangeDescriptionInput}
            required
          />
        </div>
        <Button
          className={styles.button}
          onClick={onSubmit}
          content={'SAVE'}
          disabled={loading || disableButton}
        />
      </form>
    </div>
  );
}

export default Form;
