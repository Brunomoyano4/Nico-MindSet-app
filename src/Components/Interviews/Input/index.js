import styles from './input.module.css';

function Input(props) {
  return (
    <input
      className={styles.input}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      required
    />
  );
}

export default Input;
