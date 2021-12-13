import { useLocation, useHistory } from 'react-router-dom';
import Modal from '../../Shared/Modal';
import React, { useState, useEffect } from 'react';
import Input from '../../Shared/Input';
import styles from './form.module.css';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import Button from '../../Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addClient, updateClient } from '../../../redux/clients/thunks';
import { clearClientsError } from '../../../redux/clients/actions';

function Form() {
  const dispatch = useDispatch();
  const [nameValue, setNameValue] = useState('');
  const [branchValue, setBranchValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const error = useSelector((store) => store.clients.error);
  const data = useSelector((store) => store.clients.list);
  const loading = useSelector((store) => store.clients.isLoading);
  const history = useHistory();
  const params = useQuery();
  const clientId = params.get('id');
  const setInputValues = ({ customerName, branch, phone, email, description }) => {
    setNameValue(customerName || 'Name');
    setBranchValue(branch || 'Branch');
    setPhoneValue(phone || 'Phone');
    setEmailValue(email || 'Email');
    setDescriptionValue(description || 'Description');
  };

  const values = {
    customerName: nameValue,
    branch: branchValue,
    phone: phoneValue,
    email: emailValue,
    description: descriptionValue
  };

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    if (clientId) {
      data.forEach((client) => {
        if (client._id === clientId) setInputValues(client);
      });
    }
  }, [clientId]);

  const onSubmit = (event) => {
    event.preventDefault();
    setDisableButton(true);
    if (clientId) {
      dispatch(updateClient(clientId, values));
    } else {
      dispatch(addClient(values));
    }
    history.replace('/clients');
    setDisableButton(false);
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
            name="name"
            placeholder="Customer's Name"
            value={nameValue}
            onChange={(e) => {
              setNameValue(e.target.value);
            }}
            required
          />
          <Input
            className={styles.input}
            name="branch"
            placeholder="Branchs's Name"
            value={branchValue}
            onChange={(e) => {
              setBranchValue(e.target.value);
            }}
            required
          />
          <Input
            className={styles.input}
            name="phone"
            type="number"
            placeholder="Customer's Phone"
            value={phoneValue}
            onChange={(e) => {
              setPhoneValue(e.target.value);
            }}
            required
          />
          <Input
            className={styles.input}
            name="email"
            type="email"
            placeholder="Customer's Email"
            value={emailValue}
            onChange={(e) => {
              setEmailValue(e.target.value);
            }}
            required
          />
          <Input
            className={styles.input}
            name="description"
            placeholder="Customer's Description"
            value={descriptionValue}
            onChange={(e) => {
              setDescriptionValue(e.target.value);
            }}
            required
          />
        </div>
        <Button className={styles.button} content={'SAVE'} disabled={loading || disableButton} />
      </form>
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => dispatch(clearClientsError())}
        type={'Error'}
      />
    </div>
  );
}

export default Form;
