import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Typing.css";
import { getOneCode } from "../../store/code";
import Timer from "../Timer/Timer";
import { createNewRace } from "../../store/race";
import { Redirect } from "react-router-dom";
import { updateOneStat } from "../../store/stat";

const Typing = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState([]);
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(0);
  const [timing, setTiming] = useState();
  const user = useSelector((state) => state.session.user);
  const details = useSelector((state) => state.code);
  const prompt = details.lines?.split("");

  const timer = () => {
    let startTime = Date.now();
    setInterval(() => {
      setTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
  };

  const spellCheck = () => {
    for (let i = 0; i < input.length; i++) {
      let val = document.getElementById(i);
      if (input[i] === prompt[i]) {
        val.className = "correct";
      }
      if (input[i] !== prompt[i]) {
        val.className = "incorrect";
      }
    }
    for (let i = 0; i < prompt.length; i++) {
      let val = document.getElementById(i);
      if (i > input.length - 1) {
        val.className = "empty";
      }
    }
  };

  useEffect(() => {
    const num = Math.floor(Math.random() * 2) + 1;
    dispatch(getOneCode(num));
  }, []);

  useEffect(() => {
    if (prompt !== undefined) {
      if (input.length === 0) {
        setStart(false);
      }
      if (input.length > 0) {
        setStart(true);
      }
      if (input.length <= prompt.length) {
        spellCheck();
      }
    }
    if (input?.length === prompt?.length + 1) {
      let codeblockId = details.id;
      let cpm = (details.charCount / time) * 60;
      dispatch(createNewRace(codeblockId, 0, cpm, time));
      dispatch(updateOneStat(cpm));
    }
  }, [input]);

  useEffect(() => {
    if (start) {
      setTiming(timer());
    }
    if (start === false) {
      clearInterval(timing);
      setTime(0);
    }
  }, [start]);

  return (
    <div>
      <div>
        <Timer time={time} />
      </div>
      <div id="prompt">
        {prompt?.map((char, i) => {
          return (
            <span id={i} className="empty" key={i}>
              {char}
            </span>
          );
        })}
        <div className="textDiv">
          <textarea
            className="text"
            autoFocus
            onChange={(e) => setInput(e.target.value.split(""))}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Typing;
