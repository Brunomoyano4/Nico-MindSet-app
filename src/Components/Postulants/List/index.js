import Postulant from '../Postulant';
import styles from './list.module.css';

const List = ({ thName, dataList }) => {
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
    </div>
  );
};

export default List;
