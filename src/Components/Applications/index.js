import styles from './applications.module.css';
import { useState, useEffect } from 'react';
import ListItem from './ListItem';
import DeleteBtn from './DeleteBtn';
import Modal from './Modal';

function Applications() {
  const tableHeaderItems = ['Position', 'Client', 'Postulant', 'Result', ''];
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalSubtitle, setModalSubtitle] = useState(['modalSubtitle']);
  const [modalBtnOnClick, setModalBtnOnClick] = useState([]);
  const [modalError, setModalError] = useState('');

  const deleteApplication = (e, id, position, client, postulant) => {
    e.stopPropagation();
    setModalSubtitle([`Position: ${position}`, `Client: ${client}`, `Postulant: ${postulant}`]);
    setModalBtnOnClick([
      () => setShowModal(false),
      () => {
        fetch(`${process.env.REACT_APP_API}/applications/${id}`, {
          method: 'DELETE'
        })
          .then((response) => {
            if (response.status !== 200) {
              return response.json().then(({ message }) => {
                throw new Error(message);
              });
            }
            getApplications();
            setShowModal(false);
          })
          .catch((error) => {
            setModalError(JSON.stringify(error));
          });
      }
    ]);
    setShowModal(true);
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
      <Modal
        showHook={setShowModal}
        showModal={showModal}
        title="You are about to delete an application"
        subtitle={modalSubtitle}
        btnText={['Close', 'Proceed']}
        btnOnClick={modalBtnOnClick}
        error={modalError}
      ></Modal>

      <h2>Applications</h2>
      <table className={styles.list}>
        <ListItem headerItems={tableHeaderItems}></ListItem>
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
              ></DeleteBtn>
            );
            const tableListItems = [
              positions?.job,
              client?.customerName,
              `${postulants?.firstName} ${postulants?.lastName}`,
              result,
              deleteBtn
            ];
            return (
              <ListItem
                key={_id}
                listItems={tableListItems}
                id={_id}
                onRowClick={() => toForm(_id)}
              ></ListItem>
            );
          })}
        </tbody>
      </table>
      <button className={styles.addBtn} type="button" onClick={() => toForm()}>
        Add Application
      </button>
    </section>
  );
}

export default Applications;
