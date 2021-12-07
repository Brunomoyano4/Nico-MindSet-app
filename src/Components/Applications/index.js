import styles from './applications.module.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ListItem from './ListItem';
import DeleteBtn from './DeleteBtn';
import Modal from '../Shared/Modal';
import LoadingSpinner from '../Shared/LoadingSpinner';

function Applications() {
  const tableHeaderItems = ['Position', 'Client', 'Postulant', 'Result', ''];
  const [applications, setApplications] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalSubtitle, setModalSubtitle] = useState(['']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentApplication, setCurrentApplication] = useState({});

  const history = useHistory();

  const deleteApplication = (e, id, position, client, postulant) => {
    e.stopPropagation();
    setModalSubtitle([
      `ID: ${id}`,
      `Position: ${position}`,
      `Client: ${client}`,
      `Postulant: ${postulant}`
    ]);
    fetch(`${process.env.REACT_APP_API}/applications/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        setShowConfirmModal(false);
        getApplications();
      })
      .catch((error) => setError(error.toString()));
  };

  const toForm = (id) => {
    history.push(id ? `/applications/form?id=${id}` : '/applications/form');
  };

  const getApplications = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return response.json();
      })
      .then((data) => {
        setApplications(data);
      })
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  };

  useEffect(getApplications, []);

  return (
    <section className={styles.container}>
      <h2>Applications</h2>
      <table className={styles.list}>
        <ListItem headerItems={tableHeaderItems} />
        {!loading && (
          <tbody className={styles.tableBody}>
            {applications.map((application) => {
              const deleteBtn = (
                <DeleteBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentApplication(application);
                    setShowConfirmModal(true);
                  }}
                />
              );
              const tableListItems = [
                application.positions?.job,
                application.client?.customerName,
                `${application.postulants?.firstName} ${application.postulants?.lastName}`,
                application.result,
                deleteBtn
              ];
              return (
                <ListItem
                  key={application._id}
                  listItems={tableListItems}
                  id={application._id}
                  onRowClick={() => toForm(application._id)}
                />
              );
            })}
          </tbody>
        )}
      </table>
      {loading && <LoadingSpinner circle={false} />}
      {!loading && !applications.length && (
        <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>
      )}
      <Modal
        title="You are about to delete an application"
        onConfirm={(e) =>
          deleteApplication(
            e,
            currentApplication._id,
            currentApplication.positions.job,
            currentApplication.client.customerName,
            `${currentApplication.postulants.firstName} ${currentApplication.postulants.lastName}`
          )
        }
        show={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        subtitle={modalSubtitle}
        type={'Confirm'}
      />
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => setError('')}
        type={'Error'}
      />
      <button className={styles.addBtn} type="button" onClick={() => toForm()}>
        Add Application
      </button>
    </section>
  );
}

export default Applications;
