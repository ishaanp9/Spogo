import React, { useState, useEffect } from 'react';
import './LandingPageFAQ.css';
import Header from '../../components/Header/Header';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Footer from '../../components/Footer/Footer';
import WebFont from 'webfontloader';

const LandingPageFAQ = () => {
  const FAQItem = (props) => {
    let question = props.question;
    let answer = props.answer;
    const [FAQOpened, setFAQOpened] = useState(false);

    useEffect(() => {
      WebFont.load({
        google: {
          families: ['Montserrat', 'Open_Sans']
        }
      });
     }, []);

    return (
      <div className="FAQContainer">
        <div className="FAQHeaderContainer">
          <h1
            style={{ color: FAQOpened ? '#3EB489' : 'black' }}
            onClick={() => setFAQOpened(!FAQOpened)}
          >
            {question}
          </h1>
          {!FAQOpened ? (
            <FaPlus
              className="openCloseIcon"
              onClick={() => setFAQOpened(true)}
              color={'black'}
            />
          ) : (
            <FaMinus
              className="openCloseIcon"
              onClick={() => setFAQOpened(false)}
              color={'#3EB489'}
            />
          )}
        </div>
        <div className="FAQAnswer">{FAQOpened ? <h1>{answer}</h1> : null}</div>
      </div>
    );
  };


  

  return (
    <>
      <Header onClick={window.scrollTo(0,0)} />
      <div className="TitleContainer">
        <h1 className>FAQ</h1>
      </div>
      <div className="FAQSectionContainer">
        <div className="FAQSectionHeader">
          <h1>General</h1>
        </div>
        <FAQItem
          question="What is Spogo?"
          answer="Spogo is the premier platform to share your athletic profile. Whether it be to gain exposure to or monetize your name, image and likeness, we’re here to help you along the way."
        />
        <FAQItem
          question="Why did you decide to start Spogo?"
          answer='You can view our mission statement here.'
        />
        <FAQItem
          question="Where are you based?"
          answer="We are based in great city of Seattle, Washington."
        />
        <FAQItem
          question="When can I start using Spogo?"
          answer="If you are interested in using Spogo, please join our waitlist. We are currently onboarding users in small batches. As long as you are on our waitlist, we will notify you about how to proceed."
        />
        <FAQItem
          question="Who can/should use Spogo?"
          answer="Anyone! There are no restrictions for skill level, age, sport, or ability."
        />
        <FAQItem
          question="Do I have to pay to use Spogo?"
          answer="No, Spogo is free to everyone. However, we do have a premium paid plan coming soon."
        />
      </div>
      <div className="FAQSectionContainer">
        <div className="FAQSectionHeader">
          <h1>Product</h1>
        </div>
        <FAQItem
          question="I just signed up for Spogo. Now what?"
          answer="Congratulations, you are one step further in your athletic journey! Now, you create a fully customizable Spogo profile that you can share to anybody with just a few clicks."
        />
        <FAQItem
          question="What should I add to my Spogo profile?"
          answer="There are many different features you can add to your profile. In just a few minutes, you can write a bio, link all your social media accounts, post highlights, list your experiences, show off your accomplishments, and display your measurables, with added features coming soon."
        />
        <FAQItem
          question="How can I customize my Spogo profile?"
          answer="You can change the colors, fonts, and styles, with more personalization coming soon."
        />
        <FAQItem
          question="After finishing my Spogo profile, what do I do with it?"
          answer="You can generate a URL that you can paste in all of your social media’s and send to whoever you want. Anyone who clicks on the link can view your Spogo profile."
        />
        <FAQItem
          question="After I’ve added information to my profile, can I edit or delete it?"
          answer="Of course! You can edit and delete all highlights, experiences, accomplishments, and measurables, as well as edit your personal information."
        />
        <FAQItem
          question="How do other people view my Spogo profile?"
          answer="Through your generated URL, anyone can view your profile!"
        />
      </div>
      <Footer onClick={window.scrollTo(0,0)} />
    </>
  );
};

export default LandingPageFAQ;
