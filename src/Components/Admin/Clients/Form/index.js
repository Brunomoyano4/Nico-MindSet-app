import { useLocation, useHistory } from 'react-router-dom';
import Modal from 'Components/Shared/Modal';
import React, { useState, useEffect } from 'react';
import Input from 'Components/Shared/Input';
import styles from './form.module.css';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import Button from 'Components/Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getClientById, addClient, updateClient } from 'redux/clients/thunks';
import { clearClientsError } from 'redux/clients/actions';

function Form() {
  const dispatch = useDispatch();
  const [nameValue, setNameValue] = useState('');
  const [branchValue, setBranchValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const client = useSelector((store) => store.clients.selectedClient);
  const error = useSelector((store) => store.clients.error);
  const loading = useSelector((store) => store.clients.isLoading);
  const history = useHistory();
  const params = useQuery();
  const clientId = params.get('id');

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
      dispatch(getClientById(clientId));
    }
  }, []);

  useEffect(() => {
    if (clientId) {
      setNameValue(client?.customerName);
      setBranchValue(client?.branch);
      setPhoneValue(client?.phone);
      setEmailValue(client?.email);
      setDescriptionValue(client?.description);
    }
  }, [client]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (clientId) {
      dispatch(updateClient(clientId, values));
    } else {
      dispatch(addClient(values));
    }
    history.replace('/admin/clients/list');
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
        <Button className={styles.button} content={'SAVE'} disabled={loading} />
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
