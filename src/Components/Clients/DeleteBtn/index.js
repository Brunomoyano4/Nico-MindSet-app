import styles from './delete.module.css';

const refreshPage = () => {
  window.location.reload();
};

const DeleteBtn = ({ client }) => {
  const url = `${process.env.REACT_APP_API}/clients/${client._id}`;
  const handleDelete = (event) => {
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
      .finally(() => {
        refreshPage();
      })
      .catch((error) => error);
  };

  return (
    <button className={styles.button} onClick={(e) => handleDelete(e)}>
      DELETE
    </button>
  );
};

export default DeleteBtn;
