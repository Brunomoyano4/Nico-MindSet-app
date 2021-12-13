import { useEffect } from 'react';
import { useHistory } from 'react-router';
import Client from './Client';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import styles from './clients.module.css';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { useSelector, useDispatch } from 'react-redux';
import { getClients } from '../../redux/clients/thunks';
import { clearClientsError } from '../../redux/clients/actions';

function Clients() {
  const history = useHistory();
  const dispatch = useDispatch();
  const clients = useSelector((store) => store.clients.list);
  const error = useSelector((store) => store.clients.error);
  const loading = useSelector((store) => store.clients.isLoading);

  useEffect(() => {
    dispatch(getClients());
  }, []);

  const CreateBtn = () => {
    history.push(`/clients/form`);
  };

  return (
    <>
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
          <Button className={styles.button} onClick={CreateBtn} content={'CREATE CLIENT'} />
        </div>
      </section>
      <section className={styles.createBtnSection}>
        {error && <div className={styles.error}>{error}</div>}
      </section>
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => dispatch(clearClientsError())}
        type={'Error'}
      />
    </>
  );
}

export default Clients;
