import DeleteBtn from '../DeleteBtn';
import styles from '../DeleteBtn/delete.module.css';

const Client = ({ client }) => {
  const openEditForm = () => {
    window.location.href = `/clients/form?id=${client._id}`;
  };
  return (
    <>
      <tr key={client._id} onClick={openEditForm}>
        <td>{client.customerName}</td>
        <td>{client.phone}</td>
        <td>{client.branch}</td>
        <td>
          <DeleteBtn className={styles.button} client={client} />
        </td>
      </tr>
    </>
  );
};

export default Client;
