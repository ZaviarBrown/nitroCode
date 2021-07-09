import React from "react";
import styles from "./Stats.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getOneStat } from "../../store/stat";

const Stats = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const username = user.username;
  const charts = "npm install --save react-chartjs-2 chart.js";

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
