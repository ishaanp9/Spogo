import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LandingPage from '../LandingPage/screens/LandingPage/LandingPage';
import LandingPageAbout from '../LandingPage/screens/LandingPageAbout/LandingPageAbout';
import LandingPageBlog from '../LandingPage/screens/LandingPageBlog/LandingPageBlog';
import LandingPageFAQ from '../LandingPage/screens/LandingPageFAQ/LandingPageFAQ';
import BlogArticleScreen from '../LandingPage/screens/BlogArticleScreen/BlogArticleScreen';
import JoinWaitlistScreen from '../LandingPage/screens/JoinWaitlistScreen/JoinWaitlistScreen';


const LandingNavigator = (props) => {
  let path = props.url;
  return (
    <Router>
      <Route exact path="/">
        <LandingPage />
        {/* <Redirect to="/home" /> */}
      </Route>
      {/* <Route path={'/home'}>
        <LandingPage />
      </Route> */}
      <Route path={'/about'}>
        <LandingPageAbout />
      </Route>
      <Route path={"/FAQ"}>
        <LandingPageFAQ />
       </Route>
      {/* <Route exact path={'/blog'}>
        <LandingPageBlog />
      </Route> */}
      <Route path={'/blog/article'}>
        <BlogArticleScreen/>
      </Route>
      <Route path={"/waitlist"}>
        <JoinWaitlistScreen />
      </Route>
    </Router>
  );
};

export default LandingNavigator;
