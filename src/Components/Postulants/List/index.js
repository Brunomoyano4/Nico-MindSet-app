import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Postulant from '../Postulant';
import Modal from '../../Shared/Modal';
import styles from './list.module.css';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import Button from '../../Shared/Button';

const List = ({ thName, dataList, setPostulants, loading }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const openNewForm = () => {
    history.push(`/postulants/form`);
  };
  const handleDelete = (e, id) => {
    e.stopPropagation();
    const url = `${process.env.REACT_APP_API}/postulants/${id}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        setShowConfirmModal(false);
        setPostulants(dataList.filter((postulants) => postulants._id !== id));
      })
      .catch((error) => setError(error.toString()));
  };

  return (
    <div className={styles.container}>
      <Modal
        title="Are you sure you want to delete this postulant?"
        onConfirm={(e) => handleDelete(e, idToDelete)}
        show={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
      />
      <table className={styles.list}>
        <thead>
          <tr>
            {thName.map((th) => {
              return <th key={th}>{th}</th>;
            })}
          </tr>
        </thead>
        {!loading && (
          <tbody className={styles.tableList}>
            {dataList.map((object) => {
              return (
                <Postulant
                  key={object._id}
                  object={object}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowConfirmModal(true);
                    setIdToDelete(object._id);
                  }}
                />
              );
            })}
          </tbody>
        )}
      </table>
      {loading && <LoadingSpinner circle={false} />}
      {!loading && !dataList.length && <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>}
      <Button onClick={openNewForm} content={'CREATE POSTULANT'} />
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => setError('')}
        type={'Error'}
      />
    </div>
  );
};

export default List;
