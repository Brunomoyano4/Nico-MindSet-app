import styles from './addBtn.module.css';

const AddBtn = () => {
  const addNewClient = () => {
    window.location.href = `/clients/form`;
  };

  return (
    <button className={styles.button} onClick={addNewClient} type="button">
      ADD CLIENT
    </button>
  );
};

export default AddBtn;
