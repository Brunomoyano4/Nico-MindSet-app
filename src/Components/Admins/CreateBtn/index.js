import styles from './createBtn.module.css';

function CreateBtn(props) {
  const addNewAdmin = () => {
    window.location.href = `/admins/form`;
  };
  return (
    <button className={styles.createBtn} name={props.name} onClick={addNewAdmin}>
      Add
    </button>
  );
}

export default CreateBtn;
