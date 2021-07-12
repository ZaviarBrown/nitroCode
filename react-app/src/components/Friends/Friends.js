import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFriends, getAllRequests } from "../../store/friend";
import OneFriend from "../OneFriend/OneFriend";
import SearchFriends from "../SearchFriends/SearchFriends";
import PendingUserData from "../PendingUserData/PendingUserData";
import styles from "./Friends.module.css";
const Friends = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState("Search");
  const [friends, setFriends] = useState(false);
  const friend = useSelector((state) => state.friend);

  useEffect(() => {
    dispatch(getAllRequests());
    dispatch(getAllFriends());
    if (friend.friends?.length) {
      setFriends(true);
    }
  }, [page]);

  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>
        <div className={styles.search} onClick={() => setPage("Search")}>
          Search
        </div>
        <div className={styles.friends} onClick={() => setPage("Friends")}>
          Friends
        </div>
        <div className={styles.pending} onClick={() => setPage("Pending")}>
          Pending
        </div>
      </div>
      <div className={styles.data}>
        <div className={styles.upperData}></div>
        <div className={styles.lowerData}>
          <div>{page === "Search" ? <SearchFriends /> : null}</div>
          <div>
            {page === "Friends" ? (
              friends ? (
                friend.friends?.map((id) => <OneFriend key={id} id={id} />)
              ) : (
                <h1 className={styles.noFriends}>You have no friends :/ </h1>
              )
            ) : null}
          </div>
          {page === "Pending" && friend.received?.length ? (
            <h1 className={styles.incoming}>Incoming</h1>
          ) : null}
          {page === "Pending"
            ? friend.received?.map((id) => (
                <PendingUserData key={id} id={id} add={true} />
              ))
            : null}
          {page === "Pending" && friend.sent?.length ? (
            <h1 className={styles.outgoing}>Outgoing</h1>
          ) : null}
          {page === "Pending"
            ? friend.sent?.map((id) => (
                <PendingUserData key={id} id={id} add={false} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Friends;
