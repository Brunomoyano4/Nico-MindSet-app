import styles from './applications.module.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ListItem from './ListItem';
import DeleteBtn from '../Shared/DeleteBtn/index';
import Modal from '../Shared/Modal';
import LoadingSpinner from '../Shared/LoadingSpinner';
import Button from '../Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  getApplications,
  addApplications,
  deleteApplications
} from '../../redux/applications/thunks';

function Applications() {
  const dispatch = useDispatch();
  const applications = useSelector((store) => store.application.list);
  const error = useSelector((store) => store.application.error);

  const tableHeaderItems = ['Position', 'Client', 'Postulant', 'Result', ''];
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalSubtitle, setModalSubtitle] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [currentApplication, setCurrentApplication] = useState({});

  const history = useHistory();

  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);

  const toForm = (id) => {
    history.push(id ? `/applications/form?id=${id}` : '/applications/form');
  };

  const deleteApplication = (application) => {
    dispatch(deleteApplications(application));
    setShowConfirmModal(false);
    dispatch(getApplications(applications));
  };

  // -------------------- Delete Applications ----------------------

  // const deleteApplication = (e, id, position, client, postulant) => {
  //   e.stopPropagation();
  //   setModalSubtitle([
  //     `ID: ${id}`,
  //     `Position: ${position}`,
  //     `Client: ${client}`,
  //     `Postulant: ${postulant}`
  //   ]);
  //   fetch(`${process.env.REACT_APP_API}/applications/${id}`, {
  //     method: 'DELETE'
  //   })
  //     .then((response) => {
  //       if (response.status !== 200) {
  //         return response.json().then(({ msg }) => {
  //           throw new Error(msg);
  //         });
  //       }
  //       setShowConfirmModal(false);
  //       // getApplications();
  //     })
  //     .catch((error) => setError(error.toString()));
  // };
  // ---------------------------------------------------------------

  // --------------------- GET APPLICATIONS ------------------------
  // const getApplications = () => {
  //   setLoading(true);
  //   fetch(`${process.env.REACT_APP_API}/applications`)
  //     .then((response) => {
  //       if (response.status !== 200) {
  //         return response.json().then(({ msg }) => {
  //           throw new Error(msg);
  //         });
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setApplications(data);
  //     })
  //     .catch((error) => setError(error.toString()))
  //     .finally(() => setLoading(false));
  // };

  // ---------------------------------------------------------------

  return (
    <section className={styles.container}>
      <h2>Applications</h2>
      <table>
        <div className={styles.list}>
          <ListItem headerItems={tableHeaderItems} />
          {!loading && (
            <tbody className={styles.tableBody}>
              {applications.map((application) => {
                const deleteBtn = (
                  <DeleteBtn
                    className={styles.button}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentApplication(applications);
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
          {loading && <LoadingSpinner circle={false} />}
          {!loading && !applications.length && (
            <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>
          )}
        </div>
        <Button
          className={styles.button}
          onClick={() => toForm()}
          content={'CREATE APPLICATIONS'}
        />
      </table>

      <Modal
        title="You are about to delete an application"
        onConfirm={(e) => deleteApplication(e, applications._id)}
        show={showConfirmModal}
        closeModal={() => getApplications()}
        subtitle={modalSubtitle}
        type={'Confirm'}
      />
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => error('')}
        type={'Error'}
      />
    </section>
  );
}

export default Applications;
