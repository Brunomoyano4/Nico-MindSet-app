import { useEffect, useState } from 'react';
import Admin from './Admin';
import CreateBtn from './CreateBtn';
import styles from './admins.module.css';
import LoadingSpinner from '../Shared/LoadingSpinner';

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/admins`)
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setAdmins(response);
      })
      .catch((error) => setError(error));
  }, []);
  return (
    <>
      <section className={styles.container}>
        <div className={styles.header}>
          <h2>Admins</h2>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
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
          {!loading && !admins && <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>}
        </div>
      </section>
      <section className={styles.createBtnSection}>
        {error && <div className={styles.error}>{error}</div>}
        <CreateBtn name="CreateBtn" />
      </section>
    </>
  );
}

export default Admins;
