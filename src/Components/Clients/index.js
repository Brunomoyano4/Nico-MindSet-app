import { useEffect, useState } from 'react';
import styles from './clients.module.css';

function Clients() {
  const [clients, saveClients] = useState([]);
  console.log('inicio', clients);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => response.json())
      .then((response) => {
        saveClients(response);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Clientes</h2>
      <div>
        {clients.map((client) => {
          return (
            <>
              <table className={styles.list}>
                <tr>
                  <th>
                    <a href={`/clients/form?id=${client._id}`} key={client._id}>
                      Name: {client.customerName}
                    </a>
                    <a href={`/clients/form?id=${client._id}`} key={client._id.phone}>
                      Phone: {client.phone}
                    </a>
                    <a href={`/clients/form?id=${client._id}`} key={client._id.branch}>
                      Branch: {client.branch}
                    </a>
                  </th>
                </tr>
              </table>
            </>
          );
        })}
      </div>
      <button className={styles.button} type="button">
        ADD CLIENT
      </button>
    </section>
  );
}

export default Clients;
