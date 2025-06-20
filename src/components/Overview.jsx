import React, { useState } from 'react'
import Modal from './Modal';
const Overview = () => {

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
    <div className="App-collection">
        <ul>
            <li>Dark / Light Toggle</li>
            <li>*Like Button</li>
            <li>*Accordion</li>
            <li>Digital Clock</li>
            <li>Stop Watch</li>
            <li>Switch</li>
            <li>*Star Rating</li>
            <li>*Breadcrumbs</li>
            <li>Pagination</li>
            <li>Typeahead/Autosuggestion</li>
            <li>TodoList</li>
            <li>Poll Widget</li>
            <li>Toast Component</li>
            <li>TicTacToe</li>
            <li>Multi step form</li>
            <li>Image Carousel / Slider</li>
            <li>Memory Game</li>
            <li>*Selectable Grid</li>
            <li>Quiz App</li>
            <li>Stepper</li>
            <li>*Progress Bar</li>
            <li>Password Generator</li>
            <li>Countdown Timer</li>
            <li>Traffic Light Simultaor</li>
            <li>OTP Login</li>
            <li>Job Board</li>
            <li>Grid Lights</li>
            <li>Tab List</li>
            <li>*Modal Dialog</li>
            <button onClick={() => setModalOpen(true)}>Open Modal</button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            title="Example Modal"
          >
            <p>This is a modal dialog content.</p>
          </Modal>
        </ul>
    </div>
    </>
  )
}

export default Overview