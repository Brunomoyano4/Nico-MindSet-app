import styles from './modal.module.css';

const Modal = ({ showModal, title, subtitle, btnText, btnOnClick }) => {
  return (
    <section className={showModal ? styles.modalContainer : ''}>
      <dialog open={showModal} className={styles.modal}>
        <h2 className={styles.modalLabel}>{title}</h2>
        <h3 className={styles.modalContent}>{subtitle}</h3>
        <div className={styles.flex}>
          <button onClick={btnOnClick[0]} className={styles.modalBtn}>
            {btnText[0]}
          </button>
          <button onClick={btnOnClick[1]} className={styles.modalBtn}>
            {btnText[1]}
          </button>
        </div>
      </dialog>
    </section>
  );
};

export default Modal;
