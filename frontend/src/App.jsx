import React from 'react';
import Microphone from './components/Microphone';
import Title from './components/Title';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="container mt-5">
      {/* Title Section */}
      <div className="text-center mb-4">
        <Title text={'Speech to Text App'} />
      </div>

      {/* Microphone Section */}
      <div className="d-flex justify-content-center">
        <div>
          <Microphone />
        </div>
      </div>
    </div>
  );
};

export default App;
