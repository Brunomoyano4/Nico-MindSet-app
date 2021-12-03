import styles from './createBtn.module.css';

function CreateBtn(props) {
  const addNewPsychologist = () => {
    window.location.href = `/psychologists/form`;
  };
  return (
    <button className={styles.createBtn} name={props.name} onClick={addNewPsychologist}>
      Add
    </button>
  );
}

export default CreateBtn;
