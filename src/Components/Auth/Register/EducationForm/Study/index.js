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
        name={`education[${number}].StudyInstitute`}
        placeholder="Study Institute Name"
        type="text"
        validate={required}
        component={Input}
      />
      <Field
        className={styles.input}
        name={`education[${number}].StudyInstituteDescription`}
        placeholder="Study Institute description"
        type="text"
        validate={required}
        component={Input}
      />
      <Field
        className={styles.input}
        name={`education[${number}].StudyInstituteStartDate`}
        placeholder="Study Institute start date"
        type="date"
        validate={required}
        component={Input}
      />
      <Field
        className={styles.input}
        name={`education[${number}].StudyInstituteEndDate`}
        placeholder="Study Institute end date"
        type="date"
        validate={required}
        component={Input}
      />
    </>
  );
}

export default StudiesForm;
