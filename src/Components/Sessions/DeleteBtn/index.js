// import { useHistory } from 'react-router-dom';
// import { useState } from 'react';
// function DeleteBtn({ sessionId, sessions, filterSession }) {
//   const [error, setError] = useState('');
//   const history = useHistory();

//   const refreshPage = () => {
//     history.go(0);
//   };
//   function DeleteSessions(Id, event) {
//     event.stopPropagation();
//     const filtered = sessions.filter((session) => session.sessionId != Id);
//     fetch(`${process.env.REACT_APP_API}/sessions/${Id}`, { method: 'DELETE' })
//       .then((response) => {
//         if (response.ok) {
//           filterSession(filtered);
//         }
//       })
//       .catch((error) => setError(error.message))
//       .finally(() => {
//         refreshPage();
//       });
//   }

//   return (
//     <div>
//       <button onClick={(e) => DeleteSessions(sessionId, e)}>Delete</button>
//       <span>{error}</span>
//     </div>
//   );
// }

// export default DeleteBtn;
