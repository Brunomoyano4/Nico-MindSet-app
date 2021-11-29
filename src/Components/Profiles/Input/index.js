import styles from './input.module.css';

const Input = ({ type, placeholder, value, onChange, label, id, required }) => {
  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        id={id}
        type={type ?? 'text'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </>
  );
};

export default Input;
