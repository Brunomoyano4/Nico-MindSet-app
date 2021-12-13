import { useState } from 'react';
import DeleteBtn from '../../Shared/DeleteBtn';
import { useHistory } from 'react-router-dom';
import Modal from '../../Shared/Modal';
import { useDispatch } from 'react-redux';
import { deleteSession } from '../../../redux/sessions/thunks';

function Session({ session }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const openEditForm = () => {
    history.push(`/sessions/form?id=${session._id}`);
  };

  // const deleteSession = (event) => {
  //   event.stopPropagation();
  //   const url = `${process.env.REACT_APP_API}/sessions/${session._id}`;
  //   fetch(url, {
  //     method: 'DELETE'
  //   })
  //     .then((response) => {
  //       if (response.status !== 200) {
  //         return response.json().then(({ msg }) => {
  //           throw new Error(msg);
  //         });
  //       }
  //       setShowConfirmModal(false);
  //       return history.go(0);
  //     })
  //     .catch((error) => setError(error.toString()));
  // };

  return (
    <>
      <Modal
        title="Are you sure you want to delete the selected session?"
        onConfirm={(e) => {
          e.stopPropagation();
          dispatch(deleteSession(session._id));
        }}
        show={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        type={'Confirm'}
      />
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => setError('')}
        type={'Error'}
      />
      <tr key={session._id} onClick={openEditForm}>
        <td>{`${session.psychology.firstName} ${session.psychology.lastName}`}</td>
        {console.log(session)}
        <td>{`${session.postulant.firstName} ${session.postulant.lastName}`}</td>
        <td>{session.time}</td>
        <td>{session.date}</td>
        <td>{session.stat}</td>
        <td>
          <DeleteBtn
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirmModal(true);
            }}
          />
        </td>
      </tr>
    </>
  );
}

export default Session;
