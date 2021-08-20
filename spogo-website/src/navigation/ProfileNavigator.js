import React from "react";
import { BrowserRouter as Router, Route,} from "react-router-dom";

import ProfileScreen from "../ViewableProfile/screens/ProfileScreen/Profile";

const ProfileNavigator = (props) => {
  let path = props.url;
  return (
    <Router>
        <Route path={"/me"}>
          <ProfileScreen url={path} />
        </Route>
    </Router>
  );
};

export default ProfileNavigator;
