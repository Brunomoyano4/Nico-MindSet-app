import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }
  const onCloseModal = () => {
    props.onCloseModal();
    props.closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h2>YOU ARE ABOUT TO DELETE A CLIENT</h2>
        <button className={styles.btnModal} onClick={onCloseModal}>
          Cancel
        </button>
        <button className={styles.btnModal} onClick={props.onConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default Modal;
