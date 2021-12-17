import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Admin from './Admin';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import styles from './admins.module.css';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/admins`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return response.json();
      })
      .then((response) => {
        setAdmins(response);
      })
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  }, []);

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
