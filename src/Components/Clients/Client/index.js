import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../Client/client.module.css';
import Modal from '../../Shared/Modal';

const Client = ({ client }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const openEditForm = () => {
    history.push(`/clients/form?id=${client._id}`);
  };

  const onDelete = (event) => {
    const url = `${process.env.REACT_APP_API}/clients/${client._id}`;
    event.stopPropagation();
    fetch(url, {
      method: 'DELETE'
    })
      .then((res) => {
        if (res.status !== 200) {
          return res.json().then((message) => {
            throw new Error(message);
          });
        }
        return (window.location.href = '/clients');
      })
      .catch((error) => setError(error.toString()));
  };

  return (
    <>
      <Modal
        title="YOU'RE ABOUT TO DELETE A CLIENT"
        onConfirm={onDelete}
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
      <tr key={client._id} onClick={openEditForm}>
        <td>{client.customerName}</td>
        <td>{client.phone}</td>
        <td>{client.branch}</td>
        <td>
          <button
            className={styles.button}
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirmModal(true);
            }}
            client={client}
          >
            DELETE
          </button>
        </td>
      </tr>
    </>
  );
};

export default Client;
