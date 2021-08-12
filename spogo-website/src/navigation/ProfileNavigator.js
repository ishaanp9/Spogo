import React from "react";
import { BrowserRouter as Router, Route,} from "react-router-dom";

import ProfileScreen from "../ViewableProfile/screens/ProfileScreen/Profile";
import DescriptionScreen from "../ViewableProfile/screens/DescriptionScreen/DescriptionScreen";

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
