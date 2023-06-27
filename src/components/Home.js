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
            Life Changing Opportunity
          </h1>
          <h1 className="bg-title">
            could be Just ONE Event Away
          </h1>
          <p className="bg-para">
            The World needs to Know your Message or You need the World To know
            your Message. Don’t Hold Back! It will change Lives. Get Started!
          </p>
          <button className="bg-button" onClick={goToTop}>See how it works</button>
        </div>
      </div>
    </>
  );
}

export default Home;