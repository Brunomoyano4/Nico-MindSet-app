import { Field } from 'react-final-form';
import styles from './study.module.css';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import { useState } from 'react';
import { OnChange } from 'react-final-form-listeners';

const required = (value) => (value ? undefined : 'Required');
const options = [
  {
    value: 'tertiaryStudies',
    label: 'Tertiary study'
  },
  {
    value: 'universityStudies',
    label: 'University study'
  },
  {
    value: 'informalStudies',
    label: 'Informal study'
  }
];

function StudiesForm({ number }) {
  const [type, setType] = useState('tertiaryStudies');
  return (
    <>
      <h3>Study {number + 1}:</h3>
      <Field
        className={styles.select}
        id="study-select"
        name={`typeOfStudy-${number}`}
        label="Study"
        options={options}
        defaultValue={options[0]}
        component={Select}
      />
      <OnChange name={`typeOfStudy-${number}`}>
        {(value) => {
          setType(value);
        }}
      </OnChange>
      <Field
        className={styles.input}
        name={`studies[${type}][0].institute`}
        placeholder="Study Institute Name"
        type="text"
        validate={required}
        component={Input}
      />
      <Field
        className={styles.input}
        name={`studies[${type}][0].description`}
        placeholder="Study Institute description"
        type="text"
        validate={required}
        component={Input}
      />
      <Field
        className={styles.input}
        name={`studies[${type}][0].startDate`}
        placeholder="Study Institute start date"
        type="date"
        validate={required}
        component={Input}
      />
      <Field
        className={styles.input}
        name={`studies[${type}][0].endDate`}
        placeholder="Study Institute end date"
        type="date"
        validate={required}
        component={Input}
      />
    </>
  );
}

export default StudiesForm;
