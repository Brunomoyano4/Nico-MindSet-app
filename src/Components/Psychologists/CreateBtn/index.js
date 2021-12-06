import { useHistory } from 'react-router-dom';
import styles from './createBtn.module.css';

function CreateBtn(props) {
  const history = useHistory();
  const addNewPsychologist = () => {
    history.push(`/psychologists/form`);
  };
  return (
    <button className={styles.createBtn} name={props.name} onClick={addNewPsychologist}>
      Add
    </button>
  );
}

export default CreateBtn;
