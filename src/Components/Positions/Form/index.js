import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import Input from '../../Shared/Input';
import styles from './form.module.css';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import Modal from '../../Shared/Modal';
import Button from '../../Shared/Button';

function Form() {
  const [clientIdValue, setClientIdValue] = useState('');
  const [jobValue, setJobValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [createdAtValue, setCreatedAtValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [disableButton, setDisableButton] = useState(false);

  const setInputValues = (data) => {
    setClientIdValue(data.clientId || 'N/A');
    setJobValue(data.job || 'N/A');
    setDescriptionValue(data.description || 'N/A');
    setCreatedAtValue(data.createdAt || 'N/A');
  };

  let url;
  const history = useHistory();
  const params = useQuery();
  const positionId = params.get('id');

  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      clientId: clientIdValue,
      job: jobValue,
      description: descriptionValue,
      createdAt: createdAtValue
    })
  };

  if (positionId) {
    useEffect(() => {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API}/positions/${positionId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ msg }) => {
              throw new Error(msg);
            });
          }
          return response.json();
        })
        .then((data) => setInputValues(data))
        .catch((error) => setError(error.toString()))
        .finally(() => setLoading(false));
    }, []);
  }

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setDisableButton(true);
    if (positionId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/positions/${positionId}`;
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/positions`;
    }
    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return history.replace('/positions');
      })
      .catch((error) => {
        setError(error.toString());
        setDisableButton(false);
      });
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2>Form</h2>
        <div className={styles.form}>
          {loading && (
            <div className={styles.spinnerContainer}>
              <LoadingSpinner />
            </div>
          )}
          <Input
            className={styles.input}
            label="Id"
            name="clientId"
            id="id"
            type="text"
            value={clientIdValue}
            onChange={(e) => setClientIdValue(e.target.value)}
            required
          />
          <Input
            className={styles.input}
            label="Job"
            name="job"
            id="job"
            type="text"
            value={jobValue}
            onChange={(e) => setJobValue(e.target.value)}
            required
          />
          <Input
            className={styles.input}
            label="Description"
            name="description"
            id="description"
            type="text"
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            required
          />
        </div>
        <Button
          className={styles.button}
          onClick={onSubmit}
          content={positionId ? 'Update Position' : 'Create position'}
          disabled={disableButton}
        />
      </form>
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => setError('')}
        type={'Error'}
      />
    </div>
  );
}

export default Form;

// const initialState = params.position._id
//   ? params.position
//   : {
//       clientId: '',
//       job: '',
//       description: ''
//     };
// const [position, setPosition] = useState(initialState);
// const [created, setCreated] = useState(false);
// const [error, setError] = useState();
// const [disableButton, setDisableButton] = useState(false);
// function savePositions(e) {
//   e.stopPropagation();
//   setDisableButton(true);
//   fetch(`${process.env.REACT_APP_API}/positions`, {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     method: 'POST',
//     body: JSON.stringify(position)
//   })
//     .then((response) => {
//       if (response.status === 201) {
//         setCreated(true);
//       } else
//         return response.json().then((error) => {
//           throw new Error(error);
//         });
//       params.positionsHook([]);
//       params.stateHook(1);
//     })
//     .catch((error) => setError(error.toString()));
// }
// function updatePosition(e) {
//   e.stopPropagation();
//   setDisableButton(true);
//   fetch(`${process.env.REACT_APP_API}/positions/${position._id}`, {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     method: 'PUT',
//     body: JSON.stringify(position)
//   })
//     .then((response) => {
//       if (response.status !== 200) {
//         return response.json().then(({ msg }) => {
//           throw new Error(msg);
//         });
//       }
//       params.positionsHook([]);
//       params.stateHook(1);
//     })
//     .catch((error) => setError(error.toString()));
// }
// function handleInputChange(e) {
//   const { name, value } = e.target;
//   setPosition({ ...position, [name]: value });
// }
// return (
//   <div>
//     {created ? (
//       <div>position created</div>
//     ) : (
//       <form className={styles.form}>
//         <Input
//           className={styles.input}
//           label="Id"
//           name="clientId"
//           id="id"
//           type="text"
//           value={position.clientId}
//           onChange={handleInputChange}
//           required
//         />
//         <Input
//           className={styles.input}
//           label="Job"
//           name="job"
//           id="job"
//           type="text"
//           value={position.job}
//           onChange={handleInputChange}
//           required
//         />
//         <Input
//           className={styles.input}
//           label="Description"
//           name="description"
//           id="description"
//           type="text"
//           value={position.description}
//           onChange={handleInputChange}
//           required
//         />
//         <Button
//           className={styles.button}
//           onClick={(e) => {
//             params.position._id ? updatePosition(e) : savePositions(e);
//           }}
//           content={params.position._id ? 'Update Position' : 'Create position'}
//           disabled={disableButton}
//         />
//       </form>
//     )}
//     <Modal
//       title="Something went wrong!"
//       subtitle={error}
//       show={error}
//       closeModal={() => setError('')}
//       type={'Error'}
//     />
//   </div>
// );
