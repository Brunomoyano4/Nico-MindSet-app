import { useState } from 'react';
import styles from '../Position/position.module.css';
import Modal from '../Modal';
import DeleteBtn from '../../Shared/DeleteBtn/index';

const Position = ({ position }) => {
  const [showModal, setShowModal] = useState(false);
  const openEditForm = () => {
    window.location.href = `/clients/form?id=${position._id}`;
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const onDelete = (event) => {
    const url = `${process.env.REACT_APP_API}/positions/${position._id}`;
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
        title="YOU'RE ABOUT TO DELETE A POSITION"
        onConfirm={onDelete}
        show={showModal}
        closeModal={closeModal}
      />
      <tr key={position._id} onClick={openEditForm}>
        <td>{position.clientId}</td>
        <td>{position.job}</td>
        <td>{position.description}</td>
        <td>{position.createdAt}</td>
        <td>
          <DeleteBtn
            className={styles.button}
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
            position={position}
          />
        </td>
      </tr>
    </>
  );
};

export default Position;
