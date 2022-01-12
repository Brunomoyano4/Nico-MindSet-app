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
        name="education[0].elementarySchool"
        placeholder="elementarySchool"
        type="text"
        validate={required}
        component={Input}
      />
      <Field
        className={styles.input}
        name="education[0].elementarySchoolFYear"
        placeholder="elementarySchoolFYear"
        type="number"
        validate={required}
        component={Input}
      />
      <h3>High School</h3>
      <Field
        className={styles.input}
        name="education[0].highSchool"
        placeholder="highSchool"
        type="text"
        validate={required}
        component={Input}
      />
      <Field
        className={styles.input}
        name="education[0].highSchoolFYear"
        placeholder="highSchoolFYear"
        type="number"
        validate={required}
        component={Input}
      />

      <button type="button" onClick={() => formArrayPush('studies', undefined)}>
        Add Study
      </button>

      <FieldArray name="studies">
        {({ fields }) =>
          fields.map((name, index) => {
            return (
              <div key={index} className={styles.form}>
                <StudiesForm number={index} />
                <button type="button" onClick={() => fields.remove(index)}>
                  Delete Study
                </button>
              </div>
            );
          })
        }
      </FieldArray>
    </>
  );
}

export default EducationForm;
