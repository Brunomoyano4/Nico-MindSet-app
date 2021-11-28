import styles from './profiles.module.css';
import { useState, useEffect } from 'react';
import ListItem from './ListItem';

function Profiles() {
  const tableHeaderItems = ['Branch', 'Name', 'Description', ''];
  const [profiles, setProfiles] = useState([]);

  useEffect(async () => {
    const unparsedProfiles = await fetch(`${process.env.REACT_APP_API}/profiles`);
    const fetchedProfiles = await unparsedProfiles.json();
    setProfiles(fetchedProfiles);
  }, []);

  return (
    <section className={styles.container}>
      <h2>Profiles</h2>
      <table className={styles.profileTable}>
        <ListItem headerItems={tableHeaderItems}></ListItem>
        <tbody className={styles.tableBody}>
          {profiles.map(({ _id, profileName, branch, description }) => {
            const tableListItems = [branch, profileName, description];
            return <ListItem key={_id} listItems={tableListItems} id={_id}></ListItem>;
          })}
        </tbody>
      </table>
    </section>
  );
}

export default Profiles;
