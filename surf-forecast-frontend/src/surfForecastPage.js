// SurfForecastPage.js
import React, { useState, useEffect } from 'react';
import CurrentConditions from './currentConditions';
import BoardPicker from './boardPicker';
import ConditionPicker from './conditionPicker';

const SurfForecastPage = ({ lat, lon }) => {
  // State for selected board and preferred conditions
  const [selectedBoard, setSelectedBoard] = useState("Shortboard");
  const [preferredConditions, setPreferredConditions] = useState({
    waveHeight: 2, // default wave height preference
    windSpeed: 10  // default wind speed preference
  });
  const [currentConditions, setCurrentConditions] = useState(null); // Store actual conditions
  const [enjoyabilityRating, setEnjoyabilityRating] = useState(null);

  // Define ideal conditions for each board type
  const boardIdealConditions = {
    Shortboard: { idealWaveHeight: 4, idealWavePeriod: 8, idealWindSpeed: 10 },
    Longboard: { idealWaveHeight: 2, idealWavePeriod: 10, idealWindSpeed: 5 },
    Fish: { idealWaveHeight: 3, idealWavePeriod: 7, idealWindSpeed: 8 },
    // Add more board types if needed
  };

  // Calculate Enjoyability Rating
  const calculateEnjoyabilityRating = (boardType, waveHeight, wavePeriod, windSpeed) => {
    const boardConditions = boardIdealConditions[boardType];
    if (!boardConditions) return 0; // Return 0 if board type is unknown

    // Calculate scores for wave height, wave period, and wind speed
    const waveHeightDiff = Math.abs(boardConditions.idealWaveHeight - waveHeight);
    const waveHeightScore = Math.max(0, 100 - waveHeightDiff * 15); // Adjust sensitivity

    const wavePeriodDiff = Math.abs(boardConditions.idealWavePeriod - wavePeriod);
    const wavePeriodScore = Math.max(0, 100 - wavePeriodDiff * 10);

    const windSpeedDiff = Math.abs(boardConditions.idealWindSpeed - windSpeed);
    const windSpeedScore = Math.max(0, 100 - windSpeedDiff * 5);

    // Average the scores to get the final enjoyability rating
    return ((waveHeightScore + wavePeriodScore + windSpeedScore) / 3).toFixed(2);
  };

  // Fetch current conditions (mocked here for simplicity)
  useEffect(() => {
    // Replace with actual API fetch and set data to `currentConditions`
    setCurrentConditions({
      waveHeight: 4.5, // Example value
      wavePeriod: 9,   // Example value
      windSpeed: 12,   // Example value
    });
  }, [lat, lon]);

  // Calculate and update enjoyability rating when conditions or selected board change
  useEffect(() => {
    if (currentConditions) {
      const rating = calculateEnjoyabilityRating(
        selectedBoard,
        currentConditions.waveHeight,
        currentConditions.wavePeriod,
        currentConditions.windSpeed
      );
      setEnjoyabilityRating(rating);
    }
  }, [selectedBoard, currentConditions]);

  return (
    <div>
      <h1>Surf & Weather Forecast</h1>

      {/* Board Selection */}
      <BoardPicker selectedBoard={selectedBoard} onBoardChange={setSelectedBoard} />

      {/* Condition Preferences */}
      <ConditionPicker
        waveHeight={preferredConditions.waveHeight}
        windSpeed={preferredConditions.windSpeed}
        onConditionChange={(newConditions) => setPreferredConditions(newConditions)}
      />

      {/* Surf Spot Data */}
      <CurrentConditions lat={lat} lon={lon} />

      {/* Display Enjoyability Rating */}
      {enjoyabilityRating && (
        <div>
          <h2>Enjoyability Rating</h2>
          <p>{enjoyabilityRating} / 100</p>
        </div>
      )}
    </div>
  );
};

export default SurfForecastPage;
