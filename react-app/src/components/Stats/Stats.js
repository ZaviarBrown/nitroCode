import React, { useEffect, useState } from "react";
import styles from "./Stats.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getOneStat } from "../../store/stat";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Stats = () => {
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.stat);
  const user = useSelector((state) => state.session.user);
  const username = user.username;
  const [graphData, setGraphData] = useState([]);

  const CustomTooltip = () => {
    return (
      <div>
        <p>Cpm: </p>
      </div>
    );
  };

  const draw = (
    <ResponsiveContainer width="100%" aspect={3}>
      <LineChart
        width={100}
        height={100}
        data={graphData}
        margin={{
          top: 100,
          right: 50,
          left: 50,
          bottom: 100,
        }}
      >
        <Line type="monotone" dataKey={"cpm"} stroke="lightblue" dot={false} />
        <XAxis tick={{ fill: "lightblue", fontSize: 12 }} dataKey={""} />
        <YAxis
          tick={{ fill: "lightblue", fontSize: 12 }}
          domain={["dataMin", "dataMax"]}
          tickCount={5}
        />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );

  useEffect(() => {
    dispatch(getOneStat(user.id))
      .then(() => fetch("/api/race/"))
      .then((res) => res.json())
      .then((res) => setGraphData(res["races"]));
  }, []);

  return (
    <div>
      <div className={styles.hey}>Hey {username}, here's your latest data:</div>
      <div className={styles.words}>
        <div className={styles.stats}>Highest Ever CPM: {stats.highestCpm}</div>
        <div className={styles.stats}>
          Current Average CPM: {stats.averageCpm}
        </div>
        <div className={styles.stats}>
          Lines Of Code Completed: {stats.races}
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.graph}>{draw}</div>
      </div>
    </div>
  );
};

export default Stats;
