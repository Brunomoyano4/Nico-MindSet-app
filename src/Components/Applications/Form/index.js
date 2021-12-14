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
import { clearApplicationsError } from '../../../redux/applications/actions';

function Form() {
  const history = useHistory();
  const params = useQuery();
  const applicationId = params.get('id');
  const dispatch = useDispatch();

  const [positionsValue, setPositionsValue] = useState('');
  const [clientValue, setClientValue] = useState('');
  const [postulantsValue, setPostulantsValue] = useState('');
  const [result, setResult] = useState('');

  const [jobValue, setJobValue] = useState('');
  const [customerNameValue, setCustomerNameValue] = useState('');
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [resultValue, setResultValue] = useState('');

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

  const setInputValue = ({ job, customerName, firstName, lastName, result }) => {
    setJobValue(job || '');
    setCustomerNameValue(customerName || '');
    setFirstNameValue(firstName || '');
    setLastNameValue(lastName || '');
    setResultValue(result || '');
  };

  useEffect(() => {
    if (applicationId) {
      if (Object.keys(application).length) {
        setPositionsValue(application.job);
        setClientValue(application.customerName);
        setPostulantsValue(application.firstName);
        setResult(application.description);
      }
    }
  }, [application]);

  const values = {
    job: jobValue,
    customerName: customerNameValue,
    firstName: firstNameValue,
    lastName: lastNameValue,
    result: resultValue
  };

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  // useEffect(() => {
  //   if (applicationId) {
  //     application.forEach((application) => {
  //       if (application._id === applicationId) setInputValue(application);
  //     });
  //   }
  // }, [applicationId]);

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   setDisableButton(true);
  //   let url = `${process.env.REACT_APP_API}/applications`;
  //   const options = {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       positions: positionsValue,
  //       postulants: postulantsValue,
  //       client: clientValue,
  //       result: result
  //     }),
  //     method: 'POST'
  //   };
  //   if (applicationId) {
  //     options.method = 'PUT';
  //     url = `${process.env.REACT_APP_API}/applications/${applicationId}`;
  //   }
  //   fetch(url, options)
  //     .then((res) => {
  //       if (res.status !== 200 && res.status !== 201) {
  //         return res.json().then(({ message }) => {
  //           throw new Error(message);
  //         });
  //       }
  //       return res.json();
  //     })
  //     .then(() => history.replace('/applications'))
  //     .catch((error) => {
  //       setError(error.toString());
  //       setDisableButton(false);
  //     });
  // };.

  const onSubmit = (event) => {
    event.preventDefault();
    setDisableButton(true);
    if (applicationId) {
      dispatch(updateApplications(values));
    } else {
      dispatch(addApplications(applicationId, values));
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
