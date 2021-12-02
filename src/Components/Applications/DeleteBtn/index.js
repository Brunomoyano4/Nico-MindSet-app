import styles from './deletebtn.module.css';

const DeleteBtn = ({ onClick }) => {
  return (
    <img
      className={styles.deleteBtn}
      onClick={onClick}
      src={`${process.env.PUBLIC_URL}/assets/images/deleteIcon.png`}
      alt="delete button"
    />
  );
};

export default DeleteBtn;
