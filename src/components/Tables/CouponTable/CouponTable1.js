import React, { useEffect, useState } from 'react';
import MainComponent from './CouponTable';
import MobileComponent from './CouponTableMob';

export default function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Update window width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowWidth < 700 ? <MobileComponent /> : <MainComponent />;
}
