import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Typing.css";
import { getOneCode, getAllCode } from "../../store/code";
import Timer from "../Timer/Timer";
import { createNewRace } from "../../store/race";
import { updateOneStat } from "../../store/stat";

const Typing = () => {
  const dispatch = useDispatch();
  const [renew, setRenew] = useState(false);
  const [input, setInput] = useState([]);
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(0);
  const [timing, setTiming] = useState();
  const [stats, setStats] = useState(false);
  const [lastCpm, setLastCpm] = useState(0);
  const [prompt, setPrompt] = useState();
  const [details, setDetails] = useState();
  const [complete, setComplete] = useState([]);
  // const completed = React.useMemo(() => new Set(), []);
  const promptArr = useSelector((state) => state.code.prompts);
  console.log(promptArr);

  const timer = () => {
    return setTime((time) => time + 1);
  };

  const startTimer = () => {
    setTiming(setInterval(timer, 1000));
  };

  const stopTimer = () => {
    clearInterval(timing);
  };

  const clearCheck = () => {
    for (let i = 0; i < prompt.length; i++) {
      let val = document.getElementById(i);
      val.className = "empty";
    }
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
    dispatch(getAllCode());
  }, []);

  useEffect(() => {
    if (complete?.length === promptArr?.length) {
      setComplete([]);
    }
  }, [complete]);

  useEffect(() => {
    if (promptArr) {
      let newNum = Math.floor(Math.random() * promptArr?.length);
      while (complete.includes(newNum)) {
        newNum = Math.floor(Math.random() * promptArr?.length);
      }
      let newDetails = promptArr[newNum];
      setComplete([...complete, newNum]);
      setDetails(newDetails);
      setPrompt(newDetails.lines?.split(""));
    }
  }, [renew, promptArr]);

  useEffect(() => {
    if (prompt !== undefined) {
      if (input.length === 0) {
        setStart(false);
      }
      if (input.length > 0) {
        setStart(true);
        setStats(false);
      }
      if (input.length <= prompt.length) {
        spellCheck();
      }
    }
    if (input?.length === prompt?.length + 1) {
      let codeblockId = details.id;
      let cpm = Math.floor((details.charCount / time) * 60);
      dispatch(createNewRace(codeblockId, 0, cpm, time));
      dispatch(updateOneStat(cpm));
      let val = document.getElementById("text");
      val.value = "";
      setTime(0);
      stopTimer();
      setStats(true);
      setLastCpm(cpm);
      renew ? setRenew(false) : setRenew(true);
      clearCheck();
      setStart(false);
    }
  }, [input]);

  useEffect(() => {
    if (start) {
      startTimer();
    }
    if (!start) {
      setTime(0);
      stopTimer();
    }
  }, [start]);

  return (
    <div className="container">
      <div>
        <Timer time={time} />
      </div>
      <div className="prompt" id="prompt">
        <div className="span">
          {prompt &&
            prompt.map((char, i) => {
              return (
                <span id={i} className="empty" key={i}>
                  {char}
                </span>
              );
            })}
        </div>
        <div className="textDiv">
          <textarea
            className="text"
            id="text"
            placeholder="_"
            autoFocus
            onChange={(e) => setInput(e.target.value.split(""))}
          ></textarea>
        </div>
      </div>
      {stats ? <div className="stats">CPM: {lastCpm}</div> : null}
    </div>
  );
};

export default Typing;

// instead, lets store all code in store.
// store id's in array, length of array will go where "5" is
// if (newNum === undefined) {
//   num = Math.floor(Math.random() * 5) + 1;
//   newNum = num;
// } else {
//   while (num === newNum) {
//     console.lop("*******", num);
//     num = Math.floor(Math.random() * 5) + 1;
//   }
//   newNum = num;
// }
// dispatch(getOneCode(newNum));
// console.log("92", promptArr);
// num = Math.floor(Math.random() * promptArr?.length);
// while (completed.has(num)) {
//   num = Math.floor(Math.random() * promptArr?.length);
// }
// if (promptArr !== undefined) {
//   details = promptArr[num];
// }
// if (num) {
//   completed.add(num);
// }
