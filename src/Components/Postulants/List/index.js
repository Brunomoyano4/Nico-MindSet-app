import { useState } from 'react';
import Postulant from '../Postulant';
import Modal from '../Modal';
import styles from './list.module.css';

const List = ({ thName, dataList, setPostulants }) => {
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [error, setError] = useState('');

  const openNewForm = () => {
    window.location.href = `/postulants/form`;
  };
  const handleDelete = (id) => {
    const url = `${process.env.REACT_APP_API}/postulants/${id}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then((res) => {
        if (res.status !== 200) {
          return res.json().then((message) => {
            throw new Error(message);
          });
        }
        setPostulants(dataList.filter((postulants) => postulants._id !== id));
      })
      .catch((error) => setError(error));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onShowModal = (event, id) => {
    event.stopPropagation();
    setShowModal(true);
    setIdToDelete(id);
  };
  return (
    <div className={styles.container}>
      <p className={styles.error}>{error}</p>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        text="Are you sure you want to delete this postulant?"
        function={handleDelete}
        idToDelete={idToDelete}
        setIdToDelete={setIdToDelete}
      />
      <table className={styles.list}>
        <thead>
          <tr>
            {thName.map((th) => {
              return <th key={th}>{th}</th>;
            })}
          </tr>
        </thead>
        <tbody className={styles.tableList}>
          {dataList.map((object) => {
            return (
              <Postulant
                key={object._id}
                object={object}
                onClick={(event) => onShowModal(event, object._id)}
              />
            );
          })}
        </tbody>
      </table>
      <button className={styles.button} onClick={openNewForm}>
        ADD NEW POSTULANT
      </button>
    </div>
  );
};

export default List;
