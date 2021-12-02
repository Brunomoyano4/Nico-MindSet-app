import styles from './input.module.css';

function Input(props) {
  return (
    <input
      className={styles.input}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
      pattern={props.pattern}
    />
  );
}

export default Input;
