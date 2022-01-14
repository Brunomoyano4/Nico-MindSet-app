import styles from './inputModal.module.css';
import React from 'react';
import Button from '../Button';
import PostulantForm from 'Components/Admin/Postulants/Form';
import PsychologistsForm from 'Components/Admin/Psychologists/Form';

function InputModal(props) {
  const session = props.session;
  const postulant = props.session.postulant;

  if (!props.show) {
    return null;
  }

  const onCloseModal = (event) => {
    event.stopPropagation();
    props.closeModal(event);
  };

  const checkPostulantStudies = () => {
    let endDate = new Date();
    console.log(postulant?.studies?.universityStudies.at(-1));
    // return postulant?.studies?.universitaryStudies.institute.at(-1);
    if (postulant.studies.universityStudies.length > 0) {
      endDate = new Date(postulant?.studies?.universityStudies.at(-1).endDate);
      return (
        <div className={styles.schoolContainer}>
          <h2>Most recent university title:</h2>
          <span>{postulant?.studies?.universityStudies.at(-1).description}</span>
          <h2>From:</h2>
          <span>{postulant?.studies?.universityStudies.at(-1).institute}</span>
          <h2>Finishing year:</h2>
          <span>{endDate.toLocaleDateString()}</span>
        </div>
      );
    } else if (postulant?.studies?.tertiaryStudies.length > 0) {
      endDate = new Date(postulant?.studies?.tertiaryStudies.at(-1).endDate);
      return (
        <div className={styles.schoolContainer}>
          <h2>Most recent tertiary title:</h2>
          <span>{postulant?.studies?.tertiaryStudies.at(-1).description}</span>
          <h2>From:</h2>
          <span>{postulant?.studies?.tertiaryStudies.at(-1).institute}</span>
          <h2>Finishing year:</h2>
          <span>{endDate.toLocaleDateString()}</span>
        </div>
      );
    } else if (postulant?.studies?.informalStudies.length > 0) {
      endDate = new Date(postulant?.studies?.informalStudies.at(-1).endDate);
      return (
        <div className={styles.schoolContainer}>
          <h2>Most recent tertiary title:</h2>
          <span>{postulant?.studies?.informalStudies.at(-1).description}</span>
          <h2>From:</h2>
          <span>{postulant?.studies?.informalStudies.at(-1).institute}</span>
          <h2>Finishing year:</h2>
          <span>{endDate.toLocaleDateString()}</span>
        </div>
      );
    } else {
      endDate = new Date(postulant?.studies?.secondaryStudies.endDate);
      return (
        <div className={styles.schoolContainer}>
          <h2>Most recent school title:</h2>
          <span>Highschool</span>
          <h2>From:</h2>
          <span>{postulant?.studies?.secondaryStudies.school}</span>
          <h2>Finishing year:</h2>
          <span>{endDate.toLocaleDateString()}</span>
        </div>
      );
    }
  };

  const setModalContent = (type) => {
    if (type) {
      switch (type) {
        case 'postulant':
          return <PostulantForm edit={true} closeModal={(e) => onCloseModal(e)} />;
        case 'psychologist':
          return <PsychologistsForm edit={true} closeModal={(e) => onCloseModal(e)} />;
        case 'postulantProfile':
          console.log(props.session);
          return (
            <>
              <div className={styles.postulantContainer}>
                <div className={styles.leftSideContainer}>
                  <img src="https://pbs.twimg.com/profile_images/1198892618429739008/hcHxthRT_400x400.jpg" />
                  <h2>
                    {postulant?.firstName} {postulant?.lastName}
                  </h2>
                  <span>{postulant?.profile}</span>
                  <span>Session date:</span>
                  <span>{new Date(session.date).toLocaleDateString()}</span>
                  <Button content="Cancel session" />
                </div>
                <div className={styles.rightSideContainer}>
                  <span>{checkPostulantStudies()}</span>
                </div>
              </div>
            </>
          );
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.title}>
          <span className={styles.closeBtn} onClick={(e) => onCloseModal(e)}>
            X
          </span>
          <h2>{props.title}</h2>
          <span className={styles.subtitle}>{props.subtitle}</span>
        </div>
        <div className={styles.modalBody}>{setModalContent(props.type)}</div>
      </div>
    </div>
  );
}

export default InputModal;
