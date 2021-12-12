import { useState } from 'react';
import DeleteBtn from '../../Shared/DeleteBtn';
import { useHistory } from 'react-router-dom';
import Modal from '../../Shared/Modal';

function Psychologist({ position }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const openEditForm = () => {
    history.push(`/positions/form?id=${position._id}`);
  };

  const deletePosition = (event) => {
    event.stopPropagation();
    const url = `${process.env.REACT_APP_API}/positions/${position._id}`;
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
        title="Are you sure you want to delete the selected position?"
        onConfirm={(e) => deletePosition(e)}
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

export default Psychologist;
