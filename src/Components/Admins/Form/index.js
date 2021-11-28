import { useState } from 'react';
import styles from './form.module.css';
function Form() {
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [userNameValue, setUserNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const onChangeFirstNameInput = (event) => {
    setFirstNameValue(event.target.value);
  };
  const onChangeLastNameInput = (event) => {
    setLastNameValue(event.target.value);
  };
  const onChangeUserNameInput = (event) => {
    setUserNameValue(event.target.value);
  };
  const onChangeEmailInput = (event) => {
    setEmailValue(event.target.value);
  };
  const onChangePasswordInput = (event) => {
    setPasswordValue(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const adminId = params.get('id');

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        username: userNameValue,
        password: passwordValue
      })
    };
    const url = `${process.env.REACT_APP_API}/admins/${adminId}`;

    fetch(url, options).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ ErrMessage }) => {
          throw new Error(ErrMessage);
        });
      }
      return response.json();
    });
  };
  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Form</h2>
        <input
          id="firstName"
          name="name"
          placeholder="Your first name"
          type="text"
          required
          className={styles.input}
          value={firstNameValue}
          onChange={onChangeFirstNameInput}
        />
        <input
          id="lastName"
          name="last name"
          placeholder="Your last name"
          type="text"
          //required
          className={styles.input}
          value={lastNameValue}
          onChange={onChangeLastNameInput}
        />
        <input
          id="username"
          name="username"
          placeholder="Your username"
          type="text"
          //required
          className={styles.input}
          value={userNameValue}
          onChange={onChangeUserNameInput}
        />
        <input
          id="email"
          name="email"
          placeholder="Your email"
          type="text"
          //required
          className={styles.input}
          value={emailValue}
          onChange={onChangeEmailInput}
        />
        <input
          id="password"
          name="password"
          placeholder="Your password"
          type="text"
          //required
          className={styles.input}
          value={passwordValue}
          onChange={onChangePasswordInput}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Form;
