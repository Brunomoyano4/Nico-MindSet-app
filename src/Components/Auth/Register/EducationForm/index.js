import { Field } from 'react-final-form';
import styles from '../register.module.css';
import Input from 'Components/Shared/Input';
const required = (value) => (value ? undefined : 'Required');
import { FieldArray } from 'react-final-form-arrays';
import StudiesForm from './Study';

function EducationForm({ formArrayPush }) {
  return (
    <>
      <h3>Elementary School</h3>
      <Field
        className={styles.input}
        name="studies.primaryStudies.school"
        placeholder="Elementary School"
        type="text"
        validate={required}
        component={Input}
      />
      <Field
        className={styles.input}
        name="studies.primaryStudies.startDate"
        placeholder="Elementary Start date"
        type="date"
        validate={required}
        component={Input}
      />
      <Field
        className={styles.input}
        name="studies.primaryStudies.endDate"
        placeholder="Study Institute end date"
        type="date"
        validate={required}
        component={Input}
      />
      <h3>High School</h3>
      <Field
        className={styles.input}
        name="studies.secondaryStudies.school"
        placeholder="High Shool"
        type="text"
        validate={required}
        component={Input}
      />
      <Field
        className={styles.input}
        name="studies.secondaryStudies.startDate"
        placeholder="Elementary Start date"
        type="date"
        validate={required}
        component={Input}
      />
      <Field
        className={styles.input}
        name="studies.secondaryStudies.endDate"
        placeholder="Study Institute end date"
        type="date"
        validate={required}
        component={Input}
      />

      <FieldArray name="additionalStudies">
        {({ fields }) =>
          fields.map((name, index) => {
            return (
              <div key={index} className={styles.form}>
                <StudiesForm number={index} />
                <button
                  className={styles.button}
                  type="button"
                  onClick={() => fields.remove(index)}
                >
                  Delete Study
                </button>
              </div>
            );
          })
        }
      </FieldArray>

      <button
        className={styles.button}
        type="button"
        onClick={() => formArrayPush('additionalStudies', undefined)}
      >
        Add Study
      </button>
    </>
  );
}

export default EducationForm;
