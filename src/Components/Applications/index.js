import styles from './applications.module.css';
import { useState, useEffect } from 'react';
import ListItem from './ListItem';
import DeleteBtn from './DeleteBtn';
import Modal from '../Shared/Modal';

function Applications() {
  const tableHeaderItems = ['Position', 'Client', 'Postulant', 'Result', ''];
  const [applications, setApplications] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalSubtitle, setModalSubtitle] = useState(['modalSubtitle']);
  const [error, setError] = useState('');

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
      .catch((error) => {
        setError(JSON.stringify(error));
      });
  };

  const toForm = (id) => {
    window.location.href = id ? `/applications/form?id=${id}` : '/applications/form';
  };

  const getApplications = () => {
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setApplications(res);
      });
  };

  useEffect(getApplications, []);

  return (
    <section className={styles.container}>
      <h2>Applications</h2>
      <table className={styles.list}>
        <ListItem headerItems={tableHeaderItems} />
        <tbody className={styles.tableBody}>
          {applications.map(({ _id, positions, client, postulants, result }) => {
            const deleteBtn = (
              <DeleteBtn
                onClick={(e) =>
                  deleteApplication(
                    e,
                    _id,
                    positions?.job,
                    client?.customerName,
                    `${postulants?.firstName} ${postulants?.lastName}`
                  )
                }
              />
            );
            const tableListItems = [
              positions?.job,
              client?.customerName,
              `${postulants?.firstName} ${postulants?.lastName}`,
              result,
              deleteBtn
            ];
            <Modal
              title="You are about to delete an application"
              onConfirm={(e) =>
                deleteApplication(
                  e,
                  _id,
                  positions?.job,
                  client?.customerName,
                  `${postulants?.firstName} ${postulants?.lastName}`
                )
              }
              show={showConfirmModal}
              subtitle={modalSubtitle}
            />;
            return (
              <ListItem
                key={_id}
                listItems={tableListItems}
                id={_id}
                onRowClick={() => toForm(_id)}
              />
            );
          })}
        </tbody>
      </table>
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
