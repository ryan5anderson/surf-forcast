import React from 'react';

const BoardPicker = ({ selectedBoard, onBoardChange }) => (
  <div>
    <label>Select Surfboard:</label>
    <select value={selectedBoard} onChange={(e) => onBoardChange(e.target.value)}>
      <option value="Shortboard">Shortboard</option>
      <option value="Longboard">Longboard</option>
      <option value="Fish">Fish</option>
      {/* Add more boards as needed */}
    </select>
  </div>
);

export default BoardPicker;
