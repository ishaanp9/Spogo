import React from "react";
import Item from "../ExpTrophyMesItem/Item";
import "./Profile.css";

function Profile() {
  const words = ["Hello", "Goodbye", "Hello", "Goodbye"];
  return (
    <div className="ProfileScreen">
      <div className='ProfileList'>
        <h1 className='ListHeader'>Trophy</h1>
        <ul className="List">
          {words.map((word) => (
            <Item input={word} />
          ))}
        </ul>
      </div>
      <div className='ProfileList'>
        <h1 className='ListHeader'>Experience</h1>
        <ul className="List">
          {words.map((word) => (
            <Item input={word} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
