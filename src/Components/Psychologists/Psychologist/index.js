import DeleteBtn from '../DeleteBtn';

function Psychologist({ psychologist }) {
  const openEditForm = () => {
    window.location.href = `/psychologists/form?id=${psychologist._id}`;
  };
  return (
    <tr key={psychologist._id} onClick={openEditForm}>
      <td>{psychologist.userName}</td>
      <td>{psychologist.firstName}</td>
      <td>{psychologist.lastName}</td>
      <td>{psychologist.email}</td>
      <td>{psychologist.password}</td>
      <td>
        <DeleteBtn className="deleteBtn" name="DeleteBtn" psychologist={psychologist} />
      </td>
    </tr>
  );
}

export default Psychologist;
