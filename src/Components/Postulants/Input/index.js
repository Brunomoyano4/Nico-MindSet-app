import styles from './input.module.css';

function Input(props) {
  return (
    <input
      className={styles.input}
      type={props.type}
      name={props.name}
      value={props.value}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      placeholder={props.placeholder}
      required={props.required}
      pattern={props.pattern}
      title={props.title}
      min={props.min}
    />
  );
}

export default Input;
