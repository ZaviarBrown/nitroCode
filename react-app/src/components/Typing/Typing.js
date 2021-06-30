import React, { useState, useEffect } from "react";
import "./Typing.css";

const Typing = () => {
  const [input, setInput] = useState([]);
  console.log(input);
  let prompt =
    "const aFunc = (aParam, aVar) => { for (let i = 0; i < aParam.length; i++) { aVar += aParam[i] } return aVar; }";
  prompt = prompt.split("");

  useEffect(() => {
    for (let i = 0; i < input.length; i++) {
      let val = document.getElementById(i);
      if (input[i] === prompt[i]) {
        val.className = "correct";
        console.log(val);
      }
      if (input[i] !== prompt[i]) {
        val.className = "incorrect";
        console.log(val);
      }
    }
  }, [input]);

  return (
    <div>
      <div>
        <div id="prompt">
          {prompt.map((char, i) => {
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
    </div>
  );
};

export default Typing;
