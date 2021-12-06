import { useHistory } from 'react-router-dom';
import styles from './createBtn.module.css';

function CreateBtn(props) {
  const history = useHistory();
  const addNewAdmin = () => {
    history.push(`/admins/form`);
  };
  return (
    <button className={styles.createBtn} name={props.name} onClick={addNewAdmin}>
      Add
    </button>
  );
}

export default CreateBtn;
