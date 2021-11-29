import styles from './form.module.css';
import Input from '../Input';
import Select from '../Select';
import { useState, useEffect } from 'react';
function ProfilesForm() {
  const params = new URLSearchParams(window.location.search);
  const applicationId = params.get('id');
  const [positionsOption, setPositionsOption] = useState([]);
  const [positionsValue, setPositionsValue] = useState('');
  const [clientOption, setClientOption] = useState([]);
  const [clientValue, setClientValue] = useState('');
  const [postulantsOption, setPostulantsOption] = useState([]);
  const [postulantsValue, setPostulantsValue] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

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
        result: result.toLowerCase()
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
      .then(() => {
        window.location.href = '/profiles';
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    if (applicationId) {
      fetch(`${process.env.REACT_APP_API}/profiles/${applicationId}`)
        .then((res) => {
          if (res.status !== 200) {
            return res.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return res.json();
        })
        .then((data) => {
          setPositionsValue(data[0]?.positions?._id);
          setClientValue(data[0]?.client?._id);
          setPostulantsValue(data[0]?.postulants?._id);
          setResult(data[0].result);
        })
        .catch((error) => {
          setError(JSON.stringify(error));
          console.log(error);
          setError('error en use');
        });
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
          res.data.map((client) => ({
            value: client._id,
            label: client.customerName
          }))
        );
      })
      .catch((error) => {
        setError(error.toString());
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
          res.data.map((postulant) => ({
            value: postulant._id,
            label: `${postulant.firstName} ${postulant.lastName}`
          }))
        );
      })
      .catch((error) => {
        setError(error.toString());
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
          res.data.map((position) => ({
            value: position._id,
            label: position.job
          }))
        );
      })
      .catch((error) => {
        setError(error.toString());
      });
  }, []);

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <h2>Profile Form</h2>
      <h3>{error}</h3>
      <Select
        value={positionsValue}
        onChange={(e) => setPositionsValue(e.target.value)}
        label="Position:"
        id="positions-select"
        options={positionsOption}
      />
      <Select
        value={clientValue}
        onChange={(e) => setClientValue(e.target.value)}
        label="Client:"
        id="client-select"
        options={clientOption}
      />
      <Select
        value={postulantsValue}
        onChange={(e) => setPostulantsValue(e.target.value)}
        label="Postulant:"
        id="postulants-select"
        options={postulantsOption}
      />
      <Input
        placeholder="Result"
        value={result}
        onChange={(e) => setResult(e.target.value)}
        label="Result:"
        id="result-input"
        required
      />

      <input type="submit"></input>
    </form>
  );
}

export default ProfilesForm;
