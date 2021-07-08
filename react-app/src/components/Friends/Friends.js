import React, { useEffect, useState } from "react";
import "./Friends.module.css";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

const Friends = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");

  const findFriend = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/users/${name}`);
		const data = await res.json();
    if (data) {
      setErrors();
      console.log(data);
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
        <div>{errors}</div>
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
      </form>
    </div>
  );
};

export default Friends;
