import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }

  const onConfirmModal = () => {
    props.onConfirmModal;
    props.closeModal;
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Modal</h3>
        <button onClick={onConfirmModal}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
