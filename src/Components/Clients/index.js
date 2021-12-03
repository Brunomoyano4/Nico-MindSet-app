import { useEffect, useState } from 'react';
import styles from './clients.module.css';
import Client from './Client';
import AddBtn from './AddBtn';

function Clients() {
  const [clients, saveClients] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => response.json())
      .then((response) => {
        saveClients(response);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Clients</h2>
      <div>
        <table className={styles.list}>
          <thead>
            <tr>
              <th>Name:</th>
              <th>Phone:</th>
              <th>Branch:</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => {
              return <Client key={client._id} client={client} />;
            })}
          </tbody>
        </table>
        <AddBtn className={styles.button} />
      </div>
    </section>
  );
}

export default Clients;
