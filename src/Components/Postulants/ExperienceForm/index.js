// import { useState } from 'react';
import styles from './experienceForm.module.css';
import Input from '../Input';

function ExperienceForm(/*{ jobExperience }*/) {
  // const [jobPositionValue, setJobPositionValue] = useState('');
  // const [employerValue, setEmployerValue] = useState('');
  // const [startDateValue, setStartDateValue] = useState('');
  // const [endDateValue, setEndDateValue] = useState('');
  // const [descriptionValue, setDescriptionValue] = useState('');
  // const jobPosition = '';
  // const employer = '';
  // const startDate = new Date();
  // const endDate = new Date();
  // const description = '';

  // const onBlurJobPos = (e) => {
  //   setJobPositionValue(e.target.value);
  // };
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h3>Job info</h3>
        <Input
          name="jobPositionValue"
          placeholder="Job Position"
          // onChange={(e) => setJobPositionValue(e.target.value)}
          // onBlur={onBlurJobPos}
          required
        />
        <Input name="employerValue" placeholder="Employer" required />
        <Input
          name="startDateValue"
          type="text"
          onFocus={(e) => {
            e.currentTarget.type = 'date';
            e.currentTarget.focus();
          }}
          onBlur={(e) => {
            e.currentTarget.type = 'text';
            e.currentTarget.focus();
          }}
          placeholder="Start date"
          required
        />
        <Input
          name="endDateValue"
          type="date"
          onFocus={(e) => {
            e.currentTarget.type = 'date';
            e.currentTarget.focus();
          }}
          onBlur={(e) => {
            e.currentTarget.type = 'text';
            e.currentTarget.focus();
          }}
          placeholder="End date"
        />
        <Input name="descriptionValue" placeholder="Description" required />
      </div>
    </div>
  );
}

export default ExperienceForm;
