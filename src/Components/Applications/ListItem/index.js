import styles from './listitem.module.css';

const ListItem = ({ headerItems, listItems, id, onRowClick }) => {
  // console.log(headerItems);
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

export default ListItem;
