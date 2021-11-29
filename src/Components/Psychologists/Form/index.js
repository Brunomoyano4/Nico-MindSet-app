import { useState, useEffect } from 'react';
import Input from '../Input';
import styles from './form.module.css';
function Form() {
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [userNameValue, setUserNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const setInputValues = (data) => {
    setFirstNameValue(data.firstName || '-');
    setLastNameValue(data.lastName || '-');
    setUserNameValue(data.userName || '-');
    setEmailValue(data.email || '-');
    setPasswordValue(data.password || '-');
  };

  let url;
  const params = new URLSearchParams(window.location.search);
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
      fetch(`${process.env.REACT_APP_API}/psychologists/${psychologistId}`)
        .then((response) => response.json())
        .then((response) => {
          setInputValues(response);
        });
    }, []);
    options.method = 'PUT';
    url = `${process.env.REACT_APP_API}/psychologists/${psychologistId}`;
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
          return response.json().then(({ ErrMessage }) => {
            throw new Error(ErrMessage);
          });
        }
        return response.json();
      })
      .then(() => {
        window.location.href = '/psychologists';
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2>Psychologist Form</h2>
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
    </div>
  );
}

export default Form;
