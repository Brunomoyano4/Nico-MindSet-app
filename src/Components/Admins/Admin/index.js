import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import DeleteBtn from '../../Shared/DeleteBtn';
import Modal from '../../Shared/Modal';
import styles from './admin.module.css';
import { useDispatch } from 'react-redux';
import { deleteAdmin } from '../../../redux/admins/thunks';

function Admin({ admin }) {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const history = useHistory();

  const openEditForm = () => {
    history.push(`/admins/form?id=${admin._id}`);
  };

  return (
    <>
      <Modal
        title="Are you sure you want to delete an Admin?"
        onConfirm={(e) => {
          e.stopPropagation();
          dispatch(deleteAdmin(admin._id));
        }}
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
