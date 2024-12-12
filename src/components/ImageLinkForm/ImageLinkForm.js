import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  
  // Handle form submission when Enter is pressed
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    onButtonSubmit();       // Call the Detect function
  };

  return (
    <div>
      <p className='f3 yellow'>
        {/* {'Enter an image URL below and click "Detect" to see face recognition results.'} */}
      </p>
      <div className='center'>
        <form className='form center pa4 br3 shadow-5' onSubmit={handleSubmit}>
          <input
            className='f4 pa2 w-70 center'
            type='text'
            placeholder="Enter an image URL"
            onChange={onInputChange}
          />
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            type='submit'   // Make this a submit button
          >
            Detect
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImageLinkForm;
