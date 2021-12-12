import styles from './applications.module.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Application from './Application';
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
  const loading = useSelector((store) => store.application.isLoading);

  const tableHeaderItems = ['Position', 'Client', 'Postulant', 'Result', ''];
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalSubtitle, setModalSubtitle] = useState(['']);
  const [currentApplication, setCurrentApplication] = useState({});
  const history = useHistory();

  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);

  const toForm = (id) => {
    history.push(id ? `/applications/form?id=${id}` : '/applications/form');
  };

  return (
    <section className={styles.container}>
      <h2>Applications</h2>
      <table>
        <div className={styles.list}>
          <Application headerItems={tableHeaderItems} />
          {!loading && (
            <tbody className={styles.tableBody}>
              {applications.map((application) => {
                const deleteBtn = (
                  <DeleteBtn
                    className={styles.button}
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
                  <Application
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
        onConfirm={(e) => {
          e.stopPropagation();
          dispatch(deleteApplications(currentApplication._id));
          setShowConfirmModal(false);
        }}
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
    </section>
  );
}

export default Applications;
