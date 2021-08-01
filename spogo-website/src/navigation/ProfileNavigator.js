import React from "react";
import { BrowserRouter as Router, Switch, Route,} from "react-router-dom";

import ProfileScreen from "../UserProfile/screens/ProfileScreen/Profile";
import DescriptionScreen from "../UserProfile/screens/DescriptionScreen/DescriptionScreen";

const ProfileNavigator = (props) => {
  let path = props.url;
  return (
    <Router>
        <Route path={"/descriptions"}>
          <DescriptionScreen url={path}/>
        </Route>
        
        <Route path={"/users"}>
          <ProfileScreen url={path} />
        </Route>
    </Router>
  );
};

export default ProfileNavigator;
