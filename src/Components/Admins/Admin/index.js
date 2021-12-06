import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import DeleteBtn from '../../Shared/DeleteBtn/index';
import Modal from '../Modal/index';

function Admin({ admin }) {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();
  const openEditForm = () => {
    history.push(`/admins/form?id=${admin._id}`);
  };

  const modalShow = (event) => {
    event.stopPropagation();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    const url = `${process.env.REACT_APP_API}/admins/${admin._id}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then(() => window.location.reload())
      .catch((error) => setError(error));
  };

  return (
    <>
      <Modal
        title="Are you sure you want to delete an admin?"
        onConfirm={handleDelete}
        show={showModal}
        closeModal={closeModal}
        error={error}
      />
      <tr key={admin._id} onClick={openEditForm}>
        <td>{admin.username}</td>
        <td>{admin.firstName}</td>
        <td>{admin.lastName}</td>
        <td>{admin.email}</td>
        <td>{admin.password}</td>
        <td>
          <DeleteBtn onClick={(event) => modalShow(event)} />
        </td>
      </tr>
    </>
  );
}

export default Admin;
