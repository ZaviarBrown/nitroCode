import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Typing.css";
import { getOneCode } from "../../store/code";
import Timer from "../Timer/Timer";

const Typing = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState([]);
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(0);
  const [timing, setTiming] = useState();
  const details = useSelector((state) => state.code);
  const prompt = details.lines?.split("");

  // let prompt =
  // "const aFunc = (aParam, aVar) => { for (let i = 0; i < aParam.length; i++) { aVar += aParam[i] } return aVar; }";
  // prompt = prompt.split("");

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
  }, [input]);

  useEffect(() => {
    if (start === true) {
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
      </div>
      <textarea
        autoFocus
        onChange={(e) => setInput(e.target.value.split(""))}
      ></textarea>
    </div>
  );
};

export default Typing;
