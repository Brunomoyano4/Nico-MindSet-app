import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Admin from './Admin';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import styles from './admins.module.css';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmins } from '../../redux/admins/thunks';

function Admins() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const admins = useSelector((store) => store.admins.list);

  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);

  const CreateBtn = () => {
    history.push(`/admins/form`);
  };

  return (
    <>
      <section className={styles.container}>
        <h2>Admins</h2>
        <div>
          <table className={styles.list}>
            <thead>
              <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
                <th></th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {admins.map((admin) => {
                  return <Admin key={admin._id} admin={admin} />;
                })}
              </tbody>
            )}
          </table>
          {loading && <LoadingSpinner circle={false} />}
          {!loading && !admins.length && (
            <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>
          )}
          <Button className={styles.button} onClick={CreateBtn} content={'CREATE ADMIN'} />
        </div>
      </section>
      <section className={styles.createBtnSection}>
        {error && <div className={styles.error}>{error}</div>}
      </section>
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => setError('')}
        type={'Error'}
      />
    </>
  );
}

export default Admins;
