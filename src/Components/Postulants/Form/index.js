import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './postulantsForm.module.css';
import Input from '../../Shared/Input';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import Button from '../../Shared/Button';

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
  const [jobPositionValue, setJobPositionValue] = useState('');
  const [employerValue, setEmployerValue] = useState('');
  const [startDateValue, setStartDateValue] = useState('');
  const [endDateValue, setEndDateValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const setInputValues = (data) => {
    setFirstNameValue(data.firstName || '-');
    setLastNameValue(data.lastName || '-');
    setUserNameValue(data.userName || '-');
    setEmailValue(data.email || '-');
    setPasswordValue(data.password || '-');
    setBirthdayValue(data.birthDate || '-');
    setStreetValue(data.street || '-');
    setStreetNumberValue(data.streetNumber || '-');
    setZipCodeValue(data.postalCode || '-');
    setCityValue(data.city || '-');
    setProvinceValue(data.province || '-');
    setCountryValue(data.country || '-');
    setTelephoneValue(data.telephone || '-');
    setJobPositionValue(data.experience[0].jobPosition || '-');
    setEmployerValue(data.experience[0].employer || '-');
    setStartDateValue(data.experience[0].startDate || '-');
    setEndDateValue(data.experience[0].endDate || '-');
    setDescriptionValue(data.experience[0].description || '-');
  };

  const history = useHistory();
  const params = useQuery();
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
          jobPosition: jobPositionValue,
          employer: employerValue,
          startDate: startDateValue,
          endDate: endDateValue,
          description: descriptionValue
        }
      ]
    })
  };
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    if (postulantId) {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API}/postulants/${postulantId}`)
        .then((response) => response.json())
        .then((response) => {
          setInputValues(response);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
  }, []);

  if (postulantId) {
    options.method = 'PUT';
    url = `${process.env.REACT_APP_API}/postulants/${postulantId}`;
  } else {
    options.method = 'POST';
    url = `${process.env.REACT_APP_API}/postulants`;
  }

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
      .then(() => history.replace('/postulants'))
      .catch((error) => setError(error));
  };
  return (
    <div className={styles.container}>
      <p className={styles.error}>{error}</p>
      <form className={styles.form} onSubmit={onSubmit}>
        {loading && (
          <div className={styles.spinnerContainer}>
            <LoadingSpinner />
          </div>
        )}
        <h2>Form</h2>
        <Input
          name="firstName"
          value={firstNameValue}
          onChange={(e) => setFirstNameValue(e.target.value)}
          placeholder="First name"
          pattern="[a-zA-Z]+"
          required
        />
        <Input
          className={styles.input}
          name="lastName"
          value={lastNameValue}
          onChange={(e) => setLastNameValue(e.target.value)}
          placeholder="Last name"
          pattern="[a-zA-Z]+"
          required
        />
        <Input
          className={styles.input}
          name="userValue"
          value={userValue}
          onChange={(e) => setUserNameValue(e.target.value)}
          placeholder="Username"
          required
        />
        <Input
          className={styles.input}
          name="mailValue"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          placeholder="Email"
          required
        />
        <Input
          className={styles.input}
          name="passwordValue"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          placeholder="Password"
          required
        />
        <Input
          className={styles.input}
          name="birthdayValue"
          value={birthdayValue}
          onChange={(e) => setBirthdayValue(e.target.value)}
          type="date"
          required
        />
        <Input
          className={styles.input}
          name="streetValue"
          value={streetValue}
          onChange={(e) => setStreetValue(e.target.value)}
          placeholder="Street"
          required
        />
        <Input
          className={styles.input}
          name="streetNumberValue"
          value={streetNumberValue}
          onChange={(e) => setStreetNumberValue(e.target.value)}
          placeholder="Street number"
          type="number"
          min="0"
          required
        />
        <Input
          className={styles.input}
          name="zipCodeValue"
          value={zipCodeValue}
          onChange={(e) => setZipCodeValue(e.target.value)}
          placeholder="Zip Code"
          title="Zip code should only contain numbers"
          required
        />
        <Input
          className={styles.input}
          name="cityValue"
          value={cityValue}
          onChange={(e) => setCityValue(e.target.value)}
          placeholder="City"
          required
        />
        <Input
          className={styles.input}
          name="provinceValue"
          value={provinceValue}
          onChange={(e) => setProvinceValue(e.target.value)}
          placeholder="Province"
          required
        />
        <Input
          className={styles.input}
          name="countryValue"
          value={countryValue}
          onChange={(e) => setCountryValue(e.target.value)}
          placeholder="Country"
          required
        />
        <Input
          className={styles.input}
          name="telephoneValue"
          value={telephoneValue}
          onChange={(e) => setTelephoneValue(e.target.value)}
          placeholder="Telephone"
          required
        />
        <h2>Postulant Experience</h2>
        <div className={styles.form}>
          <h3>Job info</h3>
          <Input
            className={styles.input}
            name="jobPositionValue"
            placeholder="Job Position"
            value={jobPositionValue}
            onChange={(e) => setJobPositionValue(e.target.value)}
            required
          />
          <Input
            className={styles.input}
            name="employerValue"
            placeholder="Employer"
            value={employerValue}
            onChange={(e) => setEmployerValue(e.target.value)}
            required
          />
          <Input
            className={styles.input}
            name="startDateValue"
            type="text"
            value={startDateValue}
            onFocus={(e) => {
              e.currentTarget.type = 'date';
              e.currentTarget.focus();
            }}
            onBlur={(e) => {
              e.currentTarget.type = 'text';
              e.currentTarget.focus();
            }}
            onChange={(e) => setStartDateValue(e.target.value)}
            placeholder="Start date"
            required
          />
          <Input
            className={styles.input}
            name="endDateValue"
            type="text"
            value={endDateValue}
            onFocus={(e) => {
              e.currentTarget.type = 'date';
              e.currentTarget.focus();
            }}
            onBlur={(e) => {
              e.currentTarget.type = 'text';
              e.currentTarget.focus();
            }}
            onChange={(e) => setEndDateValue(e.target.value)}
            placeholder="End date"
            required
          />
          <Input
            className={styles.input}
            name="descriptionValue"
            placeholder="Description"
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            required
          />
        </div>
        <Button onClick={onSubmit} content={'SAVE'} />
      </form>
    </div>
  );
}

export default Form;
