import styles from './form.module.css';
import Input from '../../Shared/Input';
import { useState, useEffect } from 'react';

function ProfilesForm() {
  const params = new URLSearchParams(window.location.search);
  const profileId = params.get('id');
  const [profileName, setProfileName] = useState('');
  const [branch, setBranch] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

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
        return res.json();
      })
      .then(() => {
        window.location.href = '/profiles';
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
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
        .catch((error) => {
          setError(error.toString());
        });
    }
  }, []);

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <h2>Profile Form</h2>
      <h3>{error}</h3>
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
  );
}

export default ProfilesForm;
