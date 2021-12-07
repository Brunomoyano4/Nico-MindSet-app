import styles from './addbtn.module.css';

const AddBtn = (onClick, disable) => {
  return (
    <button className={styles.addBtn} disable={disable} onClick={onClick} type="button">
      ADD
    </button>
  );
};

export default AddBtn;
