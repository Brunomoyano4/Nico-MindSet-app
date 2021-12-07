import styles from './form.module.css';
import Modal from '../../Shared/Modal';
import Input from '../../Shared/Input';
import Select from '../../Shared/Select';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function ProfilesForm() {
  const history = useHistory();
  const params = useQuery();
  const applicationId = params.get('id');
  const [positionsOption, setPositionsOption] = useState([]);
  const [positionsValue, setPositionsValue] = useState('');
  const [clientOption, setClientOption] = useState([]);
  const [clientValue, setClientValue] = useState('');
  const [postulantsOption, setPostulantsOption] = useState([]);
  const [postulantsValue, setPostulantsValue] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState({
    positionLoading: false,
    clientLoading: false,
    postulantLoading: false,
    applicationIdLoading: false
  });

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let url = `${process.env.REACT_APP_API}/applications`;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        positions: positionsValue,
        postulants: postulantsValue,
        client: clientValue,
        result: result
      }),
      method: 'POST'
    };
    if (applicationId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/applications/${applicationId}`;
    }
    fetch(url, options)
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          return res.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return res.json();
      })
      .then(() => history.replace('/applications'))
      .catch((error) => setError(error.toString()));
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
        .catch((error) => setError(error.toString()))
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
      .catch((error) => setError(error.toString()))
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
      .catch((error) => setError(error.toString()))
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
      .catch((error) => setError(error.toString()))
      .finally(() => {
        setLoading((prev) => {
          return { ...prev, positionLoading: false };
        });
      });
  }, []);

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <h2>Application Form</h2>
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => setError('')}
        type={'Error'}
      />
      <h3 className={error ? styles.error : ''}>{error}</h3>
      {Object.values(loading).some(Boolean) && (
        <div className={styles.spinnerContainer}>
          <LoadingSpinner />
        </div>
      )}
      <Select
        value={positionsValue}
        onChange={(e) => setPositionsValue(e.target.value)}
        label="Position:"
        id="positions-select"
        options={positionsOption}
        required
      />
      <Select
        value={clientValue}
        onChange={(e) => setClientValue(e.target.value)}
        label="Client:"
        id="client-select"
        options={clientOption}
        required
      />
      <Select
        value={postulantsValue}
        onChange={(e) => setPostulantsValue(e.target.value)}
        label="Postulant:"
        id="postulants-select"
        options={postulantsOption}
        required
      />
      <Input
        placeholder="Result"
        value={result}
        onChange={(e) => setResult(e.target.value)}
        label="Result:"
        id="result-input"
        required
      />
      <input
        type="submit"
        disabled={Object.values(loading).some(Boolean) ? 'disabled' : ''}
        value={applicationId ? 'Update Application' : 'Add Application'}
      />
    </form>
  );
}

export default ProfilesForm;
