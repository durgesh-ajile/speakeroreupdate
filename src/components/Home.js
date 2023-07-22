import React from "react";
import "./Home.css";

function Home() {

  const goToTop = () => {
    let innerWidth = window.innerWidth
    if(innerWidth < 700){
      window.scrollTo({
        top: 375,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: 675,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className="bg-image">
        <div className="bg-text">
          <h1 className="bg-title">
          200,000+ Speaking Opportunities 
          </h1>
          <h1 className="bg-title">
          for speakers, trainers, founders and experts.
          </h1>
          <p className="bg-para">
          Time is Precious, Opportunities vast. No more endless searchless, No more wasted time. Your Voice Matters: Amplify your influence, one gig at a time.
          </p>
          <button className="bg-button" onClick={goToTop}>See how it works</button>
        </div>
      </div>
    </>
  );
}

export default Home;