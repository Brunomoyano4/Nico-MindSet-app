import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import DeleteBtn from 'Components/Shared/DeleteBtn';
import Modal from 'Components/Shared/Modal';
import styles from './admin.module.css';

function Admin({ admin }) {
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const history = useHistory();

  const openEditForm = () => {
    history.push(`/admins/form?id=${admin._id}`);
  };

  const deleteAdmin = (event) => {
    event.stopPropagation();
    const url = `${process.env.REACT_APP_API}/admins/${admin._id}`;
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
        return history.go(0);
      })
      .catch((error) => setError(error.toString()));
  };

  return (
    <>
      <Modal
        title="Are you sure you want to delete an Admin?"
        onConfirm={(e) => deleteAdmin(e)}
        show={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        type={'Confirm'}
      />
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => setError('')}
        type={'Error'}
      />
      <tr className={styles.tr} key={admin._id} onClick={openEditForm}>
        <td>{admin.username}</td>
        <td>{admin.firstName}</td>
        <td>{admin.lastName}</td>
        <td>{admin.email}</td>
        <td>{admin.password}</td>
        <td>
          <DeleteBtn
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirmModal(true);
            }}
          />
        </td>
      </tr>
    </>
  );
}

export default Admin;
