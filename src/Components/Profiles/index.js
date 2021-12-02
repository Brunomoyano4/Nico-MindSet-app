import styles from './profiles.module.css';
import { useState, useEffect } from 'react';
import ListItem from './ListItem';
import DeleteBtn from './DeleteBtn';
import Modal from './Modal';

function Profiles() {
  const tableHeaderItems = ['Branch', 'Name', 'Description', ''];
  const [profiles, setProfiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalSubtitle, setModalSubtitle] = useState(['modalSubtitle']);
  const [deleteId, setDeleteId] = useState('');

  const deleteProfile = (e, id, branch, name) => {
    e.stopPropagation();
    setModalSubtitle([`Branch: ${branch}`, `Name: ${name}`]);
    setDeleteId(id);
    setShowModal(true);
  };

  const toForm = (id) => {
    window.location.href = id ? `/profiles/form?id=${id}` : '/profiles/form';
  };
  const getProfiles = () => {
    fetch(`${process.env.REACT_APP_API}/profiles`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setProfiles(res);
      });
  };
  useEffect(getProfiles, []);

  return (
    <section className={styles.container}>
      <Modal
        showHook={setShowModal}
        showModal={showModal}
        title="You are about to delete a profile"
        subtitle={modalSubtitle}
        btnText={['Close', 'Proceed']}
        id={deleteId}
        getProfiles={getProfiles}
      />

      <h2>Profiles</h2>
      <table className={styles.list}>
        <ListItem headerItems={tableHeaderItems} />
        <tbody className={styles.tableBody}>
          {profiles.map(({ _id, profileName, branch, description }) => {
            const deleteBtn = (
              <DeleteBtn onClick={(e) => deleteProfile(e, _id, branch, profileName)} />
            );
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
      </table>
      <button className={styles.addBtn} type="button" onClick={() => toForm()}>
        Add Profile
      </button>
    </section>
  );
}

export default Profiles;
