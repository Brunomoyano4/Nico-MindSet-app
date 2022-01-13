import styles from './inputModal.module.css';
import React, { useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'Components/Shared/Button';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import { getPostulantById, updatePostulant } from 'redux/postulants/thunks';
import { clearPostulantsError, cleanSelectedItem } from 'redux/postulants/actions';
import Input from 'Components/Shared/Input';

function Modal(props) {
  const dispatch = useDispatch();
  const selectedItem = useSelector((store) => store.postulants.selectedItem);
  const loading = useSelector((store) => store.postulants.isLoading);
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

  if (!props.show) {
    return null;
  }

  useEffect(() => {
    if (props.postulant) {
      dispatch(getPostulantById(props.postulant._id));
    }
    return () => {
      dispatch(cleanSelectedItem());
    };
  }, []);

  const onCloseModal = (event) => {
    event.stopPropagation();
    props.closeModal(event);
  };

  const onSubmit = (formValues) => {
    dispatch(updatePostulant(props.postulant._id, formValues));

    history.replace('/admin/postulants/list');
  };

  const setModalContent = (type) => {
    if (type) {
      switch (type) {
        case 'postulant':
          return (
            <>
              <span className={styles.modalData}>
                <Form
                  onSubmit={onSubmit}
                  initialValues={selectedItem}
                  render={(formProps) => (
                    <form className={styles.form} onSubmit={formProps.handleSubmit}>
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
                      <Button
                        className={styles.button}
                        content={'SAVE'}
                        disabled={
                          loading ||
                          formProps.submitting ||
                          formProps.pristine ||
                          formProps.hasValidationErrors
                        }
                      />
                    </form>
                  )}
                />
              </span>
            </>
          );
        case 'psychologist':
          return <span className={styles.succesfullSession}>{type.status}</span>;
        case 'postulantProfile':
          return <span className={styles.cancelledSession}>{type.status}</span>;
      }
    }
  };

  return (
    <div className={styles.container} onClick={(e) => onCloseModal(e)}>
      <div className={styles.modal}>
        <div>
          <h2 className={styles.title}>{props.title}</h2>
          <span className={styles.subtitle}>{props.subtitle}</span>
        </div>
        {setModalContent(props.type)}
      </div>
    </div>
  );
}

export default Modal;
