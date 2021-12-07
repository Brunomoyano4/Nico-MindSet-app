import styles from './button.module.css';

const Button = ({ onClick, disable, content }) => {
  return (
    <button className={styles.button} disable={disable} onClick={onClick} type="button">
      {content}
    </button>
  );
};

export default Button;
