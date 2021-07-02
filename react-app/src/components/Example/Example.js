import React, { useState, useEffect } from "react";
import "./Example.css";

const Example = () => {
  const [input, setInput] = useState([]);
  let prompt =
    "const aFunc = (aParam, aVar) => { for (let i = 0; i < aParam.length; i++) { aVar += aParam[i] } return aVar; }";
  prompt = prompt.split("");

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
    console.log(input);
  };

  useEffect(() => {
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

export default Example;
