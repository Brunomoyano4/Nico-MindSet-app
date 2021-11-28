import styles from './editBtn.module.css';

function EditBtn(props) {
  const editAdmin = (id) => {
    window.location.href = `/admins/form?id=${id}`;
  };
  return <button className={styles.deleteBtn} name={props.name} onClick={editAdmin(props.value)} />;
}

export default EditBtn;
