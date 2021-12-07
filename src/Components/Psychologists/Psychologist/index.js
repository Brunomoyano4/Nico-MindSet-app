import { useState } from 'react';
import DeleteBtn from '../../Shared/DeleteBtn';
import Modal from '../Modal/index';
import { useHistory } from 'react-router-dom';

function Psychologist({ psychologist }) {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();
  const openEditForm = () => {
    history.push(`/psychologists/form?id=${psychologist._id}`);
  };

  const modalShow = (event) => {
    event.stopPropagation();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    const url = `${process.env.REACT_APP_API}/psychologists/${psychologist._id}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then(() => window.location.reload())
      .catch((error) => setError(error));
  };

  return (
    <>
      <Modal
        title="Are you sure you want to delete the selected psychologist?"
        onConfirm={(e) => handleDelete(e)}
        show={showModal}
        closeModal={closeModal}
        error={error}
      />
      <tr key={psychologist._id} onClick={openEditForm}>
        <td>{psychologist.userName}</td>
        <td>{psychologist.firstName}</td>
        <td>{psychologist.lastName}</td>
        <td>{psychologist.email}</td>
        <td>{psychologist.password}</td>
        <td>
          <DeleteBtn onClick={(e) => modalShow(e)} />
        </td>
      </tr>
    </>
  );
}

export default Psychologist;
