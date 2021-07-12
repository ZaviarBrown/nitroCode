import React, { useState } from "react";
import styles from "./UserData.module.css";
import { useDispatch, useSelector } from "react-redux";
import { sendNewRequest } from "../../store/friend";

const UserData = ({ name, cpm, races, status, id }) => {
  const dispatch = useDispatch();
  const [currStatus, setCurrStatus] = useState(status);
  const user = useSelector((state) => state.session.user);

  const sendRequest = async (e) => {
    e.preventDefault();
    if (id !== 0) {
      dispatch(sendNewRequest(id));
    }
    setCurrStatus("Pending");
  };

  return (
    <div className={styles.userData}>
      <div>{name}</div>
      <div>Average CPM: {cpm}</div>
      <div>Races Completed: {races}</div>
      {currStatus ? (
        <div className={styles.sent}>{currStatus}</div>
      ) : (
        <button className={styles.add} onClick={(e) => sendRequest(e)}>
          <div>Add Friend</div>
        </button>
      )}
    </div>
  );
};

export default UserData;
