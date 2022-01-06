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
  const [showPrevSessions, setShowPrevSessions] = useState(false);
  const [selectedSession, setselectedSession] = useState('');
  const sessions = useSelector((store) => store.sessions.list);
  const psychologist = useSelector((store) => store.psychologists.selectedItem);
  const loading = {
    sessionsLoading: useSelector((store) => store.sessions.isLoading)
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useQuery();
  const psychologistId = params.get('id');
  const today = new Date();

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

  const checkSessionStatus = (session) => {
    if (session) {
      switch (session.status) {
        case 'assigned':
          return <span className={styles.assignedSession}>{session.status}</span>;
        case 'successful':
          return <span className={styles.succesfullSession}>{session.status}</span>;
        case 'cancelled':
          return <span className={styles.cancelledSession}>{session.status}</span>;
      }
    }
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
              src="https://minimaltoolkit.com/images/randomdata/female/2.jpg"
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
          <h2 className={styles.userInfo}>
            psychologist <span className={styles.userInfo}>certified</span>
          </h2>
          <div className={styles.btnContainer}>
            <button onClick={() => console.log('EditBtn')} className={styles.btn}>
              settings
            </button>
            <button onClick={() => console.log('EditBtn')} className={styles.btn}>
              edit
            </button>
          </div>
        </div>
        <div className={styles.sessionCard}>
          <div className={styles.cardsInfoContainer}>
            <div className={styles.sessionsButtonsContainer}>
              <button className={styles.sessionsButton} onClick={() => setShowPrevSessions(false)}>
                scheduled sessions
              </button>
              <span className={styles.verticalLine} />
              <button className={styles.sessionsButton} onClick={() => setShowPrevSessions(true)}>
                previous sessions
              </button>
            </div>
            <div>
              {loading.sessionsLoading && (
                <div className={styles.spinnerContainer}>
                  <LoadingSpinner />
                </div>
              )}
              {!loading && !sessions.length && (
                <h3 className={styles.nothingHere}>No sessions yet!</h3>
              )}
            </div>
          </div>
          <div className={styles.sessionsContainer}>
            {!showPrevSessions ? (
              <>
                {sessions.map((session, i) => {
                  const today = new Date();
                  const sessionDate = new Date(session.date);
                  const formatedSessionsDate = sessionDate.toLocaleDateString();
                  return (
                    <>
                      {session.psychology._id === psychologistId && sessionDate >= today && (
                        <div key={i} className={styles.cardsInfo}>
                          <h3>{`${formatedSessionsDate} at ${session.time}`}</h3>
                          <span className={styles.postulantInfo}>
                            with: {`${session.postulant?.firstName} ${session.postulant?.lastName}`}
                          </span>
                          <h3 className={styles.statusInfo}>
                            status: {checkSessionStatus(session)}
                          </h3>
                          <button className={styles.sessionInfoBtn}>MORE INFO</button>
                        </div>
                      )}
                    </>
                  );
                })}
              </>
            ) : (
              <>
                {sessions.map((session, i) => {
                  const sessionDate = new Date(session.date);
                  const formatedSessionsDate = sessionDate.toLocaleDateString();
                  return (
                    <>
                      {session.psychology._id === psychologistId && sessionDate <= today && (
                        <div key={i} className={styles.cardsInfo}>
                          <h3>{`${formatedSessionsDate} at ${session.time}`}</h3>
                          <span className={styles.postulantInfo}>
                            with: {`${session.postulant?.firstName} ${session.postulant?.lastName}`}
                          </span>
                          <h3 className={styles.statusInfo}>
                            status: {checkSessionStatus(session)}
                          </h3>
                          <button className={styles.sessionInfoBtn}>MORE INFO</button>
                        </div>
                      )}
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default PostulantHome;
