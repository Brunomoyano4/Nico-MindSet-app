import styles from './modal.module.css';

function Modal({ closeModal }) {
  return (
    <div className={styles.container}>
      <div className={styles.Modal}>Modal</div>
      <button onClick={closeModal}>Close</button>
    </div>
  );
}

export default Modal;
