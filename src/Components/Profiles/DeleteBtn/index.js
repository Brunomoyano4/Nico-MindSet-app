import styles from './deletebtn.module.css';
import deleteImg from './images/deleteIcon.png';

const DeleteBtn = ({ onClick }) => {
  return <img className={styles.deleteBtn} onClick={onClick} src={deleteImg} alt="delete button" />;
};

export default DeleteBtn;
