import React, { useEffect, useState } from "react";
import styles from "./Friends.module.css";
import { useDispatch, useSelector } from "react-redux";
import UserData from "../UserData/UserData";
import { getOneStat } from "../../store/stat";

const Friends = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [dataName, setDataName] = useState("");
  const [cpm, setCpm] = useState(0);
  const [races, setRaces] = useState(0);
  const [status, setStatus] = useState("");
  const [userData, setUserData] = useState(false);

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
      console.log(stats);
      let friend = await fetch(`/api/friend/${data.id}`);
      friend = await friend.json();
      setStatus("");
      if (friend !== "false") {
        setStatus(friend.status);
      }
      setDataName(name);
      setCpm(stats.averageCpm);
      setRaces(stats.races);
      setUserData(true);
      // query friends table
      // if user.id === friendOne/Two && data.id === friendTwo/One
      //
      // else
      // POST to friends table user.id, data.id, pending
    } else {
      setErrors("This username does not exist");
    }
  };

  // Input username
  // search for user in db
  // if found, say "invite successful"
  // if not, say "user not found"

  // DB - write to db

  // useEffect(() => {
  //   fet;
  //   dispatch(getOneStat());
  // }, [input]);

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
        <UserData name={dataName} cpm={cpm} races={races} status={status} />
      ) : null}
    </div>
  );
};

export default Friends;
