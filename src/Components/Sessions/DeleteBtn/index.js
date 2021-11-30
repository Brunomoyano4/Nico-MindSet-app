function DeleteBtn({ sessionId, sessions, filterSession }) {
  function DeleteSessions(Id, event) {
    event.stopPropagation();
    fetch(`${process.env.REACT_APP_API}/sessions/${Id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then((response) => {
        if (response._id === Id) {
          const filtered = sessions.filter((session) => session.sessionId != Id);
          filterSession(filtered);
        } else console.log('error to delete session');
      });
  }

  return <button onClick={(e) => DeleteSessions(sessionId, e)}>Delete</button>;
}

export default DeleteBtn;
