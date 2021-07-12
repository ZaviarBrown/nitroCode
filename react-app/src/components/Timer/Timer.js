import React from "react";
import styles from "./Timer.module.css";

const Timer = ({ time }) => {
  return (
    <div>
      <div className={styles.timer}>{time}</div>
    </div>
  );
};

export default Timer;
