import { useLocation, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styles from './adminsForm.module.css';
import Modal from 'Components/Shared/Modal';
import Input from 'Components/Shared/Input';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import Button from 'Components/Shared/Button';

function Form() {
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const setInputValues = ({ firstName, lastName, username, email, password }) => {
    setFirstNameValue(firstName || 'N/A');
    setLastNameValue(lastName || 'N/A');
    setUsernameValue(username || 'N/A');
    setEmailValue(email || 'N/A');
    setPasswordValue(password || 'N/A');
  };

  let url;
  const history = useHistory();
  const params = useQuery();
  const adminId = params.get('id');

  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      username: usernameValue,
      password: passwordValue
    })
  };

  useEffect(() => {
    if (adminId) {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API}/admins/${adminId}`)
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
    }
  }, []);

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setDisableButton(true);
    if (adminId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/admins/${adminId}`;
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/admins`;
    }
    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return (window.location.href = '/admins');
      })
      .then(() => history.replace('admin/admins'))
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
          {loading && (
            <div className={styles.spinnerContainer}>
              <LoadingSpinner />
            </div>
          )}
          <Input
            className={styles.input}
            name="First Name"
            placeholder="First name"
            type="text"
            required
            value={firstNameValue}
            onChange={(e) => setFirstNameValue(e.target.value)}
            pattern="[a-zA-Z\s]+"
          />
          <Input
            className={styles.input}
            name="Last Name"
            placeholder="Last name"
            type="text"
            required
            value={lastNameValue}
            onChange={(e) => setLastNameValue(e.target.value)}
            pattern="[a-zA-Z\s]+"
          />
          <Input
            className={styles.input}
            name="Username"
            placeholder="Username"
            type="text"
            required
            value={usernameValue}
            onChange={(e) => setUsernameValue(e.target.value)}
            pattern="[a-zA-Z0-9\s]+"
          />
          <Input
            className={styles.input}
            name="Email"
            placeholder="example@foo.com"
            type="email"
            required
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
          <Input
            className={styles.input}
            name="password"
            placeholder="Password"
            type="password"
            required
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </div>
        <Button
          className={styles.button}
          onClick={onSubmit}
          content={'SAVE'}
          disabled={loading || disableButton}
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
