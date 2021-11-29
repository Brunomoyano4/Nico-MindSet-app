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
  const [modalBtnOnClick, setModalBtnOnClick] = useState([]);
  const [modalError, setModalError] = useState('');

  const deleteProfile = (e, id, branch, name) => {
    e.stopPropagation();
    setModalSubtitle([`Branch: ${branch}`, `Name: ${name}`]);
    setModalBtnOnClick([
      () => setShowModal(false),
      () => {
        fetch(`${process.env.REACT_APP_API}/profiles/${id}`, {
          method: 'DELETE'
        })
          .then((response) => {
            if (response.status !== 200) {
              return response.json().then(({ message }) => {
                throw new Error(message);
              });
            }
            getProfiles();
            setShowModal(false);
          })
          .catch((error) => {
            setModalError(JSON.stringify(error));
          });
      }
    ]);
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
        btnOnClick={modalBtnOnClick}
        error={modalError}
      ></Modal>

      <h2>Profiles</h2>
      <table className={styles.list}>
        <ListItem headerItems={tableHeaderItems}></ListItem>
        <tbody className={styles.tableBody}>
          {profiles.map(({ _id, profileName, branch, description }) => {
            const deleteBtn = (
              <DeleteBtn onClick={(e) => deleteProfile(e, _id, branch, profileName)}></DeleteBtn>
            );
            const tableListItems = [branch, profileName, description, deleteBtn];
            return (
              <ListItem
                key={_id}
                listItems={tableListItems}
                id={_id}
                onRowClick={() => toForm(_id)}
              ></ListItem>
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
