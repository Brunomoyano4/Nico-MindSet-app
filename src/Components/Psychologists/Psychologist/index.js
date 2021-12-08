import { useState } from 'react';
import DeleteBtn from '../../Shared/DeleteBtn';
import { useHistory } from 'react-router-dom';
import Modal from '../../Shared/Modal';

function Psychologist({ psychologist }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const openEditForm = () => {
    history.push(`/psychologists/form?id=${psychologist._id}`);
  };

  const deletePsychologist = (event) => {
    event.stopPropagation();
    const url = `${process.env.REACT_APP_API}/psychologists/${psychologist._id}`;
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
        title="Are you sure you want to delete the selected psychologist?"
        onConfirm={(e) => deletePsychologist(e)}
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
      <tr key={psychologist._id} onClick={openEditForm}>
        <td>{psychologist.userName}</td>
        <td>{psychologist.firstName}</td>
        <td>{psychologist.lastName}</td>
        <td>{psychologist.email}</td>
        <td>{psychologist.password}</td>
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
