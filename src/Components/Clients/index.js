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
            <a href={`/clients/form?id=${client._id}`} key={client._id}>
              {client.customerName}
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default Clients;
