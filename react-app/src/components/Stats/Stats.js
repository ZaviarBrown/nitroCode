import React from "react";
import "./Stats.module.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneStat } from "../../store/stat";

const Stats = () => {
  const { username } = useParams();
  // const dispatch = useDispatch();

  // const getUserId = async () => {
  //   const data = await fetch(`/api/user/${username}`);
  // };

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
