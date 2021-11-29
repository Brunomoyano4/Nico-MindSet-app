import DeleteBtn from '../DeleteBtn';

function Admin({ admin }) {
  const openEditForm = () => {
    window.location.href = `/admins/form?id=${admin._id}`;
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
