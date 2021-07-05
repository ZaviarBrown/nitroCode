import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Timer.module.css";

const Timer = ({ time }) => {
  return (
    <div>
      <div className={styles.timer}>{time}</div>
    </div>
  );
};

export default Timer;
