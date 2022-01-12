import { Field } from 'react-final-form';
import styles from '../../register.module.css';
import Input from 'Components/Shared/Input';
const required = (value) => (value ? undefined : 'Required');

function StudiesForm({ number }) {
  return (
    <>
      <h3>Study {number + 1}:</h3>
      <Field
        className={styles.input}
        name={`education[${number}].tertiaryStudieInstitute`}
        placeholder="tertiaryStudieInstitute"
        type="text"
        validate={required}
        component={Input}
      />
      <Field
        className={styles.input}
        name={`education[${number}].tertiaryStudieDescription`}
        placeholder="tertiaryStudieDescription"
        type="text"
        validate={required}
        component={Input}
      />
      <Field
        className={styles.input}
        name={`education[${number}].tertiaryStudieStartDate`}
        placeholder="tertiaryStudieStartDate"
        type="date"
        validate={required}
        component={Input}
      />
      <Field
        className={styles.input}
        name={`education[${number}].tertiaryStudieEndDate`}
        placeholder="tertiaryStudieEndDate"
        type="date"
        validate={required}
        component={Input}
      />
    </>
  );
}

export default StudiesForm;
