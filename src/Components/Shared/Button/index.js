import styles from './button.module.css';

const Button = ({ onClick, disabled, content }) => {
  return (
    <button className={styles.button} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
