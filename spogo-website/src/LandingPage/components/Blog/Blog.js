import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Blog.css';


const Blog = ({ image, title, personImage, name, date, paragraphText }) => {
  const condenseText = (text) => {
    if (text.length <= 151) {
      return text;
    }
    if (text.length > 151) {
      return (
        <>
          <p className="paragraph_text">
            {text.slice(0, 151)}
            <span>...</span>
          </p>
        </>
      );
    }
  };

  
 
  return (
    <div className="blog_container">
      <Link
        to={{
          pathname: `/blog/article/${title}`,
        }}
      >
        <img className="blog_image" src={image} alt="Blog Image" />
      </Link>
      <Link
        className="noImageContainerLink"
        to={{
          pathname: `/blog/article/${title}`,
        }}
      >
        <div className="no_image_container">
          <h1 className="title">{title}</h1>
          <div className="blog_writer_container">
            <img className="blog_writer" src={personImage} alt="Writer Image" />
            <p className="description_text">
              by <span>{name}</span> on {date}
            </p>
            {/* Text by Picture */}
          </div>
          <p className="paragraph_text">{condenseText(paragraphText)}</p>
          <p className="read_more_text">Read more...</p>
        </div>
      </Link>
    </div>
  );
}

export default Blog;
