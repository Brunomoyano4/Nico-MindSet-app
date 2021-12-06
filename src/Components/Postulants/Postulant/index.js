import { useHistory } from 'react-router-dom';
import DeleteBtn from '../DeleteBtn';
import styles from './postulant.module.css';

const Postulant = ({ object, onClick }) => {
  const history = useHistory();
  const openEditForm = () => {
    history.push(`/postulants/form?id=${object._id}`);
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
          <DeleteBtn object={object} onClick={onClick} />
        </td>
      </tr>
    </>
  );
};

export default Postulant;
