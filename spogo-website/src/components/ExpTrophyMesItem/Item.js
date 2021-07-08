import React, {useEffect, useState} from "react";
import "./Item.css";
import CrownIcon from 'mdi-react/CrownIcon';
import TrophyIcon from 'mdi-react/TrophyIcon';
import RocketLaunchIcon from 'mdi-react/RocketLaunchIcon';
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DescriptionScreen from "../../screens/DescriptionScreen/DescriptionScreen";
import {useHistory} from 'react-router-dom'

function Item(props) {
  let icon = props.iconName
  let color = props.color
  let title = props.title;
  let time = props.time;
  let idNum = props.idNum;
  let UID = props.userUID;

  const history = useHistory()

  useEffect(() => {
    findSize()
  }, [])

  let ItemIcon = (props) => {
    let iconType = props.iconType
    if (icon === 'trophy') {
      return (
        <TrophyIcon color={color} size={iconSize}/>
      )
    } else if (iconType === 'crown') {
      return (
        <CrownIcon color={color} size={iconSize}/>
      )
    } else {
      return (
        <RocketLaunchIcon color={color} size={iconSize}/>
      )
    }
  }

  const [iconSize, setIconSize] = useState(25);

  const findSize = () => {
    if (window.innerWidth < 600) {
      setIconSize(25)
    } else if (window.innerWidth < 1200) {
      setIconSize(40)
    } else {
      setIconSize(55)
    }
  }

  return (
      <Link to={`/descriptions/${UID}`} className="Link">
      {/* // <div onClick={() => history.push(`/descriptions/${UID}`)}> */}
        <div className="Container" style={{height: window.innerHeight / 12}}>
          <ItemIcon iconType={icon}/>
          <div className="TextContainer">
            <h1>{title}</h1>
            <h2>{time}</h2>
          </div>
        </div>
        <hr size='2' color="lightgrey" className="Divider"/>
      {/* </div> */}
      </Link>
  );
}

export default Item;
