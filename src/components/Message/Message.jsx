import React, { useRef, useEffect, useState } from "react";
import "./Message.css";
import { useTypewriter } from "react-simple-typewriter";

export default function Message(props) {
  const currentTeam = props.currentTeam;
  const [message, setMessage] = useState(props.message);
  let [text] = props.message;
  console.log("message changed to: " + message);

  useEffect(() => {
    setMessage(props.message);
  }, [props.message]);

  const write = () => {
    let [text] = useTypewriter({
      words: [message],
      onLoopDone: () => {
        // console.log("hellorr")
      },
      loop: 0,
    });
    return [text];
  };

  console.log([text]);

  return (
    <div>
      <p className="">Current Team: {currentTeam}</p>
      <div className="typewriter">
        <p className="message">{message}</p>
        {/* <span>{write()}</span> */}
      </div>
    </div>
  );
}
