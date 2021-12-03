import styles from './addBtn.module.css';

const AddBtn = () => {
  const addNewClient = () => {
    window.location.href = `/interviews/form`;
  };

  return (
    <button className={styles.button} onClick={addNewClient} type="button">
      ADD INTERVIEW
    </button>
  );
};

export default AddBtn;
