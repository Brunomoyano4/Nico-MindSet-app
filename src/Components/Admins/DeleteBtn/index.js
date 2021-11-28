import styles from './deleteBtn.module.css';

function DeleteBtn({ admin }) {
  const deleteAdmin = (event) => {
    event.stopPropagation();
    const url = `${process.env.REACT_APP_API}/admins/${admin._id}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then((res) => {
        if (res.status !== 204) {
          return res.json().then((message) => {
            throw new Error(message);
          });
        }
        window.location.reload(false);
      })
      .catch((error) => error);
  };
  return (
    <button className={styles.deleteBtn} onClick={deleteAdmin}>
      <img
        className={styles.icon}
        src={`${process.env.PUBLIC_URL}/assets/images/delete_black_18dp.svg`}
      />
    </button>
  );
}

export default DeleteBtn;
