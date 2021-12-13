import styles from './profiles.module.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ListItem from './ListItem';
import DeleteBtn from '../Shared/DeleteBtn/index';
import Modal from '../Shared/Modal';
import LoadingSpinner from '../Shared/LoadingSpinner';
import Button from '../Shared/Button';
import { deleteProfile, getProfiles } from '../../redux/profiles/thunks';
import { clearProfilesError } from '../../redux/profiles/actions';

function Profiles() {
  const dispatch = useDispatch();
  const profiles = useSelector((store) => store.profiles.list);
  const error = useSelector((store) => store.profiles.error);
  const loading = useSelector((store) => store.profiles.isLoading);
  const tableHeaderItems = ['Branch', 'Name', 'Description', ''];
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentProfile, setCurrentProfile] = useState({});

  const history = useHistory();

  const toForm = (id) => {
    history.push(id ? `/profiles/form?id=${id}` : '/profiles/form');
  };

  useEffect(() => {
    dispatch(getProfiles());
  }, []);

  return (
    <section className={styles.container}>
      <h2>Profiles</h2>
      <table>
        <div className={styles.list}>
          <ListItem headerItems={tableHeaderItems} />
          {!loading && (
            <tbody className={styles.tableBody}>
              {profiles.map((profile) => {
                const deleteBtn = (
                  <DeleteBtn
                    className={styles.button}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentProfile(profile);
                      setShowConfirmModal(true);
                    }}
                  />
                );
                const tableListItems = [
                  profile.branch,
                  profile.profileName,
                  profile.description,
                  deleteBtn
                ];
                return (
                  <ListItem
                    key={profile._id}
                    listItems={tableListItems}
                    id={profile._id}
                    onRowClick={() => toForm(profile._id)}
                  />
                );
              })}
            </tbody>
          )}
          {loading && <LoadingSpinner circle={false} />}
          {!loading && !profiles.length && (
            <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>
          )}
        </div>
        <Button className={styles.button} onClick={() => toForm()} content={'CREATE PROFILES'} />
      </table>
      <Modal
        title="You are about to delete a profile"
        onConfirm={(e) => {
          e.stopPropagation();
          dispatch(deleteProfile(currentProfile._id));
          history.replace('/profiles');
        }}
        show={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        type={'Confirm'}
      />
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => dispatch(clearProfilesError())}
        type={'Error'}
      />
    </section>
  );
}

export default Profiles;
