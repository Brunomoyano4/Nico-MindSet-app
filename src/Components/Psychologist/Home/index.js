import styles from './postulantHome.module.css';
import Modal from 'Components/Shared/Modal';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import React, { useEffect, useState, useRef } from 'react';
import { getPostulantById, updatePostulant } from 'redux/postulants/thunks';
import { deleteSession, getSessions } from 'redux/sessions/thunks';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getPsychologistById } from 'redux/psychologists/thunks';

function PostulantHome() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedSession, setselectedSession] = useState('');
  const sessions = useSelector((store) => store.sessions.list);
  const psychologist = useSelector((store) => store.postulants.selectedItem);
  const loading = {
    sessionsLoading: useSelector((store) => store.sessions.isLoading)
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useQuery();
  const psychologistId = params.get('id');

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    dispatch(getPsychologistById(psychologistId));
  }, []);

  useEffect(() => {
    dispatch(getSessions());
  }, [dispatch]);

  const cancelSession = () => {
    dispatch(deleteSession(selectedSession));
  };

  return (
    <>
      <Modal
        title="Are you sure you want to delete the selected session?"
        onConfirm={(e) => {
          e.stopPropagation();
          cancelSession();
        }}
        show={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        type={'Confirm'}
      />
      <section className={styles.container}>
        <div className={styles.userInfoContainer}>
          <div className={styles.imgContainer}>
            <img
              className={styles.userImg}
              id="userImg"
              src="https://pbs.twimg.com/profile_images/1198892618429739008/hcHxthRT_400x400.jpg"
              alt="exampleAvatar"
            ></img>
          </div>
          {loading.postulantLoading && (
            <div className={styles.spinnerContainer}>
              <LoadingSpinner />
            </div>
          )}
          <h2 className={styles.userName}>
            {psychologist?.firstName || '-'} {psychologist?.lastName || '-'}
          </h2>
          <h2>psychologist</h2>
          <h2 className={styles.userInfo}>
            {psychologist?.city}, {psychologist?.province} - {psychologist?.country}
          </h2>
          <div className={styles.btnContainer}>
            <button onClick={() => console.log('EditBtn')} className={styles.btn}>
              EDIT
            </button>
          </div>
        </div>
        <div className={styles.divContainer}>
          <div className={styles.cardsInfoContainer}>
            <h2 className={styles.cardsInfoTitle}>AVAILABLE SESSIONS</h2>
            <div>
              {loading.sessionsLoading && (
                <div className={styles.spinnerContainer}>
                  <LoadingSpinner />
                </div>
              )}
              {!loading && !sessions.length && (
                <h3 className={styles.nothingHere}>No sessions yet!</h3>
              )}
              {sessions.map((session, i) => {
                const sessionDate = new Date(session.date);
                const formatedSessionsDate = sessionDate.toLocaleDateString();
                return (
                  <div key={i} className={styles.cardsInfo}>
                    <h3>{`${formatedSessionsDate} at ${session.time}`}</h3>
                    <button className={styles.sessionsBtn}>TAKE</button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.divContainer}>
          <div className={styles.infoCardsContainer}>
            <h2 className={styles.cardsInfoTitle}>JOB INTERVIEWS</h2>
            <div>
              {loading.interviewsLoading && (
                <div className={styles.spinnerContainer}>
                  <LoadingSpinner />
                </div>
              )}
              {!loading && !sessions.length && (
                <h3 className={styles.nothingHere}>No sessions yet!</h3>
              )}
              {sessions.map((interview, i) => {
                return (
                  <div key={i} className={styles.cardsInfo}>
                    <h3>{`${interview.dateTime} ${interview.status}`}</h3>
                    {interview.status === 'pending' && (
                      <button
                        className={styles.sessionsBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setselectedSession(interview._id);
                          setShowConfirmModal(true);
                        }}
                      >
                        CANCEL
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PostulantHome;
