import { useLocation, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import Modal from 'Components/Shared/Modal';
import Input from 'Components/Shared/Input';
import styles from './form.module.css';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import Button from 'Components/Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getPostulantById, addPostulant, updatePostulant } from 'redux/postulants/thunks';
import { clearPostulantsError, cleanSelectedItem } from 'redux/postulants/actions';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

function PostulantsForm(props) {
  const dispatch = useDispatch();
  const selectedItem = useSelector((store) => store.postulants.selectedItem);
  const error = useSelector((store) => store.postulants.error);
  const loading = useSelector((store) => store.postulants.isLoading);
  const history = useHistory();
  const params = useQuery();
  const postulantId = params.get('id');

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    if (!props.edit) {
      if (postulantId) {
        dispatch(getPostulantById(postulantId));
      }
      return () => {
        dispatch(cleanSelectedItem());
      };
    }
  }, []);

  const onSubmit = (formValues) => {
    if (!props.edit) {
      if (postulantId) {
        dispatch(updatePostulant(postulantId, formValues));
      } else {
        dispatch(addPostulant(formValues));
      }
      history.replace('/admin/postulants/list');
    }
    dispatch(updatePostulant(postulantId, formValues)).then(history.go(0));
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
        initialValues={selectedItem}
        render={({ handleSubmit }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Personal Info</h2>
            {loading && (
              <div className={styles.spinnerContainer}>
                <LoadingSpinner />
              </div>
            )}
            <label htmlFor="postulantFirstName">First Name</label>
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
            <h3>Elementary School</h3>
            <Field
              className={styles.input}
              name="studies.primaryStudies.school"
              placeholder="Elementary School"
              type="text"
              validate={required}
              component={Input}
            />
            <Field
              className={styles.input}
              name="studies.primaryStudies.startDate"
              type="date"
              validate={required}
              component={Input}
            />
            <Field
              className={styles.input}
              name="studies.primaryStudies.endDate"
              type="date"
              validate={required}
              component={Input}
            />
            <h3>High School</h3>
            <Field
              className={styles.input}
              name="studies.secondaryStudies.school"
              placeholder="High Shool"
              type="text"
              validate={required}
              component={Input}
            />
            <Field
              className={styles.input}
              name="studies.secondaryStudies.startDate"
              type="date"
              validate={required}
              component={Input}
            />
            <Field
              className={styles.input}
              name="studies.secondaryStudies.endDate"
              type="date"
              validate={required}
              component={Input}
            />
            <h3>Tertiary Studies</h3>
            <Field
              className={styles.input}
              name={`studies.tertiaryStudies[0].institute`}
              placeholder="Study Institute Name"
              type="text"
              component={Input}
            />
            <Field
              className={styles.input}
              name={`studies.tertiaryStudies[0].description`}
              placeholder="Study Institute description"
              type="text"
              component={Input}
            />
            <Field
              className={styles.input}
              name={`studies.tertiaryStudies[0].startDate`}
              type="date"
              component={Input}
            />
            <Field
              className={styles.input}
              name={`studies.tertiaryStudies[0].endDate`}
              type="date"
              component={Input}
            />
            <h3>University Studies</h3>
            <Field
              className={styles.input}
              name={`studies.universityStudies[0].institute`}
              placeholder="Study Institute Name"
              type="text"
              component={Input}
            />
            <Field
              className={styles.input}
              name={`studies.universityStudies[0].description`}
              placeholder="Study Institute description"
              type="text"
              component={Input}
            />
            <Field
              className={styles.input}
              name={`studies.universityStudies[0].startDate`}
              type="date"
              component={Input}
            />
            <Field
              className={styles.input}
              name={`studies.universityStudies[0].endDate`}
              type="date"
              component={Input}
            />
            <h3>Informal Studies</h3>
            <Field
              className={styles.input}
              name={`studies.informalStudies[0].institute`}
              placeholder="Study Institute Name"
              type="text"
              component={Input}
            />
            <Field
              className={styles.input}
              name={`studies.informalStudies[0].description`}
              placeholder="Study Institute description"
              type="text"
              component={Input}
            />
            <Field
              className={styles.input}
              name={`studies.informalStudies[0].startDate`}
              type="date"
              component={Input}
            />
            <Field
              className={styles.input}
              name={`studies.informalStudies[0].endDate`}
              type="date"
              component={Input}
            />
            <Button className={styles.button} content={'SAVE'} />
          </form>
        )}
      />
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => dispatch(clearPostulantsError())}
        type={'Error'}
      />
    </div>
  );
}

export default PostulantsForm;
