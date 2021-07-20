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
import BlogArticleScreen from '../screens/BlogArticleScreen/BlogArticleScreen';

const LandingNavigator = (props) => {
  let path = props.url;
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
      <Route exact path={'/blog'}>
        <LandingPageBlog />
      </Route>
      <Route path={'/blog/article'}>
        <BlogArticleScreen/>
      </Route>
    </Router>
  );
};

export default LandingNavigator;
