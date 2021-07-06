import React from "react";
import "./Item.css";
import CrownIcon from 'mdi-react/CrownIcon';
import TrophyIcon from 'mdi-react/TrophyIcon';
import RocketLaunchIcon from 'mdi-react/RocketLaunchIcon';

function Item(props) {
  let icon = props.iconName
  let color = props.color
  let title = props.title;
  let time = props.time;
  let idNum = props.idNum

  let ItemIcon = (props) => {
    let iconType = props.iconType
    if (icon === 'trophy') {
      return (
        <TrophyIcon color={color}/>
      )
    } else if (iconType === 'crown') {
      return (
        <CrownIcon color={color}/>
      )
    } else {
      return (
        <RocketLaunchIcon color={color}/>
      )
    }
  }

  return (
    <div>
      <div className="Container">
        <ItemIcon iconType={icon}/>
        <h1 className="Text">{title}</h1>
        <h2 className="Text">{time}</h2>
      </div>
    </div>
  );
}

export default Item;
