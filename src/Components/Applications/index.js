import styles from './applications.module.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ListItem from './ListItem';
import DeleteBtn from './DeleteBtn';
import Modal from './Modal';

function Applications() {
  const tableHeaderItems = ['Position', 'Client', 'Postulant', 'Result', ''];
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalSubtitle, setModalSubtitle] = useState(['modalSubtitle']);
  const [deleteId, setDeleteId] = useState('');

  const history = useHistory();

  const deleteApplication = (e, id, position, client, postulant) => {
    e.stopPropagation();
    setModalSubtitle([`Position: ${position}`, `Client: ${client}`, `Postulant: ${postulant}`]);
    setDeleteId(id);
    setShowModal(true);
  };

  const toForm = (id) => {
    history.push(id ? `/applications/form?id=${id}` : '/applications/form');
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
        closeBtnText="Close"
        proceedBtnText="Proceed"
        id={deleteId}
        getApplications={getApplications}
      />
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
      <button className={styles.addBtn} type="button" onClick={() => toForm()}>
        Add Application
      </button>
    </section>
  );
}

export default Applications;
