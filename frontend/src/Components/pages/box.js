import React, { useState } from 'react';
const Box = () => {
    // const [selectedBox, setSelectedBox] = useState(null);
    const [selectedBox, setSelectedBox] = useState(null);

  const handleBoxClick = (id) => {
    setSelectedBox(id);
  };

  const getButtonStyle = (id) => {
    return {
      backgroundColor: selectedBox === id ? 'red' : 'blue',
    };
  };
  return (
    <>
     <button className="box-button" style={getButtonStyle(1)} onClick={() => handleBoxClick(1)}>
        Button 1
      </button>
      <button className="box-button" style={getButtonStyle(2)} onClick={() => handleBoxClick(2)}>
        Button 2
      </button>
      <button className="box-button" style={getButtonStyle(3)} onClick={() => handleBoxClick(3)}>
        Button 3
      </button>
    </>
  )
}

export default Box