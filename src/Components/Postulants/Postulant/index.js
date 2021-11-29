import DeleteBtn from '../DeleteBtn';

const Postulant = ({ object }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    const url = `${process.env.REACT_APP_API}/postulants/${object._id}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then((res) => {
        if (res.status !== 204) {
          return res.json().then((message) => {
            throw new Error(message);
          });
        }
      })
      .catch((error) => error);
    // };
  };
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
          <DeleteBtn object={object} onClick={(e) => handleDelete(e)} />
        </td>
      </tr>
    </>
  );
};

export default Postulant;
