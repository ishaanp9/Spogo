import React from 'react';
import Blog from '../../components/Blog/Blog';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import ishaan from './ishaan_spogo.jpg';
import './LandingPageBlog.css';

function LandingPageBlog() {
  return (
    <>
      <Header />
      <div className="BlogItemContainer">
        <h1 className='page_header'>Spogo Blog</h1>
        <div className="row">
          <Blog
            image={
              'https://llandscapes-10674.kxcdn.com/wp-content/uploads/2019/07/lighting.jpg'
            }
            title={'A Wonderful Blog Post About Earth'}
            personImage={ishaan}
            name={'Ishaan Puri'}
            date={'July 15'}
            paragraphText={
              'Science cuts two ways, of course; its products can be used for both good and evil. But there no turning back from science. The early warnings about technological dangers also come from science. Houston, Tranquillity Base here. The Eagle has landed...'
            }
          />
          <Blog      
            image={
              'https://llandscapes-10674.kxcdn.com/wp-content/uploads/2019/07/lighting.jpg'
            }
            title={'A Wonderful Blog Post About Earth'}
            personImage={ishaan}
            name={'Ishaan Puri'}
            date={'July 15'}
            paragraphText={
              'Science cuts two ways, of course; its products can be used for both good and evil. But there no turning back from science. The early warnings about technological dangers also come from science. Houston, Tranquillity Base here. The Eagle has landed...'
            }
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LandingPageBlog;
