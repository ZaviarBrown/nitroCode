import React from "react";
import "./Stats.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getOneStat } from "../../store/stat";

const Stats = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const username = user.username;

  // useEffect(() => {
  //   fet;
  //   dispatch(getOneStat());
  // }, [input]);

  return (
    <div>
      <div>Hey {username}</div>
    </div>
  );
};

export default Stats;
