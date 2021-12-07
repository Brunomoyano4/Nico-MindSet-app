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

  const history = useHistory();

  const openModal = (e, branch, name) => {
    e.stopPropagation();
    setShowConfirmModal(true);
    setModalSubtitle([`Branch: ${branch}`, `Name: ${name}`]);
  };

  const deleteProfile = (id) => {
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
            {profiles.map(({ _id, profileName, branch, description }) => {
              const deleteBtn = <DeleteBtn onClick={(e) => openModal(e, branch, profileName)} />;
              const tableListItems = [branch, profileName, description, deleteBtn];
              return (
                <ListItem
                  key={_id}
                  listItems={tableListItems}
                  id={_id}
                  onRowClick={() => toForm(_id)}
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
        onConfirm={() => deleteProfile(profiles.id)}
        show={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        subtitle={modalSubtitle}
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
