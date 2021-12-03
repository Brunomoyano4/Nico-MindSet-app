function DeleteBtn({ sessionId, sessions, filterSession }) {
  function DeleteSessions(Id, event) {
    event.stopPropagation();
    const filtered = sessions.filter((session) => session.sessionId != Id);
    fetch(`${process.env.REACT_APP_API}/sessions/${Id}`, { method: 'DELETE' }).then((response) =>
      response.ok ? filterSession(filtered) : console.log('error to delete session')
    );
  }

  return <button onClick={(e) => DeleteSessions(sessionId, e)}>Delete</button>;
}

export default DeleteBtn;
