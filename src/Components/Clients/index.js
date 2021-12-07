import { useEffect, useState } from 'react';
import styles from './clients.module.css';
import Client from './Client';
import AddBtn from './AddBtn';
import LoadingSpinner from '../Shared/LoadingSpinner';

function Clients() {
  const [clients, saveClients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => response.json())
      .then((response) => {
        saveClients(response);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className={styles.container}>
      <h2>Clients</h2>
      <div>
        <table className={styles.list}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Branch</th>
              <th></th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {clients.map((client) => {
                return <Client key={client._id} client={client} />;
              })}
            </tbody>
          )}
        </table>
        {loading && <LoadingSpinner circle={false} />}
        {!loading && !clients.length && (
          <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>
        )}
        <AddBtn className={styles.button} />
      </div>
    </section>
  );
}

export default Clients;
