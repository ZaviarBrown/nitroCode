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
    if (friend.friends) {
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
        {page === "Search" ? <SearchFriends /> : null}
        {page === "Friends" ? (
          friends ? (
            friend.friends?.map((id) => <OneFriend key={id} id={id} />)
          ) : (
            <div>You have no friends :/ </div>
          )
        ) : null}
        {page === "Pending"
          ? friend.received?.map((id) => (
              <PendingUserData key={id} id={id} add={true} />
            ))
          : null}
        {page === "Pending"
          ? friend.sent?.map((id) => (
              <PendingUserData key={id} id={id} add={false} />
            ))
          : null}
      </div>
    </div>
  );
};

export default Friends;
