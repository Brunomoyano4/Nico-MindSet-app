import styles from './createBtn.module.css';

function CreateBtn(props) {
  const addNewAdmin = () => {
    window.location.href = `/admins/form`;
  };
  return <button className={styles.deleteBtn} name={props.name} onClick={addNewAdmin} />;
}

export default CreateBtn;
