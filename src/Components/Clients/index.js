import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styles from './clients.module.css';
import Client from './Client';
import LoadingSpinner from '../Shared/LoadingSpinner';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';

function Clients() {
  const [clients, saveClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return response.json();
      })
      .then((data) => {
        saveClients(data);
      })
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  }, []);

  const CreateBtn = () => {
    history.push(`/clients/form`);
  };

  return (
    <section className={styles.container}>
      <h2>Clients</h2>
      <table>
        <div className={styles.list}>
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
          {loading && <LoadingSpinner circle={false} />}
          {!loading && !clients.length && (
            <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>
          )}
        </div>
        <Button className={styles.button} onClick={CreateBtn} content={'CREATE CLIENT'} />
      </table>
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => setError('')}
        type={'Error'}
      />
    </section>
  );
}

export default Clients;
