import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserData from "../UserData/UserData";
import styles from "./SearchFriends.module.css";

const SearchFriends = () => {
  const [id, setId] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [name, setName] = useState("");
  const [practices, setPractices] = useState(0);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState("");
  const [dataName, setDataName] = useState("");
  const [userData, setUserData] = useState(false);
  const user = useSelector((state) => state.session.user);

  const findFriend = async (e) => {
    e.preventDefault();
    setUserData(false);
    const res = await fetch(`/api/users/${name}`);
    const data = await res.json();
    if (data.id === user.id) {
      setErrors("Bruh that's literally you");
    } else if (data !== "false") {
      setErrors([]);
      let stats = await fetch(`/api/stat/${data.id}`);
      stats = await stats.json();
      let friend = await fetch(`/api/friend/${data.id}`);
      friend = await friend.json();
      setStatus("");
      if (friend !== "false") {
        setStatus(friend.status);
      }
      setId(data.id);
      setDataName(name);
      setCpm(stats.averageCpm);
      setPractices(stats.practices);
      setUserData(true);
    } else {
      setErrors("This username does not exist");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => findFriend(e)}>
        <div>
          <label htmlFor="friend">Search for a friend: </label>
          <input
            name="friend"
            type="text"
            placeholder="Enter Username"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className={styles.search}>
            ☌
          </button>
        </div>
      </form>
      <div className={styles.userDiv}>
        <div className={styles.errors}>{errors}</div>
        {userData ? (
          <UserData
            className={styles.userData}
            name={dataName}
            cpm={cpm}
            practices={practices}
            status={status}
            id={id}
            bool={false}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SearchFriends;
