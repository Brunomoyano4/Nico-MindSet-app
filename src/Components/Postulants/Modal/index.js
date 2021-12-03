import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.showModal) {
    return null;
  }

  const onClick = (id) => {
    props.function(id);
    props.closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>{props.text}</h3>
        <div className={styles.buttons}>
          <button onClick={() => onClick(props.idToDelete)}>delete</button>
          <button onClick={() => props.closeModal()}>cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
