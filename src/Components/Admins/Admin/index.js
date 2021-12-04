import DeleteBtn from '../DeleteBtn';
import { useHistory } from 'react-router-dom';

function Admin({ admin }) {
  const history = useHistory();
  const openEditForm = () => {
    history.push(`/admins/form?id=${admin._id}`);
  };

  return (
    <tr key={admin._id} onClick={openEditForm}>
      <td>{admin.username}</td>
      <td>{admin.firstName}</td>
      <td>{admin.lastName}</td>
      <td>{admin.email}</td>
      <td>{admin.password}</td>
      <td>
        <DeleteBtn className="deleteBtn" name="DeleteBtn" admin={admin} />
      </td>
    </tr>
  );
}

export default Admin;
