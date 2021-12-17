import { useLocation, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from 'Components/Shared/Input';
import styles from './form.module.css';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
import { updatePsychologist, addPsychologist } from 'redux/psychologists/thunks';
import { clearPsychologistsError } from 'redux/psychologists/actions';

function Form() {
  const dispatch = useDispatch();
  const psychologists = useSelector((store) => store.psychologists.list);
  const error = useSelector((store) => store.psychologists.error);
  const loading = useSelector((store) => store.psychologists.isLoading);
  const history = useHistory();
  const params = useQuery();
  const psychologistId = params.get('id');
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [userNameValue, setUserNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [disableButton, setDisableButton] = useState(false);

  const setInputValues = ({ firstName, lastName, userName, email, password }) => {
    setFirstNameValue(firstName || '');
    setLastNameValue(lastName || '');
    setUserNameValue(userName || '');
    setEmailValue(email || '');
    setPasswordValue(password || '');
  };

  const values = {
    firstName: firstNameValue,
    lastName: lastNameValue,
    email: emailValue,
    userName: userNameValue,
    password: passwordValue
  };

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    if (psychologistId) {
      psychologists.forEach((psychologist) => {
        if (psychologist._id === psychologistId) setInputValues(psychologist);
      });
    }
  }, [psychologistId]);

  const onSubmit = (e) => {
    e.preventDefault();
    setDisableButton(true);

    if (psychologistId) {
      let response = dispatch(updatePsychologist(psychologistId, values));
      if (response) {
        setDisableButton(false);
        history.replace('/admin/psychologists/list');
      }
    } else {
      let res = dispatch(addPsychologist(values));
      if (res) {
        setDisableButton(false);
        history.replace('/admin/psychologists/list');
      }
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
            name="User Name"
            placeholder="User Name"
            type="text"
            required
            value={userNameValue}
            onChange={(e) => setUserNameValue(e.target.value)}
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
        closeModal={() => dispatch(clearPsychologistsError())}
        type={'Error'}
      />
    </div>
  );
}

export default Form;
