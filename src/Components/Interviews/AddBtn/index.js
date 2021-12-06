import { useHistory } from 'react-router-dom';
import styles from './addBtn.module.css';

const AddBtn = () => {
  const history = useHistory();
  const addNewClient = () => {
    history.push(`/interviews/form`);
  };

  return (
    <button className={styles.button} onClick={addNewClient} type="button">
      ADD INTERVIEW
    </button>
  );
};

export default AddBtn;
