import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPostulant } from 'redux/postulants/thunks';
import { Form, Field } from 'react-final-form';
import Input from 'Components/Shared/Input';
import styles from './register.module.css';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import Button from 'Components/Shared/Button';
import EducationForm from './EducationForm/index';
import arrayMutators from 'final-form-arrays';
import Modal from '../../Shared/Modal';
import { useState } from 'react';

function PostulantsForm() {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.postulants.isLoading);
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (formValues) => {
    dispatch(addPostulant(formValues))
      .then((response) => {
        if (response) {
          history.push(`/postulant?id=${response.payload.mongoDBID}`);
        }
        setShowModal(true);
        setTitle('Postulant created successfully');
      })
      .catch((err) => {
        console.log('Error:', err);
        setTitle('Something happenned creating postulant');
        setShowModal(true);
      });
  };

  const onConfirmModal = () => {
    setShowModal(false);
    history.push('/auth/login');
  };

  const required = (value) => (value ? undefined : 'Required');
  const mustBeNumber = (value) => (/^\d+$/.test(value) ? undefined : 'Numbers Only');
  const mustBeStringNoSpace = (value) => (/^[a-záéíóúñ]+$/i.test(value) ? undefined : 'Text Only');
  const mustBeString = (value) =>
    /^[a-záéíóúñ_]+( [a-záéíóúñ_]+)*$/i.test(value)
      ? undefined
      : 'Text Only - Whitespaces in the middle';
  const mustBeAlphanumeric = (value) =>
    /^[a-z0-9áéíóúñ]+$/i.test(value) ? undefined : 'Alphanumeric Only';
  const mustBeEmail = (value) =>
    /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value) ? undefined : 'Should be a Valid Email';
  const composeValidators =
    (...validators) =>
    (value) =>
      validators.reduce((error, validator) => error || validator(value), undefined);
  const minLength = (value) =>
    value && value.toString().length > 7 ? undefined : 'Minimum Length is 8 characters';

  return (
    <div className={styles.container}>
      <Form
        onSubmit={onSubmit}
        mutators={{
          ...arrayMutators
        }}
        render={({
          handleSubmit,
          form: {
            mutators: { push }
          } // injected from final-form-arrays above
        }) => {
          return (
            <form className={styles.form} onSubmit={handleSubmit}>
              <h2>Form</h2>
              {loading && (
                <div className={styles.spinnerContainer}>
                  <LoadingSpinner />
                </div>
              )}
              <Field
                className={styles.input}
                name="firstName"
                placeholder="First name"
                type="text"
                validate={composeValidators(required, mustBeString)}
                component={Input}
              />
              <Field
                className={styles.input}
                name="lastName"
                placeholder="Last name"
                type="text"
                validate={composeValidators(required, mustBeStringNoSpace)}
                component={Input}
              />
              <Field
                className={styles.input}
                name="userName"
                placeholder="Username"
                type="text"
                validate={composeValidators(required, mustBeAlphanumeric)}
                component={Input}
              />
              <Field
                className={styles.input}
                name="email"
                placeholder="example@foo.com"
                type="email"
                validate={composeValidators(required, mustBeEmail)}
                component={Input}
              />
              <Field
                className={styles.input}
                name="password"
                placeholder="Password"
                type="password"
                validate={composeValidators(required, minLength)}
                component={Input}
              />
              <Field
                className={styles.input}
                name="birthDate"
                type="date"
                validate={required}
                component={Input}
              />
              <Field
                className={styles.input}
                name="street"
                placeholder="Street"
                type="text"
                validate={composeValidators(required, mustBeString)}
                component={Input}
              />
              <Field
                className={styles.input}
                name="streetNumber"
                placeholder="Street number"
                type="number"
                min="0"
                validate={composeValidators(required, mustBeNumber)}
                component={Input}
              />
              <Field
                className={styles.input}
                name="postalCode"
                placeholder="Zip Code"
                type="number"
                min="0"
                validate={composeValidators(required, mustBeNumber)}
                component={Input}
              />
              <Field
                className={styles.input}
                name="city"
                placeholder="City"
                type="text"
                validate={composeValidators(required, mustBeString)}
                component={Input}
              />
              <Field
                className={styles.input}
                name="province"
                placeholder="Province"
                type="text"
                validate={composeValidators(required, mustBeString)}
                component={Input}
              />
              <Field
                className={styles.input}
                name="country"
                placeholder="Country"
                type="text"
                validate={composeValidators(required, mustBeString)}
                component={Input}
              />
              <Field
                className={styles.input}
                name="telephone"
                placeholder="Telephone"
                type="text"
                validate={composeValidators(required, mustBeNumber, minLength)}
                component={Input}
              />
              <h2>Postulant Experience</h2>
              <div className={styles.form}>
                <h3>Job info</h3>
                <Field
                  className={styles.input}
                  name="experience[0].jobPosition"
                  placeholder="Job Position"
                  type="text"
                  validate={composeValidators(required, mustBeString)}
                  component={Input}
                />
                <Field
                  className={styles.input}
                  name="experience[0].employer"
                  placeholder="Employer"
                  type="text"
                  validate={composeValidators(required, mustBeString)}
                  component={Input}
                />
                <Field
                  className={styles.input}
                  name="experience[0].startDate"
                  placeholder="Start date"
                  type="date"
                  validate={required}
                  component={Input}
                />
                <Field
                  className={styles.input}
                  name="experience[0].endDate"
                  placeholder="End date"
                  type="date"
                  validate={required}
                  component={Input}
                />
                <Field
                  className={styles.input}
                  name="experience[0].description"
                  placeholder="Description"
                  type="text"
                  validate={required}
                  component={Input}
                />
              </div>
              <h2>Education</h2>
              <EducationForm formArrayPush={push} />
              <Button className={styles.button} content={'SAVE'} />
            </form>
          );
        }}
      />
      <Modal
        title={title}
        show={showModal}
        onConfirm={onConfirmModal}
        closeModal={onConfirmModal}
      />
    </div>
  );
}

export default PostulantsForm;
