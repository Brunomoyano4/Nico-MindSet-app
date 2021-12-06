import { useState } from 'react';
import styles from '../Client/client.module.css';
import Modal from '../Modal';
import DeleteBtn from '../../Shared/DeleteBtn/index';

const Client = ({ client }) => {
  const [showModal, setShowModal] = useState(false);
  const openEditForm = () => {
    window.location.href = `/clients/form?id=${client._id}`;
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const onDelete = (event) => {
    const url = `${process.env.REACT_APP_API}/clients/${client._id}`;
    event.stopPropagation();
    fetch(url, {
      method: 'DELETE'
    })
      .then((res) => {
        if (res.status !== 204) {
          return res.json().then((message) => {
            throw new Error(message);
          });
        }
      })
      .catch((error) => error)
      .finally(() => {
        refreshPage();
      });
  };

  return (
    <>
      <Modal
        title="YOU'RE ABOUT TO DELETE A CLIENT"
        onConfirm={onDelete}
        show={showModal}
        closeModal={closeModal}
      />
      <tr key={client._id} onClick={openEditForm}>
        <td>{client.customerName}</td>
        <td>{client.phone}</td>
        <td>{client.branch}</td>
        <td>
          <DeleteBtn
            className={styles.button}
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
            client={client}
          />
        </td>
      </tr>
    </>
  );
};

export default Client;
