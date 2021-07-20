import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './BlogArticleScreen.css';

import { BlogData } from '../../BlogData';
import ErrorScreen from '../../components/ErrorScreen/ErrorScreen';

const BlogArticleScreen = (props) => {
  const [id, setId] = useState(0);
  const [show404Error, setShow404Error] = useState(false);
  let path = window.location.href;
  let blogTitle = path.substring(path.lastIndexOf('/') + 1);
  blogTitle = blogTitle.replaceAll('%', '');
  blogTitle = blogTitle.replaceAll('20', ' ');
  console.log(blogTitle);

  useEffect(() => {
    for (let i = 0; i < BlogData.length; i++) {
      if (blogTitle === BlogData[i].title) {
        setId(i);
        setShow404Error(true);
      }
    }
  }, []);

  return (
    <>
      <Header />
      {show404Error ? (
        <div className="blogArticleContainer">
          <img
            className="bannerImage"
            src={BlogData[id].bannerImage}
            alt={'blog image'}
          />
          <div className="articleBodyContainer">
            <h1 className="articleTitle">{BlogData[id].title}</h1>
            <div className="blogArticleWriterContainer">
              <img
                className="blogArticleWriter"
                src={BlogData[id].personImage}
                alt="Writer Image"
              />
              <p className="descriptionText">
                by <span>{BlogData[id].name}</span> on {BlogData[id].date}
              </p>
            </div>
            <p className="paragraphText">{BlogData[id].paragraphText}</p>
          </div>
        </div>
      ): <ErrorScreen/>}
      <Footer />
    </>
  );
};

export default BlogArticleScreen;
