import styles from './postulantHome.module.css';
import { getPostulantById } from 'redux/postulants/thunks';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function PostulantHome() {
  const postulant = useSelector((store) => store.postulants.selectedPostulant);

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
          <h2 className={styles.userInfo}>
            {postulant.firstName} {postulant.lastName}
          </h2>
          <h2 className={styles.userInfo}>
            {postulant.city},{postulant.province} - {postulant.country}
          </h2>
        </div>
        <div className={styles.divContainer}></div>
        <div className={styles.divContainer}></div>
      </section>
    </>
  );
}

export default PostulantHome;
