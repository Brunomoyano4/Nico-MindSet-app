const DeleteBtn = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick}>
        <img src="../Assets/deleteIcon.png"></img>
      </button>
    </>
  );
};

export default DeleteBtn;
