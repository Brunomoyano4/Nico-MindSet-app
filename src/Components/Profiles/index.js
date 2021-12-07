import styles from './profiles.module.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ListItem from './ListItem';
import DeleteBtn from './DeleteBtn';
import Modal from '../Shared/Modal';
import LoadingSpinner from '../Shared/LoadingSpinner';

function Profiles() {
  const tableHeaderItems = ['Branch', 'Name', 'Description', ''];
  const [profiles, setProfiles] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalSubtitle, setModalSubtitle] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentProfile, setCurrentProfile] = useState({});

  const history = useHistory();

  const deleteProfile = (e, id, branch, name) => {
    e.stopPropagation();
    setModalSubtitle([`Branch: ${branch}`, `Name: ${name}`]);
    fetch(`${process.env.REACT_APP_API}/profiles/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        setShowConfirmModal(false);
        getProfiles();
      })
      .catch((error) => setError(error.toString()));
  };

  const toForm = (id) => {
    history.push(id ? `/profiles/form?id=${id}` : '/profiles/form');
  };
  const getProfiles = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/profiles`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return response.json();
      })
      .then((data) => setProfiles(data))
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  };
  useEffect(getProfiles, []);

  return (
    <section className={styles.container}>
      <h2>Profiles</h2>
      <table className={styles.list}>
        <ListItem headerItems={tableHeaderItems} />
        {!loading && (
          <tbody className={styles.tableBody}>
            {profiles.map((profile) => {
              const deleteBtn = (
                <DeleteBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentProfile(profile);
                    setShowConfirmModal(true);
                  }}
                />
              );
              const tableListItems = [
                profile.branch,
                profile.profileName,
                profile.description,
                deleteBtn
              ];
              return (
                <ListItem
                  key={profile._id}
                  listItems={tableListItems}
                  id={profile._id}
                  onRowClick={() => toForm(profile._id)}
                />
              );
            })}
          </tbody>
        )}
      </table>
      {loading && <LoadingSpinner circle={false} />}
      {!loading && !profiles.length && <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>}
      <Modal
        title="You are about to delete a profile"
        onConfirm={(e) =>
          deleteProfile(e, currentProfile._id, currentProfile.branch, currentProfile.profileName)
        }
        show={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        subtitle={modalSubtitle}
        type={'Confirm'}
      />
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => setError('')}
        type={'Error'}
      />
      <button className={styles.addBtn} type="button" onClick={() => toForm()}>
        Add Profile
      </button>
    </section>
  );
}

export default Profiles;
