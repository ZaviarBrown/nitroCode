import React, { useEffect, useState } from "react";
import styles from "./PendingUserData.module.css";
import { useDispatch, useSelector } from "react-redux";
import { acceptOneRequest } from "../../store/friend";

const PendingUserData = ({ id, add }) => {
  const dispatch = useDispatch();
  const [cpm, setCpm] = useState(0);
  const [name, setName] = useState("");
  const [practices, setPractices] = useState(0);
  const [accept, setAccept] = useState(add);
  const [status, setStatus] = useState("");
  const user = useSelector((state) => state.session.user);

  const findPending = async (id) => {
    let username = await fetch(`/api/users/${id}`);
    let stats = await fetch(`/api/stat/${id}`);
    username = await username.json();
    stats = await stats.json();
    setCpm(stats.averageCpm);
    setName(username.username);
    setPractices(stats.practices);
  };

  const acceptRequest = async (e) => {
    e.preventDefault();
    if (id !== 0) {
      dispatch(acceptOneRequest(id));
    }
    setStatus("Friends");
  };

  useEffect(() => {
    findPending(id);
  }, []);

  return (
    <div className={styles.userData}>
      {accept ? (
        <div className={styles.newPending}>
          <div className={styles.name}>{name}</div>
          <div>Average CPM: {cpm}</div>
          <div>Practices Completed: {practices}</div>
          {status ? (
            <div className={styles.sent}>{status}</div>
          ) : (
            <button className={styles.add} onClick={(e) => acceptRequest(e)}>
              <div>Accept Request</div>
            </button>
          )}
        </div>
      ) : (
        <div className={styles.outgoingPending}>
          <div className={styles.name}>{name}</div>
          <div>Average CPM: {cpm}</div>
          <div>Practices Completed: {practices}</div>
          <div className={styles.sent}>Pending</div>
        </div>
      )}
    </div>
  );
};

export default PendingUserData;
