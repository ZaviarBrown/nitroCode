import React, { useEffect, useState } from "react";
import styles from "./Friends.module.css";
import { useDispatch, useSelector } from "react-redux";
import UserData from "../UserData/UserData";
import { getOneStat } from "../../store/stat";

const Friends = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [name, setName] = useState("");
  const [races, setRaces] = useState(0);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState("");
  const [dataName, setDataName] = useState("");
  const [pending, setPending] = useState(false);
  const [userData, setUserData] = useState(false);
  const friend = useSelector((state) => state.friend);
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
      setRaces(stats.races);
      setUserData(true);
    } else {
      setErrors("This username does not exist");
    }
  };

  useEffect(() => {
    if (friend.received || friend.sent) {
      setPending(true);
    }
  }, []);

  return (
    <div>
      <form onSubmit={(e) => findFriend(e)}>
        <div>
          <label htmlFor="friend">Search for a friend</label>
          <input
            name="friend"
            type="text"
            placeholder="Enter Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Search</button>
        </div>
        <div>{errors}</div>
      </form>
      {userData ? (
        <UserData
          name={dataName}
          cpm={cpm}
          races={races}
          status={status}
          id={id}
        />
      ) : null}
      {pending ? <div>Test</div> : null}
    </div>
  );
};

export default Friends;
