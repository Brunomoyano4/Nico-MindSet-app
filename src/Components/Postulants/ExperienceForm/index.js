import styles from './experienceForm.module.css';
import Input from '../Input';

function ExperienceForm() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h3>Job info</h3>
        <Input name="jobPositionValue" placeholder="Job Position" required />
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
      </form>
    </div>
  );
}

export default ExperienceForm;
