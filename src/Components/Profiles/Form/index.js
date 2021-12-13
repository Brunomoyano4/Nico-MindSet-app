import styles from './form.module.css';
import Input from '../../Shared/Input';
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import Modal from '../../Shared/Modal';
import Button from '../../Shared/Button';
import { updateProfile, addProfile } from '../../../redux/profiles/thunks';
import { clearProfilesError } from '../../../redux/profiles/actions';

function ProfilesForm() {
  const dispatch = useDispatch();
  const profiles = useSelector((store) => store.profiles.list);
  const error = useSelector((store) => store.profiles.error);
  const loading = useSelector((store) => store.profiles.isLoading);
  const history = useHistory();
  const params = useQuery();
  const profileId = params.get('id');
  const [profileNameValue, setProfileNameValue] = useState('');
  const [branchValue, setBranchValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [disableButton, setDisableButton] = useState(false);

  const setInputValues = ({ profileName, branch, description }) => {
    setProfileNameValue(profileName || '');
    setBranchValue(branch || '');
    setDescriptionValue(description || '');
  };

  const values = {
    profileName: profileNameValue,
    branch: branchValue,
    description: descriptionValue
  };

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    if (profileId) {
      profiles.forEach((profile) => {
        if (profile._id === profileId) setInputValues(profile);
      });
    }
  }, [profileId]);

  const onSubmit = (e) => {
    e.preventDefault();
    setDisableButton(true);

    if (profileId) {
      dispatch(updateProfile(profileId, values)).then((response) => {
        if (response) {
          history.replace('/profiles');
          setDisableButton(false);
        }
      });
    } else {
      dispatch(addProfile(values)).then((response) => {
        if (response) {
          history.replace('/profiles');
          setDisableButton(false);
        }
      });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2>Form</h2>
        <div className={styles.form}>
          <Modal
            title="Something went wrong!"
            subtitle={error}
            show={error}
            closeModal={() => clearProfilesError()}
            type={'Error'}
          />
          {loading && (
            <div className={styles.spinnerContainer}>
              <LoadingSpinner />
            </div>
          )}
          <Input
            className={styles.input}
            placeholder="Profile Name"
            value={profileNameValue}
            onChange={(e) => setProfileNameValue(e.target.value)}
            label="Profile Name:"
            id="profile-name"
            required
          />
          <Input
            className={styles.input}
            placeholder="Branch"
            value={branchValue}
            onChange={(e) => setBranchValue(e.target.value)}
            label="Branch:"
            id="profile-branch"
            required
          />
          <Input
            className={styles.input}
            placeholder="Description"
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            label="Description:"
            id="profile-description"
            required
          />
        </div>
        <Button
          className={styles.button}
          type="submit"
          disabled={loading || disableButton}
          content={profileId ? 'SAVE' : 'CREATE PROFILE'}
        />
      </form>
    </div>
  );
}

export default ProfilesForm;
