import { Field } from 'react-final-form';
import styles from '../../register.module.css';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';

const required = (value) => (value ? undefined : 'Required');

function StudiesForm({ number }) {
  return (
    <>
      <h3>Study {number + 1}:</h3>
      <Field className={styles.select} id="study-select" name="" component={Select} />
      <Field
        className={styles.input}
        name={`studies.tertiaryStudies[${number}].institute`}
        placeholder="Study Institute Name"
        type="text"
        validate={required}
        component={Input}
      />
      <Field
        className={styles.input}
        name={`studies.tertiaryStudies[${number}].description`}
        placeholder="Study Institute description"
        type="text"
        validate={required}
        component={Input}
      />
      <Field
        className={styles.input}
        name={`studies.tertiaryStudies[${number}].startDate`}
        placeholder="Study Institute start date"
        type="date"
        validate={required}
        component={Input}
      />
      <Field
        className={styles.input}
        name={`studies.tertiaryStudies[${number}].endDate`}
        placeholder="Study Institute end date"
        type="date"
        validate={required}
        component={Input}
      />
    </>
  );
}

export default StudiesForm;
