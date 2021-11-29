import { useState } from 'react';
import Input from '../Input';
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
    let url;
    const params = new URLSearchParams(window.location.search);
    const adminId = params.get('id');

    const options = {
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
          return response.json().then(({ ErrMessage }) => {
            throw new Error(ErrMessage);
          });
        }
        return response.json();
      })
      .then(() => {
        window.location.href = '/admins';
      });
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
              onChange={onChangeFirstNameInput}
              pattern="[a-zA-Z\s]+"
            />
            <Input
              name="Last Name"
              placeholder="Last name"
              type="text"
              required
              value={lastNameValue}
              onChange={onChangeLastNameInput}
              pattern="[a-zA-Z\s]+"
            />
            <Input
              name="Username"
              placeholder="Username"
              type="text"
              required
              value={userNameValue}
              onChange={onChangeUserNameInput}
              pattern="[a-zA-Z0-9\s]+"
            />
            <Input
              name="Email"
              placeholder="example@foo.com"
              type="email"
              required
              value={emailValue}
              onChange={onChangeEmailInput}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
            <Input
              name="password"
              placeholder="Password"
              type="password"
              required
              value={passwordValue}
              onChange={onChangePasswordInput}
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
