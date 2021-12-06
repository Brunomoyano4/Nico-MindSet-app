import { useState } from 'react';
function DeleteBtn({ sessionId, sessions, filterSession }) {
  const [error, setError] = useState('');
  const refreshPage = () => {
    window.location.reload();
  };
  function DeleteSessions(Id, event) {
    event.stopPropagation();
    const filtered = sessions.filter((session) => session.sessionId != Id);
    fetch(`${process.env.REACT_APP_API}/sessions/${Id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.ok) {
          filterSession(filtered);
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => {
        refreshPage();
      });
  }

  return (
    <div>
      <button onClick={(e) => DeleteSessions(sessionId, e)}>Delete</button>
      <span>{error}</span>
    </div>
  );
}

export default DeleteBtn;