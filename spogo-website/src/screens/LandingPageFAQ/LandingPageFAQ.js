import React, {useState} from "react";
import "./LandingPageFAQ.css";
import Header from "../../components/Header/Header";
import { FaPlus, FaMinus } from 'react-icons/fa';
import Footer from "../../components/Footer/Footer";


const LandingPageFAQ = () => {
  const FAQItem = (props) => {
    let question = props.question;
    let answer = props.answer;
    const [FAQOpened, setFAQOpened] = useState(false)

    return (
      <div className="FAQContainer">
        <div className="FAQHeaderContainer">
            <h1 style={{color: FAQOpened ? '#3EB489' : 'black'}}>{question}</h1>
            {!FAQOpened ? 
                <FaPlus onClick={() => setFAQOpened(true)} color={'black'}/> 
                : 
                <FaMinus onClick={() => setFAQOpened(false)} color={'#3EB489'}/>
            }
        </div>
        <div className="FAQAnswer">
            {FAQOpened ? 
                <h1>{answer}</h1>
                :
                null
            }
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="TitleContainer">
        <h1 className>FAQ</h1>
      </div>
      <div className="FAQSectionContainer">
        <h1>General</h1>
        <FAQItem question='What is Spogo?' answer='Spogo is the premier platform that allows athletes to gain exposure and monetize off their name, image and likeness.'/>
        <FAQItem question='Why did you decide to start Spogo?' answer='Yessir'/>
        <FAQItem question='When can I start using Spogo?' answer='Yessir'/>
        <FAQItem question='Who can/should use Spogo?' answer='Yessir'/>
      </div>
      <div className="FAQSectionContainer">
        <h1>Product</h1>
        <FAQItem question='How can I customize my Spogo profile?' answer='Yessir'/>
        <FAQItem question='After I’ve added information to my profile, can I edit or delete it?' answer='Yessir'/>
        <FAQItem question='After creating my Spogo profile, what do I do with it?' answer='Yessir'/>
        <FAQItem question='How do other people view my Spogo profile?' answer='Yessir'/>
      </div>
      <Footer/>
    </>
  );
};

export default LandingPageFAQ;
