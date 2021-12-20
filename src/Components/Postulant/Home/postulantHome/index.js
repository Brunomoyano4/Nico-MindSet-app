import styles from './postulantHome.module.css';
import Modal from 'Components/Shared/Modal';
import ToggleSwitch from 'Components/Shared/ToggleSwitch';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import React, { useEffect, useState } from 'react';
import { getPostulantById, updatePostulant } from 'redux/postulants/thunks';
import { getSessions } from 'redux/sessions/thunks';
import { getInterviews } from 'redux/interviews/thunks';
import { deleteInterviews } from 'redux/interviews/thunks';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

function PostulantHome() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedInterview, setselectedInterview] = useState('');
  const [availableValue, setAvailableValue] = useState('');
  const sessions = useSelector((store) => store.sessions.list);
  const interviews = useSelector((store) => store.interviews.list);
  const postulant = useSelector((store) => store.postulants.selectedPostulant);
  const loading = {
    sessionsLoading: useSelector((store) => store.sessions.isLoading),
    interviewsLoading: useSelector((store) => store.interviews.isLoading),
    postulantLoading: useSelector((store) => store.postulants.isLoading)
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useQuery();
  const postulantId = params.get('id');

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  // ?id=61bd751a1d95a30cbccee7c2

  useEffect(() => {
    // if (postulantId) {
    dispatch(getPostulantById(postulantId));
    // }
  }, []);

  useEffect(() => {
    dispatch(getSessions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getInterviews());
  }, [dispatch]);

  const EditBtn = () => {
    history.push(`/admin/postulants/form?id=61bd751a1d95a30cbccee7c2`);
  };

  const changeAvailability = () => {
    setAvailableValue(!availableValue);
    const value = {
      availabilty: availableValue
    };
    dispatch(updatePostulant(postulantId, value));
  };

  const cancelInterview = () => {
    dispatch(deleteInterviews(selectedInterview));
  };

  return (
    <>
      <Modal
        title="Are you sure you want to delete the selected session?"
        onConfirm={(e) => {
          e.stopPropagation();
          cancelInterview();
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
            {postulant.firstName} {postulant.lastName}
          </h2>
          <div className={styles.exp}>
            {postulant.experience?.map((exp) => {
              return (
                <h2 className={styles.userInfo} key={exp.jobPosition}>{`${exp.jobPosition}`}</h2>
              );
            })}
          </div>
          <div className={styles.prof}>
            {postulant.profiles?.map((profile) => {
              return (
                <span className={styles.userInfo} key={profile.profile.profileName}>
                  -{`${profile.profile.profileName}`}
                </span>
              );
            })}
          </div>
          <h2 className={styles.userInfo}>
            {postulant.city}, {postulant.province} - {postulant.country}
          </h2>
          <div className={styles.toggleSwitch}>
            <ToggleSwitch
              label="Available"
              toggled={postulant.availabilty}
              onClick={changeAvailability}
            />
          </div>
          <div className={styles.btnContainer}>
            <button onClick={EditBtn} className={styles.btn}>
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
              {!loading && !interviews.length && (
                <h3 className={styles.nothingHere}>No sessions available!</h3>
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
              {!loading && !interviews.length && (
                <h3 className={styles.nothingHere}>No interviews yet!</h3>
              )}
              {interviews.map((interview, i) => {
                return (
                  <div key={i} className={styles.cardsInfo}>
                    <h3>{`${interview.dateTime} ${interview.status}`}</h3>
                    {interview.status === 'pending' && (
                      <button
                        className={styles.sessionsBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setselectedInterview(interview._id);
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
