import { useHistory } from 'react-router-dom';
import styles from './addBtn.module.css';

const AddBtn = () => {
  const history = useHistory();
  const addNewClient = () => {
    history.push(`/clients/form`);
  };

  return (
    <button className={styles.button} onClick={addNewClient} type="button">
      ADD CLIENT
    </button>
  );
};

export default AddBtn;
