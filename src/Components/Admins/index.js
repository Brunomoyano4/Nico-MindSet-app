import { useEffect, useState } from 'react';
//import EditBtn from './EditBtn';
import DeleteBtn from './DeleteBtn';
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
        <div>
          <h2>Admins</h2>
        </div>
        <div>
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
                return (
                  <tr key={admin._id}>
                    <td>
                      <a href={`/admins/form?id=${admin._id}`}>{admin.username}</a>
                    </td>
                    <td>{admin.firstName}</td>
                    <td>{admin.lastName}</td>
                    <td>{admin.email}</td>
                    <td>{admin.password}</td>
                    <td>{/*<EditBtn className="editBtn" name="EditBtn" value={admin._id} />*/}</td>
                    <td>
                      <DeleteBtn className="deleteBtn" name="DeleteBtn" admin={admin} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <section className={styles.createBtnSection}>
        <CreateBtn className="createBtn" name="CreateBtn" />
      </section>
    </>
  );
}

export default Admins;
