import styles from './form.module.css';
import Input from '../../Shared/Input';
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import Modal from '../../Shared/Modal';

function ProfilesForm() {
  const history = useHistory();
  const params = useQuery();
  const profileId = params.get('id');
  const [profileName, setProfileName] = useState('');
  const [branch, setBranch] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    let url = `${process.env.REACT_APP_API}/profiles`;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        profileName: profileName.toLowerCase(),
        branch: branch.toLowerCase(),
        description: description.toLowerCase()
      }),
      method: 'POST'
    };
    if (profileId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/profiles/${profileId}`;
    }
    fetch(url, options)
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          return res.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return history.replace('/profiles');
      })
      .catch((error) => setError(error.toString()));
  };

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    setLoading(true);
    if (profileId) {
      fetch(`${process.env.REACT_APP_API}/profiles/${profileId}`)
        .then((res) => {
          if (res.status !== 200) {
            return res.json().then(({ msg }) => {
              throw new Error(msg);
            });
          }
          return res.json();
        })
        .then((data) => {
          setProfileName(data[0].profileName);
          setBranch(data[0].branch);
          setDescription(data[0].description);
        })
        .catch((error) => setError(error.toString()))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <>
      <form className={styles.container} onSubmit={onSubmit}>
        <h2>Profile Form</h2>
        {loading && (
          <div className={styles.spinnerContainer}>
            <LoadingSpinner />
          </div>
        )}
        <Input
          placeholder="Profile Name"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          label="Profile Name:"
          id="profile-name"
          required
        />
        <Input
          placeholder="Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          label="Branch:"
          id="profile-branch"
          required
        />
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description:"
          id="profile-description"
          required
        />
        <input type="submit"></input>
      </form>
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => setError('')}
        type={'Error'}
      />
    </>
  );
}

export default ProfilesForm;
