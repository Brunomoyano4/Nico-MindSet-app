import styles from './select.module.css';

const Select = (props) => {
  return (
    <>
      {props.label && <label className={styles.label}>{props.label}</label>}
      <select
        className={styles.select}
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
