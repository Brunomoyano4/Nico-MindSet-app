import styles from './postulantHome.module.css';
import { getPostulantById } from 'redux/postulants/thunks';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ToggleSwitch from 'Components/Shared/ToggleSwitch';

function PostulantHome() {
  const sessions = useSelector((store) => store.sessions.selectedItem);
  const postulant = useSelector((store) => store.postulants.selectedPostulant);
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
    if (postulantId) {
      dispatch(getPostulantById(postulantId));
    }
  }, []);

  const CreateBtn = () => {
    history.push(`postulant/postulants/form?id=61bd751a1d95a30cbccee7c2`);
  };

  return (
    <>
      <section className={styles.container}>
        <div className={styles.userInfoContainer}>
          <div className={styles.imgContainer}>
            <img
              className={styles.userImg}
              src="https://pbs.twimg.com/profile_images/1198892618429739008/hcHxthRT_400x400.jpg"
              alt="exampleAvatar"
            ></img>
          </div>
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
            <ToggleSwitch label="Available" />
          </div>
          <div className={styles.btnContainer}>
            <button onClick={CreateBtn} className={styles.btn}>
              EDIT
            </button>
          </div>
        </div>
        <div className={styles.divContainer}>
          <div className={styles.sessionsContainer}>
            <h2 className={styles.sessionsContent}>AVAILABLE SESSIONS:</h2>
            <div className={styles.sessionsInfo}>
              <div>
                <h3>{`${sessions.date} ${sessions.time}`}</h3>
                <button className={styles.sessionsBtn}>TAKE</button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.divContainer}>
          <div className={styles.interviewsContainer}>
            <h2>JOB INTERVIEWS:</h2>
          </div>
        </div>
      </section>
    </>
  );
}

export default PostulantHome;
