import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import Input from 'Components/Shared/Input';
import styles from './form.module.css';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPosition,
  getPositionById,
  updatePosition,
  getPositionsOptions
} from 'redux/positions/thunks';
import { clearPositionsError, cleanSelectedPosition } from 'redux/positions/actions';
import { Form, Field } from 'react-final-form';
import Select from 'Components/Shared/Select';

function PositionsForm() {
  const selectedItem = useSelector((store) => store.positions.selectedItem);
  const loading = useSelector((store) => store.positions.isLoading);
  const error = useSelector((store) => store.positions.error);

  const dispatch = useDispatch();
  const history = useHistory();
  const options = useSelector((store) => store.positions.options);

  const params = useQuery();
  const positionId = params.get('id');

  useEffect(() => {
    if (positionId) {
      dispatch(getPositionById(positionId));
    }
    dispatch(getPositionsOptions('profiles'));
    dispatch(getPositionsOptions('clients'));
    dispatch(cleanSelectedPosition());
  }, [dispatch]);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const onSubmit = (formValues) => {
    console.log(options.profiles);
    if (positionId) {
      dispatch(updatePosition(positionId, formValues));
    } else {
      dispatch(addPosition(formValues));
    }
    history.replace('/admin/positions/list');
  };

  const required = (value) => (value ? undefined : 'Required');

  return (
    <div className={styles.container}>
      <Form
        onSubmit={onSubmit}
        initialValues={selectedItem}
        render={(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            <h2>Form</h2>
            <div className={styles.form}>
              {loading && (
                <div className={styles.spinnerContainer}>
                  <LoadingSpinner />
                </div>
              )}
              <Field
                className={styles.select}
                component={Select}
                label="Profile:"
                name="profiles"
                id="profiles"
                options={options.profiles}
                validate={required}
              />
              <Field
                className={styles.select}
                label="Client:"
                component={Select}
                name="clientId"
                placeholder="Id"
                type="text"
                validate={required}
                options={options.clients}
              />
              <Field
                className={styles.input}
                label="Job"
                name="job"
                placeholder="Job"
                type="text"
                validate={required}
                component={Input}
              />
              <Field
                className={styles.input}
                label="Description"
                name="description"
                placeholder="Description"
                validate={required}
                component={Input}
              />
            </div>
            <Button
              className={styles.button}
              content={positionId ? 'Update Position' : 'Create position'}
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
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => dispatch(clearPositionsError())}
        type={'Error'}
      />
    </div>
  );
}

export default PositionsForm;
