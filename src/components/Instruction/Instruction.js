import React, { useState } from 'react';
import Modal from 'react-modal';
import './Instruction.css';

// Set the app root element for accessibility
Modal.setAppElement('#root');

const Instruction = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      contentLabel="Instructions Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>Welcome to Face Recognition App!</h2>
      <p>Follow these steps to get started:</p>
      <ol>
        <li>Register or sign in to save your entries.</li>
        <li>Enter an image URL into the input box.</li>
        <li>Click the <strong>Detect</strong> button to recognize faces.</li>
      </ol>
      <button className="modal-button" onClick={() => setModalIsOpen(false)}>
        Got It!
      </button>
    </Modal>
  );
};

export default Instruction;
