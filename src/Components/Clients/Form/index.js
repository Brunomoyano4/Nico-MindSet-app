import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Input from '../Input/index';

function Form() {
  const [nameValue, setNameValue] = useState('');
  const [branchValue, setBranchValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [paramId, setParamId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const clientId = params.get('id');

    if (clientId) {
      setParamId(clientId);
      fetch(`${process.env.REACT_APP_API}/clients/${clientId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Could not fetch data properly');
          }
          return response.json();
        })
        .then((response) => {
          setNameValue(response.customerName);
          setBranchValue(response.branch);
          setPhoneValue(response.phone);
          setEmailValue(response.email);
          setDescriptionValue(response.description);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, []);

  const onChangeNameInput = (event) => {
    setNameValue(event.target.value);
  };
  const onChangeBranchInput = (event) => {
    setBranchValue(event.target.value);
  };
  const onChangePhoneInput = (event) => {
    setPhoneValue(event.target.value);
  };
  const onChangeEmailInput = (event) => {
    setEmailValue(event.target.value);
  };
  const onChangeDescriptionInput = (event) => {
    setDescriptionValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    let url = '';

    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerName: nameValue,
        branch: branchValue,
        phone: phoneValue,
        email: emailValue,
        description: descriptionValue
      })
    };

    if (paramId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/clients/${paramId}`;
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/clients`;
    }

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('BAD REQUEST');
        }
        return response.json();
      })
      .then(() => {
        window.location.href = `${window.location.origin}/clients`;
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h1>CLIENTS FORM</h1>
        <h4>{error}</h4>
        <Input
          name="name"
          placeholder="Customer's Name"
          value={nameValue}
          onChange={onChangeNameInput}
          required
        />
        <Input
          name="branch"
          placeholder="Branchs's Name"
          value={branchValue}
          onChange={onChangeBranchInput}
          required
        />
        <Input
          name="phone"
          placeholder="Customer's Phone"
          value={phoneValue}
          onChange={onChangePhoneInput}
          required
        />
        <Input
          name="email"
          placeholder="Customer's Email"
          value={emailValue}
          onChange={onChangeEmailInput}
          required
        />
        <Input
          name="description"
          placeholder="Customer's Description"
          value={descriptionValue}
          onChange={onChangeDescriptionInput}
          required
        />
        <button className={styles.button} value="Send" type="submit">
          SAVE
        </button>
      </form>
    </div>
  );
}

export default Form;
