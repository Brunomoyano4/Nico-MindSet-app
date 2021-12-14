import styles from './form.module.css';
import Modal from '../../Shared/Modal';
import Input from '../../Shared/Input';
import Select from '../../Shared/Select';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../Shared/Button';
import { addApplications, updateApplications } from '../../../redux/applications/thunks';

function Form() {
  const history = useHistory();
  const params = useQuery();
  const applicationId = params.get('id');
  const dispatch = useDispatch();

  const [positionsValue, setPositionsValue] = useState('');
  const [clientValue, setClientValue] = useState('');
  const [postulantsValue, setPostulantsValue] = useState('');
  const [result, setResult] = useState('');

  const [positionsOption, setPositionsOption] = useState([]);
  const [clientOption, setClientOption] = useState([]);
  const [postulantsOption, setPostulantsOption] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const application = useSelector((store) => store.application.list);
  const error = useSelector((store) => store.application.error);
  const [loading, setLoading] = useState({
    positionLoading: false,
    clientLoading: false,
    postulantLoading: false,
    applicationIdLoading: false
  });

  const setInputValue = (data) => {
    setPositionsValue(data.position || '');
    setClientValue(data.client?.customerName || '');
    setPostulantsValue((data.postulants?.firstName || '') && (data.postulants?.lastName || ''));
    setResult(result || '');
  };

  const values = {
    positions: positionsValue,
    client: clientValue,
    postulants: postulantsValue,
    result: result
  };

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    if (applicationId) {
      application.forEach((application) => {
        if (application._id === applicationId) setInputValue(application);
      });
    }
  }, [applicationId]);

  const onSubmit = (event) => {
    event.preventDefault();
    setDisableButton(true);
    if (applicationId) {
      dispatch(updateApplications(applicationId, values));
    } else {
      dispatch(addApplications(values));
    }
    history.replace('/applications');
    setDisableButton(false);
  };

  useEffect(() => {
    setLoading({
      applicationIdLoading: applicationId ? true : false,
      positionLoading: true,
      clientLoading: true,
      postulantLoading: true
    });
    if (applicationId) {
      fetch(`${process.env.REACT_APP_API}/applications/${applicationId}`)
        .then((res) => {
          if (res.status !== 200) {
            return res.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return res.json();
        })
        .then((data) => {
          setPositionsValue(data?.positions?._id);
          setClientValue(data?.client?._id);
          setPostulantsValue(data?.postulants?._id);
          setResult(data.result);
        })
        .catch((error) => error.toString())
        .finally(() =>
          setLoading((prev) => {
            return { ...prev, applicationIdLoading: false };
          })
        );
    }

    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((res) => {
        if (res.status !== 200) {
          return res.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return res.json();
      })
      .then((res) => {
        setClientOption(
          res.map((client) => ({
            value: client._id,
            label: client.customerName
          }))
        );
        setClientValue(res[0]._id);
      })
      .catch((error) => error.toString())
      .finally(() => {
        setLoading((prev) => {
          return { ...prev, clientLoading: false };
        });
      });

    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((res) => {
        if (res.status !== 200) {
          return res.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return res.json();
      })
      .then((res) => {
        setPostulantsOption(
          res.map((postulant) => ({
            value: postulant._id,
            label: `${postulant.firstName} ${postulant.lastName}`
          }))
        );
        setPostulantsValue(res[0]._id);
      })
      .catch((error) => error.toString())
      .finally(() => {
        setLoading((prev) => {
          return { ...prev, postulantLoading: false };
        });
      });

    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((res) => {
        if (res.status !== 200) {
          return res.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return res.json();
      })
      .then((res) => {
        setPositionsOption(
          res.map((position) => ({
            value: position._id,
            label: position.job
          }))
        );
        setPositionsValue(res[0]._id);
      })
      .catch((error) => error.toString())
      .finally(() => {
        setLoading((prev) => {
          return { ...prev, positionLoading: false };
        });
      });
  }, []);

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <h2>Form</h2>
          <div className={styles.form}>
            <Modal
              title="Something went wrong!"
              subtitle={error}
              show={error}
              closeModal={() => error}
              type={'Error'}
            />
            <h3 className={error ? styles.error : ''}>{error}</h3>
            {Object.values(loading).some(Boolean) && (
              <div className={styles.spinnerContainer}>
                <LoadingSpinner />
              </div>
            )}
            <Select
              className={styles.select}
              value={positionsValue}
              onChange={(e) => setPositionsValue(e.target.value)}
              label="Position:"
              id="positions-select"
              options={positionsOption}
              required
            />
            <Select
              className={styles.select}
              value={clientValue}
              onChange={(e) => setClientValue(e.target.value)}
              label="Client:"
              id="client-select"
              options={clientOption}
              required
            />
            <Select
              className={styles.select}
              value={postulantsValue}
              onChange={(e) => setPostulantsValue(e.target.value)}
              label="Postulant:"
              id="postulants-select"
              options={postulantsOption}
              required
            />
            <Input
              className={styles.input}
              placeholder="Result"
              value={result}
              onChange={(e) => setResult(e.target.value)}
              label="Result:"
              id="result-input"
              required
            />
          </div>
          <Button
            className={styles.button}
            content={applicationId ? 'Update Application' : 'Create Application'}
            disabled={disableButton}
          />
        </form>
      </div>
    </>
  );
}

export default Form;
