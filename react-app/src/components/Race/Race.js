import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Typing.css";
import { getAllCode } from "../../store/code";
import Timer from "../Timer/Timer";
import { createNewPractice } from "../../store/practice";
import { updateOneStat } from "../../store/stat";

// TO DO
// Change to DevDash
// Use keydown to track user input
// Keydown matching prompt character grants green, moves on to next character
// Keydown not matching grants red, stays in place on current character
// Use progress bar to compare vs opponent

const printKey = (event) => {
  console.log(event.key);
};

useEffect(() => {
  window.addEventListener("keydown", printKey);
  return () => {
    window.removeEventListener("keydown", printKey);
  };
}, []);

// const Typing = () => {
//   const dispatch = useDispatch();
//   const [renew, setRenew] = useState(false);
//   const [input, setInput] = useState([]);
//   const [start, setStart] = useState(false);
//   const [time, setTime] = useState(0);
//   const [timing, setTiming] = useState();
//   const [stats, setStats] = useState(false);
//   const [lastCpm, setLastCpm] = useState(0);
//   const [prompt, setPrompt] = useState();
//   const [details, setDetails] = useState();
//   const [complete, setComplete] = useState([]);
//   const promptArr = useSelector((state) => state.code.prompts);
//   console.log(promptArr);

//   const timer = () => {
//     return setTime((time) => time + 1);
//   };

//   const startTimer = () => {
//     setTiming(setInterval(timer, 1000));
//   };

//   const stopTimer = () => {
//     clearInterval(timing);
//   };

//   const clearCheck = () => {
//     for (let i = 0; i < prompt.length; i++) {
//       let val = document.getElementById(i);
//       val.className = "empty";
//     }
//   };

//   const spellCheck = () => {
//     for (let i = 0; i < input.length; i++) {
//       let val = document.getElementById(i);
//       if (input[i] === prompt[i]) {
//         val.className = "correct";
//       }
//       if (input[i] !== prompt[i]) {
//         val.className = "incorrect";
//       }
//     }
//     for (let i = 0; i < prompt.length; i++) {
//       let val = document.getElementById(i);
//       if (i > input.length - 1) {
//         val.className = "empty";
//       }
//     }
//   };

//   useEffect(() => {
//     dispatch(getAllCode());
//   }, []);

//   useEffect(() => {
//     if (complete?.length === promptArr?.length) {
//       setComplete([]);
//     }
//   }, [complete]);

//   useEffect(() => {
//     if (promptArr) {
//       let newNum = Math.floor(Math.random() * promptArr?.length);
//       while (complete.includes(newNum)) {
//         newNum = Math.floor(Math.random() * promptArr?.length);
//       }
//       let newDetails = promptArr[newNum];
//       setComplete([...complete, newNum]);
//       setDetails(newDetails);
//       setPrompt(newDetails.lines?.split(""));
//     }
//   }, [renew, promptArr]);

//   useEffect(() => {
//     if (prompt !== undefined) {
//       if (input.length === 0) {
//         setStart(false);
//       }
//       if (input.length > 0) {
//         setStart(true);
//         setStats(false);
//       }
//       if (input.length <= prompt.length) {
//         spellCheck();
//       }
//     }
//     if (input?.length === prompt?.length + 1) {
//       let codeblockId = details.id;
//       let cpm = Math.floor((details.charCount / time) * 60);
//       dispatch(createNewPractice(codeblockId, 0, cpm, time));
//       dispatch(updateOneStat(cpm));
//       let val = document.getElementById("text");
//       val.value = "";
//       setTime(0);
//       stopTimer();
//       setStats(true);
//       setLastCpm(cpm);
//       renew ? setRenew(false) : setRenew(true);
//       clearCheck();
//       setStart(false);
//     }
//   }, [input]);

//   useEffect(() => {
//     if (start) {
//       startTimer();
//     }
//     if (!start) {
//       setTime(0);
//       stopTimer();
//     }
//   }, [start]);

//   return (
//     <div className="container">
//       <div>
//         <Timer time={time} />
//       </div>
//       <div className="prompt" id="prompt">
//         <div className="span">
//           {prompt &&
//             prompt.map((char, i) => {
//               return (
//                 <span id={i} className="empty" key={i}>
//                   {char}
//                 </span>
//               );
//             })}
//         </div>
//         <div className="textDiv">
//           <textarea
//             className="text"
//             id="text"
//             placeholder="_"
//             autoFocus
//             onChange={(e) => setInput(e.target.value.split(""))}
//           ></textarea>
//         </div>
//       </div>
//       {stats ? <div className="stats">CPM: {lastCpm}</div> : null}
//     </div>
//   );
// };

// export default Typing;
