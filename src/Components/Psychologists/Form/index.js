import { useLocation, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../Shared/Input';
import styles from './form.module.css';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import Modal from '../../Shared/Modal';
import Button from '../../Shared/Button';
import { updatePsychologist, addPsychologist } from '../../../redux/psychologists/thunks';
import { clearPsychologistsError } from '../../../redux/psychologists/actions';

function Form() {
  const dispatch = useDispatch();
  const psychologists = useSelector((store) => store.psychologists.list);
  const error = useSelector((store) => store.psychologists.error);
  const loading = useSelector((store) => store.psychologists.isLoading);
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [userNameValue, setUserNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [disableButton, setDisableButton] = useState(false);

  const setInputValues = ({ firstName, lastName, userName, email, password }) => {
    setFirstNameValue(firstName || 'N/A');
    setLastNameValue(lastName || 'N/A');
    setUserNameValue(userName || 'N/A');
    setEmailValue(email || 'N/A');
    setPasswordValue(password || 'N/A');
  };

  const history = useHistory();
  const params = useQuery();
  const psychologistId = params.get('id');

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const values = {
    firstName: firstNameValue,
    lastName: lastNameValue,
    email: emailValue,
    userName: userNameValue,
    password: passwordValue
  };

  useEffect(() => {
    if (psychologistId) {
      psychologists.forEach((psychologist) => {
        if (psychologist._id === psychologistId) setInputValues(psychologist);
      });
    }
  }, [psychologistId]);

  /* if (psychologistId) {
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
  } */

  /* const onSubmit = (event) => {
    event.preventDefault();
    setDisableButton(true);
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
      .catch((error) => {
        setError(error.toString());
        setDisableButton(false);
      });
  }; */

  const onSubmit = (e) => {
    e.preventDefault();
    setDisableButton(true);

    if (psychologistId) {
      let response = dispatch(updatePsychologist(psychologistId, values));
      if (response) {
        history.push('/psychologist');
        setDisableButton(false);
      }
    } else {
      let res = dispatch(addPsychologist(values));
      if (res) {
        history.push('/psychologist');
        setDisableButton(false);
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
