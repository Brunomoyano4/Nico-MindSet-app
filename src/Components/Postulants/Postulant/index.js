import DeleteBtn from '../DeleteBtn';

const Postulant = ({ object }) => {
  const openEditForm = () => {
    console.log(object._id);
    window.location.href = `/postulants/form?id=${object._id}`;
  };

  return (
    <>
      <tr key={object._id} onClick={openEditForm}>
        <td>
          {object.firstName} {object.lastName}
        </td>
        <td>{object.email}</td>
        <td>{object.telephone}</td>
        <td>
          {object.city}, {object.country}
        </td>
        <td>
          <DeleteBtn object={object} />
        </td>
      </tr>
    </>
  );
};

export default Postulant;
