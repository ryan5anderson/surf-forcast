import React from 'react';

const ConditionPicker = ({ waveHeight, windSpeed, onConditionChange }) => {
  return (
    <div>
    <label>Preferred Wave Height (in feet): {waveHeight}</label>
    <input
        type="range"
        min="1"
        max="15"
        step="1"
        value={waveHeight}
        onChange={(e) => onConditionChange({ waveHeight: parseInt(e.target.value), windSpeed })}
    />

    <label>Preferred Wind Speed (in knots): {windSpeed}</label>
    <input
        type="range"
        min="0"
        max="50"
        step="1"
        value={windSpeed}
        onChange={(e) => onConditionChange({ waveHeight, windSpeed: parseInt(e.target.value) })}
    />
    </div>
  );
};

export default ConditionPicker;
