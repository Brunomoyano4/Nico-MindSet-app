import styles from './form.module.css';
import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Input from 'Components/Shared/Input';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
import { updateProfile, addProfile, getProfileById } from 'redux/profiles/thunks';
import { clearProfilesError, cleanSelectedItem } from 'redux/profiles/actions';
import { Form, Field } from 'react-final-form';

function ProfilesForm() {
  const dispatch = useDispatch();
  const selectedItem = useSelector((store) => store.profiles.list);
  const error = useSelector((store) => store.profiles.error);
  const loading = useSelector((store) => store.profiles.isLoading);
  const history = useHistory();
  const params = useQuery();
  const profileId = params.get('id');

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    if (profileId) {
      dispatch(getProfileById(profileId));
    } else {
      dispatch(cleanSelectedItem());
    }
  }, []);

  const onSubmit = (formValues) => {
    if (profileId) {
      dispatch(updateProfile(profileId, formValues));
    } else {
      dispatch(addProfile(formValues));
    }
    history.push('/admin/profiles/list');
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
              <Modal
                title="Something went wrong!"
                subtitle={error}
                show={error}
                closeModal={() => dispatch(clearProfilesError())}
                type={'Error'}
              />
              {loading && (
                <div className={styles.spinnerContainer}>
                  <LoadingSpinner />
                </div>
              )}
              <Field
                className={styles.input}
                placeholder="Profile Name"
                label="Profile Name:"
                id="profile-name"
                component={Input}
                validate={required}
              />
              <Field
                className={styles.input}
                placeholder="Branch"
                label="Branch:"
                id="profile-branch"
                validate={required}
                component={Input}
              />
              <Field
                className={styles.input}
                placeholder="Description"
                label="Description:"
                id="profile-description"
                validate={required}
                component={Input}
              />
            </div>
            <Button
              className={styles.button}
              type="submit"
              disabled={
                loading ||
                formProps.submitting ||
                formProps.pristine ||
                formProps.hasValidationErrors
              }
              content={profileId ? 'SAVE' : 'CREATE PROFILE'}
            />
          </form>
        )}
      />
    </div>
  );
}

export default ProfilesForm;
