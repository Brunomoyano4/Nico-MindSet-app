import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Input from '../Input';
import styles from './form.module.css';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import Modal from '../../Shared/Modal';

function Form() {
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [userNameValue, setUserNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const setInputValues = ({ firstName, lastName, userName, email, password }) => {
    setFirstNameValue(firstName || 'N/A');
    setLastNameValue(lastName || 'N/A');
    setUserNameValue(userName || 'N/A');
    setEmailValue(email || 'N/A');
    setPasswordValue(password || 'N/A');
  };

  let url;
  const history = useHistory();
  const params = useQuery();
  const psychologistId = params.get('id');

  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      userName: userNameValue,
      password: passwordValue
    })
  };

  if (psychologistId) {
    useEffect(() => {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API}/psychologists/${psychologistId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ msg }) => {
              throw new Error(msg);
            });
          }
          return response.json();
        })
        .then((data) => setInputValues(data))
        .catch((error) => setError(error.toString()))
        .finally(() => setLoading(false));
    }, []);
  }

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if (psychologistId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/psychologists/${psychologistId}`;
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/psychologists`;
    }
    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return history.replace('/psychologists');
      })
      .catch((error) => setError(error.toString()));
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2>Psychologist Form</h2>
      </div>
      <div className={styles.formContainer}>
        {loading && (
          <div className={styles.spinnerContainer}>
            <LoadingSpinner />
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className={styles.inputContainer}>
            <Input
              name="First Name"
              placeholder="First name"
              type="text"
              required
              value={firstNameValue}
              onChange={(e) => setFirstNameValue(e.target.value)}
              pattern="[a-zA-Z\s]+"
            />
            <Input
              name="Last Name"
              placeholder="Last name"
              type="text"
              required
              value={lastNameValue}
              onChange={(e) => setLastNameValue(e.target.value)}
              pattern="[a-zA-Z\s]+"
            />
            <Input
              name="User Name"
              placeholder="User Name"
              type="text"
              required
              value={userNameValue}
              onChange={(e) => setUserNameValue(e.target.value)}
              pattern="[a-zA-Z0-9\s]+"
            />
            <Input
              name="Email"
              placeholder="example@foo.com"
              type="email"
              required
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
            <Input
              name="password"
              placeholder="Password"
              type="password"
              required
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
            />
          </div>
          <div className={styles.saveBtnSection}>
            <button className={styles.saveBtn} type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
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
