import styles from './deleteBtn.module.css';

const DeleteBtn = ({ onClick }) => {
  return (
    <>
      <button className={styles.button} onClick={onClick}>
        <img src={`${process.env.PUBLIC_URL}/assets/images/deleteIcon.png`}></img>
      </button>
    </>
  );
};

export default DeleteBtn;
