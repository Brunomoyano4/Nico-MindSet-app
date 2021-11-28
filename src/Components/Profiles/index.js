import styles from './profiles.module.css';
import { useState, useEffect } from 'react';
import ListItem from './ListItem';
import DeleteBtn from './DeleteBtn';

function Profiles() {
  const tableHeaderItems = ['Branch', 'Name', 'Description', ''];
  const [profiles, setProfiles] = useState([]);

  const deleteProfile = () => {
    console.log('hola');
    // e.stopPropagation();
    // eslint-disable-next-line no-underscore-dangle
    // profileId = profile._id;
    // eslint-disable-next-line no-undef
    // updateModalInfo(
    //   'You are about to delete a profile',
    //   `Branch: ${profile.branch}\n
    // Name: ${profile.name}`
    // );
  };
  useEffect(async () => {
    const unparsedProfiles = await fetch(`${process.env.REACT_APP_API}/profiles`);
    const fetchedProfiles = await unparsedProfiles.json();
    setProfiles(fetchedProfiles);
  }, []);

  return (
    <section className={styles.container}>
      <h2>Profiles</h2>
      <table className={styles.list}>
        <ListItem headerItems={tableHeaderItems}></ListItem>
        <tbody className={styles.tableBody}>
          {profiles.map(({ _id, profileName, branch, description }) => {
            const deleteBtn = <DeleteBtn onClick={deleteProfile}></DeleteBtn>;
            const tableListItems = [branch, profileName, description, deleteBtn];
            return <ListItem key={_id} listItems={tableListItems} id={_id}></ListItem>;
          })}
        </tbody>
      </table>
    </section>
  );
}

export default Profiles;
