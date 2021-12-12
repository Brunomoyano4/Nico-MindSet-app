import styles from './application.module.css';

const Application = ({ headerItems, listItems, id, onRowClick }) => {
  return (
    <>
      {headerItems && (
        <thead className={styles.tableHeader}>
          <tr>
            {headerItems.map((item, idx) => {
              return <th key={`header-${idx}`}>{item}</th>;
            })}
          </tr>
        </thead>
      )}
      {listItems && (
        <tr className={styles.tr} onClick={onRowClick}>
          {listItems.map((item, idx) => {
            return <td key={`item-${idx}-${id}`}>{item}</td>;
          })}
        </tr>
      )}
    </>
  );
};

export default Application;
