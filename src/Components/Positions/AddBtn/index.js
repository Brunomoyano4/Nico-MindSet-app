import styles from './addbtn.module.css';

const AddBtn = () => {
  const addNewPosition = () => {
    window.location.href = `/positions/form`;
  };

  return (
    <button className={styles.button} onClick={addNewPosition} type="button">
      ADD POSITION
    </button>
  );
};

export default AddBtn;
