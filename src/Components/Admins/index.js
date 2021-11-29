import { useEffect, useState } from 'react';
//import EditBtn from './EditBtn';
import Admin from './Admin';
import CreateBtn from './CreateBtn';
import styles from './admins.module.css';

function Admins() {
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/admins`)
      .then((response) => response.json())
      .then((response) => {
        setAdmins(response);
      });
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
            <tbody>
              {admins.map((admin) => {
                return <Admin key={admin._id} admin={admin} />;
              })}
            </tbody>
          </table>
        </div>
      </section>
      <section className={styles.createBtnSection}>
        <CreateBtn name="CreateBtn" />
      </section>
    </>
  );
}

export default Admins;
