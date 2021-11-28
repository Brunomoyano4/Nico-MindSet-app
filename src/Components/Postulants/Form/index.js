import { useState } from 'react';
import styles from './form.module.css';
import Input from '../Input';
import ExperienceForm from '../ExperienceForm';

function Form() {
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [userValue, setUserNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [birthdayValue, setBirthdayValue] = useState('');
  const [streetValue, setStreetValue] = useState('');
  const [streetNumberValue, setStreetNumberValue] = useState('');
  const [zipCodeValue, setZipCodeValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [provinceValue, setProvinceValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [telephoneValue, setTelephoneValue] = useState('');
  const [experienceList, setExperienceList] = useState([]);

  const params = new URLSearchParams(window.location.search);
  const postulantId = params.get('id');

  let url = `${process.env.REACT_APP_API}/postulants`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: firstNameValue,
      lastName: lastNameValue,
      userName: userValue,
      email: emailValue,
      password: passwordValue,
      birthDate: birthdayValue,
      street: streetValue,
      streetNumber: streetNumberValue,
      city: cityValue,
      postalCode: zipCodeValue,
      province: provinceValue,
      country: countryValue,
      telephone: telephoneValue,
      experience: [
        {
          jobPosition: 'test',
          employer: 'test',
          startDate: '1-2-2021',
          endDate: '3-4-2021',
          description: 'test'
        }
      ]
    })
  };

  if (postulantId) {
    options.method = 'PUT';
    url = `${process.env.REACT_APP_API}/postulants/${postulantId}`;
  } else {
    options.method = 'POST';
    url = `${process.env.REACT_APP_API}/postulants`;
  }

  const onAddBtnClick = (event) => {
    setExperienceList(experienceList.concat(<ExperienceForm key={experienceList.length} />));
  };

  const onChangeFirstNameValue = (event) => {
    setFirstNameValue(event.target.value);
  };
  const onChangeLastNameValue = (event) => {
    setLastNameValue(event.target.value);
  };
  const onChangeUserValue = (event) => {
    setUserNameValue(event.target.value);
  };
  const onChangeEmailValue = (event) => {
    setEmailValue(event.target.value);
  };
  const onChangePasswordValue = (event) => {
    setPasswordValue(event.target.value);
  };
  const onChangeBirthdayValue = (event) => {
    const birthday = `${event.target.value}`;
    setBirthdayValue(birthday);
  };
  const onChangeStreetValue = (event) => {
    setStreetValue(event.target.value);
  };
  const onChangeStreetNumberValue = (event) => {
    setStreetNumberValue(event.target.value);
  };
  const onChangeZipCodeValue = (event) => {
    setZipCodeValue(event.target.value);
  };
  const onChangeCityValue = (event) => {
    setCityValue(event.target.value);
  };
  const onChangeProvinceValue = (event) => {
    setProvinceValue(event.target.value);
  };
  const onChangeCountryValue = (event) => {
    setCountryValue(event.target.value);
  };
  const onChangeTelephoneValue = (event) => {
    setTelephoneValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then(() => {
        console.log('ta bom');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2>Form</h2>
        <Input
          name="name"
          value={firstNameValue}
          onChange={onChangeFirstNameValue}
          placeholder="First name"
          pattern="[a-zA-Z]+"
          required
        />
        <Input
          name="lastName"
          value={lastNameValue}
          onChange={onChangeLastNameValue}
          placeholder="Last name"
          pattern="[a-zA-Z]+"
          required
        />
        <Input
          name="userValue"
          value={userValue}
          onChange={onChangeUserValue}
          placeholder="Username"
          required
        />
        <Input
          name="mailValue"
          value={emailValue}
          onChange={onChangeEmailValue}
          placeholder="Email"
          required
        />
        <Input
          name="passwordValue"
          value={passwordValue}
          onChange={onChangePasswordValue}
          placeholder="Password"
          required
        />
        <Input
          name="birthdayValue"
          value={birthdayValue}
          onChange={onChangeBirthdayValue}
          type="date"
          required
        />
        <Input
          name="streetValue"
          value={streetValue}
          onChange={onChangeStreetValue}
          placeholder="Street"
          required
        />
        <Input
          name="streetNumberValue"
          value={streetNumberValue}
          onChange={onChangeStreetNumberValue}
          placeholder="Street number"
          type="number"
          min="0"
          required
        />
        <Input
          name="zipCodeValue"
          value={zipCodeValue}
          onChange={onChangeZipCodeValue}
          placeholder="Zip Code"
          title="Zip code should only contain numbers"
          required
        />
        <Input
          name="cityValue"
          value={cityValue}
          onChange={onChangeCityValue}
          placeholder="City"
          required
        />
        <Input
          name="provinceValue"
          value={provinceValue}
          onChange={onChangeProvinceValue}
          placeholder="Province"
          required
        />
        <Input
          name="countryValue"
          value={countryValue}
          onChange={onChangeCountryValue}
          placeholder="Country"
          required
        />
        <Input
          name="telephoneValue"
          value={telephoneValue}
          onChange={onChangeTelephoneValue}
          placeholder="Telephone"
          required
        />
        <h2>Postulant Experience</h2>
        <button className="addExperienceForm" onClick={onAddBtnClick} type="button">
          +
        </button>
        {experienceList}
        <button className={styles.button} type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default Form;
