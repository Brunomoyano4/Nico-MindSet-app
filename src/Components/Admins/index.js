import { useEffect, useState } from 'react';
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
    <section className={styles.container}>
      <h2>Admins</h2>
      <div>
        {admins.map((admin) => {
          return (
            <div key={admin._id}>
              <a href="/admins/form">
                {admin.firstName + ' '} {admin.email}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Admins;
