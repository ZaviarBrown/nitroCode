import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Typing.css";
import { getAllCode } from "../../store/code";

const Typing = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState([]);
  const prompts = useSelector((state) => state.code);
  console.log(prompts);
  const num = Math.floor(Math.random() * 2) + 1;
  let prompt = prompts[`${num}`]?.split("");

  // let prompt =
  // "const aFunc = (aParam, aVar) => { for (let i = 0; i < aParam.length; i++) { aVar += aParam[i] } return aVar; }";
  // prompt = prompt.split("");

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
    if (prompt !== undefined)
      if (input.length <= prompt.length) {
        spellCheck();
      }
  }, [input]);

  return (
    <div>
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
