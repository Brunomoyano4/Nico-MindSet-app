function DeleteBtn({ positionId }) {
  function DeletePositions(Id, event) {
    event.stopPropagation();
    fetch(`${process.env.REACT_APP_API}/positions/${Id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then((response) => {
        if (response._id === Id) console.log('position delete');
        else console.log('error to delete position');
      });
  }

  return <button onClick={(e) => DeletePositions(positionId, e)}>Delete</button>;
}

export default DeleteBtn;
