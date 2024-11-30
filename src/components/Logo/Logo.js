import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Tilt from 'react-parallax-tilt';
import logo from './Logo.png';
import './Logo.css';

const Logo = () => {
  console.log('Logo Component is rendering');
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // Debugging console log to check if the condition is working
  console.log('isMobile:', isMobile);

  return (
    <>
      {!isMobile && (
        <div className='ma3 mt0 ml5'>
          <Tilt className="Tilt br2 shadow-2" style={{ height: 200, width: 200 }}>
            <div className="Tilt-inner pa3">
              <img alt='logo' src={logo} />
            </div>
          </Tilt>
        </div>
      )}
    </>
  );
}

export default Logo;
