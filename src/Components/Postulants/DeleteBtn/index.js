const DeleteBtn = ({ object }) => {
  const handleDelete = () => {
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
  return (
    <>
      <button onClick={handleDelete}>
        <img src="../Assets/deleteIcon.png"></img>
      </button>
    </>
  );
};

export default DeleteBtn;
