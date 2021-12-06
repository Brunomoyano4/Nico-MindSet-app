import DeleteBtn from '../../Shared/DeleteBtn/index';
import styles from './postulant.module.css';

const Postulant = ({ object, onClick }) => {
  const openEditForm = () => {
    window.location.href = `/postulants/form?id=${object._id}`;
  };

  return (
    <>
      <tr className={styles.tr} key={object._id} onClick={openEditForm}>
        <td>
          {object.firstName} {object.lastName}
        </td>
        <td>{object.email}</td>
        <td>{object.telephone}</td>
        <td>
          {object.city}, {object.country}
        </td>
        <td>
          <DeleteBtn onClick={onClick} />
        </td>
      </tr>
    </>
  );
};

export default Postulant;
