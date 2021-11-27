import Postulant from '../Postulant';
import styles from './list.module.css';

const List = ({ thName, dataList }) => {
  const openNewForm = () => {
    window.location.href = `/postulants/form`;
  };

  return (
    <div className={styles.container}>
      <table className={styles.list}>
        <thead>
          <tr>
            {thName.map((th) => {
              return <th key={th}>{th}</th>;
            })}
          </tr>
        </thead>
        <tbody className={styles.tableList}>
          {dataList.map((object) => {
            return <Postulant key={object._id} object={object} />;
          })}
        </tbody>
      </table>
      <button className={styles.button} onClick={openNewForm}>
        ADD NEW POSTULANT
      </button>
    </div>
  );
};

export default List;
