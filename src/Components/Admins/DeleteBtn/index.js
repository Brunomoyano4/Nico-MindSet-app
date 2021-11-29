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
      })
      .catch((error) => error)
      .finally(window.location.reload());
  };
  return (
    <button className={styles.deleteBtn} onClick={(e) => deleteAdmin(e)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="18px"
        viewBox="0 0 24 24"
        width="18px"
        fill="#ffffff"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
      </svg>
    </button>
  );
}

export default DeleteBtn;
