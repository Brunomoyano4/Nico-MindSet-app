import { useState } from 'react';
import DeleteBtn from '../../Shared/DeleteBtn';
import { useHistory } from 'react-router-dom';
import Modal from '../../Shared/Modal';
import { useDispatch } from 'react-redux';
import { deletePosition } from '../../../redux/positions/thunks';

function Position({ position }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const openEditForm = () => {
    history.push(`/positions/form?id=${position._id}`);
  };

  return (
    <>
      <Modal
        title="Are you sure you want to delete the selected position?"
        onConfirm={(e) => {
          e.stopPropagation();
          dispatch(deletePosition(position._id));
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
      <tr key={position._id} onClick={openEditForm}>
        <td>{position.clientId}</td>
        <td>{position.job}</td>
        <td>{position.description}</td>
        <td>{position.createdAt}</td>
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

export default Position;
