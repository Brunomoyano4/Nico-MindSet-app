import { useLocation, useHistory } from 'react-router-dom';
import Modal from '../../Shared/Modal';
import React, { useState, useEffect } from 'react';
import Input from '../../Shared/Input';
import styles from './adminsForm.module.css';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import Button from '../../Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addAdmin, updateAdmin, getAdmin } from '../../../redux/admins/thunks';

function Form() {
  const dispatch = useDispatch();
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const data = useSelector((store) => store.admins.admin);

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
      // setLoading(true);
      dispatch(getAdmin(adminId));
      setInputValues(data);
      // .finally(() => setLoading(false));
    }
  }, [dispatch]);

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setDisableButton(true);
    if (adminId) {
      dispatch(
        updateAdmin(adminId, {
          firstName: firstNameValue,
          lastName: lastNameValue,
          email: emailValue,
          username: usernameValue,
          password: passwordValue
        })
      );
      history.replace('/admins');
      setDisableButton(false);
    } else {
      dispatch(
        addAdmin({
          firstName: firstNameValue,
          lastName: lastNameValue,
          email: emailValue,
          username: usernameValue,
          password: passwordValue
        })
      );
      history.replace('/admins');
      setDisableButton(false);
    }
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
