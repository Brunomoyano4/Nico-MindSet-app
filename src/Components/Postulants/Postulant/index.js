import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import DeleteBtn from '../../Shared/DeleteBtn/index';
import Modal from '../../Shared/Modal';
import styles from '../Postulant/postulant.module.css';
import { useDispatch } from 'react-redux';
import { deletePostulant } from '../../../redux/postulants/thunks';

const Postulant = ({ postulant }) => {
  const dispatch = useDispatch();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const openEditForm = () => {
    history.push(`/postulants/form?id=${postulant._id}`);
  };

  return (
    <>
      <Modal
        title="Are you sure you want to delete a Postulant?"
        onConfirm={(e) => {
          e.stopPropagation();
          dispatch(deletePostulant(postulant._id));
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
      <tr className={styles.tr} key={postulant._id} onClick={openEditForm}>
        <td>
          {postulant.firstName} {postulant.lastName}
        </td>
        <td>{postulant.email}</td>
        <td>{postulant.telephone}</td>
        <td>
          {postulant.city}, {postulant.country}
        </td>
        <td>
          <DeleteBtn
            className={styles.button}
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirmModal(true);
            }}
            postulant={postulant}
          />
        </td>
      </tr>
    </>
  );
};

export default Postulant;
