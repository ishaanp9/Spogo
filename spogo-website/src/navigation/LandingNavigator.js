import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LandingPage from '../screens/LandingPage/LandingPage';
import LandingPageAbout from '../screens/LandingPageAbout/LandingPageAbout';
import LandingPageFAQ from '../screens/LandingPageFAQ/LandingPageFAQ';
import ProfileScreen from '../screens/ProfileScreen/Profile';
import LandingPageBlog from '../screens/LandingPageBlog/LandingPageBlog'

const LandingNavigator = (props) => {
  return (
    <Router>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route path={'/home'}>
        <LandingPage />
      </Route>
      <Route path={'/about'}>
        <LandingPageAbout />
      </Route>
      <Route path={"/FAQ"}>
        <LandingPageFAQ />
       </Route>
      <Route path={'/blog'}>
        <LandingPageBlog />
      </Route>
    </Router>
  );
};

export default LandingNavigator;
