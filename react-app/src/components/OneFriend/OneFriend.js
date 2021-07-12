import React, { useEffect, useState } from "react";
import styles from "./OneFriend.module.css";
import { useDispatch } from "react-redux";
import { getAllFriends } from "../../store/friend";

const OneFriend = ({ id }) => {
  const dispatch = useDispatch();
  const [cpm, setCpm] = useState(0);
  const [name, setName] = useState("");
  const [races, setRaces] = useState(0);

  const findFriend = async (id) => {
    let username = await fetch(`/api/users/${id}`);
    let stats = await fetch(`/api/stat/${id}`);
    username = await username.json();
    stats = await stats.json();
    setCpm(stats.averageCpm);
    setName(username.username);
    setRaces(stats.races);
  };

  const deleteFriend = async (e) => {
    e.preventDefault();
    let body = JSON.stringify(id);
    let data = await fetch("/api/friend/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    data = await data.json();
    dispatch(getAllFriends());
  };

  useEffect(() => {
    findFriend(id);
  }, []);

  return (
    <div className={styles.userData}>
      <div className={styles.name}>{name}</div>
      <div>Average CPM: {cpm}</div>
      <div>Races Completed: {races}</div>
      <div className={styles.status}>Friends</div>
      <button className={styles.delete} onClick={(e) => deleteFriend(e)}>
        <div>Remove Friend</div>
      </button>
    </div>
  );
};

export default OneFriend;
