import { useEffect } from 'react';
import { useHistory } from 'react-router';
import Psychologist from './Psychologist';
import Button from 'Components/Shared/Button';
import styles from './psychologists.module.css';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import Modal from 'Components/Shared/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { getPsychologists } from 'redux/psychologists/thunks';
import { clearPsychologistsError } from 'redux/psychologists/actions';

function Psychologists() {
  const dispatch = useDispatch();
  const psychologists = useSelector((store) => store.psychologists.list);
  const error = useSelector((store) => store.psychologists.error);
  const loading = useSelector((store) => store.psychologists.isLoading);
  const history = useHistory();

  /* useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/psychologists`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return response.json();
      })
      .then((response) => {
        setPsychologists(response);
      })
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  }, []); */

  useEffect(() => {
    dispatch(getPsychologists());
  }, []);

  const CreateBtn = () => {
    history.push(`/admin/psychologists/form`);
  };

  return (
    <>
      <section className={styles.container}>
        <h2>Psychologists</h2>
        <div>
          <table className={styles.list}>
            <thead>
              <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
                <th></th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {psychologists.map((psychologist) => {
                  return <Psychologist key={psychologist._id} psychologist={psychologist} />;
                })}
              </tbody>
            )}
          </table>
          {loading && <LoadingSpinner circle={false} />}
          {!loading && !psychologists.length && (
            <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>
          )}
          <Button className={styles.button} onClick={CreateBtn} content={'CREATE PSYCHOLOGIST'} />
        </div>
      </section>
      <section className={styles.createBtnSection}>
        <Modal
          title="Something went wrong!"
          subtitle={error}
          show={error}
          closeModal={() => dispatch(clearPsychologistsError())}
          type={'Error'}
        />
      </section>
    </>
  );
}

export default Psychologists;
