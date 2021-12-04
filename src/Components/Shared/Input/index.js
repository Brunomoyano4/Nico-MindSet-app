import styles from './input.module.css';

const Input = (props) => (
  <>
    {!!props.label} {<label className={styles.label}>{props.label}</label>}
    <input
      className={styles.input}
      type={props.type ?? 'text'}
      id={props.id}
      value={props.value}
      required={props.required}
      onChange={props.onChange}
      placeholder={props.placeholder}
      disabled={props.disabled}
    />
  </>
);

export default Input;
