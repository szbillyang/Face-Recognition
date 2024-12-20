import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='auto' height='350px' />
        {
          boxes && boxes.length > 0 && boxes.map((box, index) => (
            <div
              key={index}
              className='bounding-box'
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol
              }}
            ></div>
          ))
        }
      </div>
    </div>
  );
}

export default FaceRecognition;
