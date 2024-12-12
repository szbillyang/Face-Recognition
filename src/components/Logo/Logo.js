import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Tilt from 'react-parallax-tilt';
import logo from './Logo.png';
import './Logo.css';

const Logo = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <>
      {!isMobile && (
        <div className='logo-container'>
          <Tilt className="Tilt br2 shadow-2" style={{ height: 100, width: 100 }}>
            <div className="Tilt-inner pa3">
              <img alt='logo' src={logo} style={{ width: '100%', height: 'auto' }} />
            </div>
          </Tilt>
        </div>
      )}
    </>
  );
}

export default Logo;
