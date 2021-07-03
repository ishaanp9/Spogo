import React from "react";
import "./Item.css";

function Item(props) {
  const input = props.input;
  return (
    <div>
      <div className="Container">
        <h1 className="Text">{input}</h1>
      </div>
    </div>
  );
}

export default Item;
