import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Input from '../Input';
import styles from './form.module.css';

function Form() {
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState('');

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

  if (adminId) {
    useEffect(() => {
      fetch(`${process.env.REACT_APP_API}/admins/${adminId}`)
        .then((response) => response.json())
        .then((response) => setInputValues(response))
        .catch((error) => setError(error));
    }, []);
  }

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if (adminId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/admins/${adminId}`;
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/admins`;
    }
    fetch(url, options)
      .then(() => history.replace('/admins'))
      .catch((error) => setError(error));
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2>Admin Form</h2>
      </div>
      <div className={styles.formContainer}>
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
              name="Username"
              placeholder="Username"
              type="text"
              required
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
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
          {error && <div className={styles.error}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Form;
