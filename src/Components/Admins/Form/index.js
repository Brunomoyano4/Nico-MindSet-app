import { useState } from 'react';
import styles from './form.module.css';
function Form() {
  const [firstNameValue, setFirstNameValue] = useState('');
  const changeFirstNameInput = (event) => {
    setFirstNameValue(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    saveButton.disabled = true;

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: nameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        username: usernameInput.value,
        password: passwordInput.value  
      })
    };
    const url = `${window.location.origin}/api/admins/${params.get('adminId')}`;
    if (params.get('adminId')) {
      options.method = 'PUT';
    } else {
      options.method = 'POST';
      url = `${window.location.origin}/api/admins`;
    }

    fetch(`${window.location.origin}/api/admins/${params.get('adminId')}`, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ ErrMessage }) => {
            throw new Error(ErrMessage);
          });
        }
        return response.json();
      })
      .then(() => {
        window.location.href = `${window.location.origin}/views/adminsList.html`;
      })
      .catch((error) => {
        errorMessage.innerText = error;
      })
      .finally(() => {
        saveButton.disabled = false;
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
          onChange={changeFirstNameInput}
        />
        <input
          id="lastName"
          name="last name"
          placeholder="Your last name"
          type="text"
          //required
          className={styles.input}
        />
        <input
          id="username"
          name="username"
          placeholder="Your username"
          type="text"
          //required
          className={styles.input}
        />
        <input
          id="email"
          name="email"
          placeholder="Your email"
          type="text"
          //required
          className={styles.input}
        />
        <input
          id="password"
          name="password"
          placeholder="Your password"
          type="text"
          //required
          className={styles.input}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Form;
