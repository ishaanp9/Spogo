import React, { useState } from 'react';
import Blog from '../../components/Blog/Blog';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './LandingPageBlog.css';
import { BlogData } from '../../../BlogData';
import firebase from '../../../firebase';
import './LandingPageBlog.css';
import SubscribeBlog from '../../components/SubscribeBlog/SubscribeBlog';

const LandingPageBlog = () => {
  console.log(BlogData);

  return (
    <>
      <Header />
      <div className="BlogItemContainer">
        <div className="row">
          <Blog
            image={BlogData[0].bannerImage}
            title={BlogData[0].title}
            personImage={BlogData[0].personImage}
            name={BlogData[0].name}
            date={BlogData[0].date}
            paragraphText={BlogData[0].paragraphText}
          />
          <Blog
            image={BlogData[1].bannerImage}
            title={BlogData[1].title}
            personImage={BlogData[1].personImage}
            name={BlogData[1].name}
            date={BlogData[1].date}
            paragraphText={BlogData[1].paragraphText}
          />
        </div>
      </div>
      <SubscribeBlog/>
      <Footer />
    </>
  );
};

export default LandingPageBlog;
