import { useState } from 'react';
import styles from './form.module.css';
import Input from '../Input/index';

function Form() {
  const [nameValue, setNameValue] = useState('');
  const [branchValue, setBranchValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

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

    const params = new URLSearchParams(window.location.search);
    const clientId = params.get('id');
    let url = `${process.env.REACT_APP_API}/clients/${clientId}`;

    const options = {
      method: 'POST',
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

    if (clientId) {
      options.method = 'PUT';
    } else {
      options.method = 'POST';
      // eslint-disable-next-line no-const-assign
      url = `${window.location.origin}/api/clients`;
    }

    console.log(params.get('clientId'));

    fetch(url, options).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      return response.json();
    });
    //     .then(() => {
    //       // eslint-disable-next-line no-underscore-dangle
    //       window.location.href = `${window.location.origin}/views/clientsList.html`;
    //     })
    //     .catch((error) => {
    //       error.innerText = error;
    //     });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h1>CLIENTS FORM</h1>
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
        <button className="saveButton" value="Send" type="submit">
          SAVE
        </button>
      </form>
    </div>
  );
}

export default Form;
