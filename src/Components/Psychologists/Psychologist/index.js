import { useState, useEffect } from 'react';
import DeleteBtn from '../../Shared/DeleteBtn';
import { useHistory } from 'react-router-dom';
import Modal from '../../Shared/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { deletePsychologist, getPsychologists } from '../../../redux/psychologists/thunks';
import { clearPsychologistsError } from '../../../redux/psychologists/actions';

function Psychologist({ psychologist }) {
  const dispatch = useDispatch();
  const psychologists = useSelector((store) => store.psychologists.list);
  const error = useSelector((store) => store.psychologists.error);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const history = useHistory();

  const openEditForm = () => {
    history.push(`/psychologists/form?id=${psychologist._id}`);
  };

  useEffect(() => {
    dispatch(getPsychologists());
  }, []);

  return (
    <>
      <Modal
        title="Are you sure you want to delete the selected psychologist?"
        onConfirm={(e) => {
          e.stopPropagation();
          dispatch(deletePsychologist(psychologist._id));
          setShowConfirmModal(false);
          history.push('/psychologists');
        }}
        show={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        type={'Confirm'}
      />
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => dispatch(clearPsychologistsError())}
        type={'Error'}
      />
      <tr key={psychologist._id} onClick={openEditForm}>
        <td>{psychologist.userName}</td>
        <td>{psychologist.firstName}</td>
        <td>{psychologist.lastName}</td>
        <td>{psychologist.email}</td>
        <td>{psychologist.password}</td>
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

export default Psychologist;
