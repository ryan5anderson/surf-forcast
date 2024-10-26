// calculateEnjoyability.js

const boardIdealConditions = {
    Shortboard: { idealWaveHeight: 4, idealWavePeriod: 8, idealWindSpeed: 10 },
    Longboard: { idealWaveHeight: 2, idealWavePeriod: 10, idealWindSpeed: 5 },
    Fish: { idealWaveHeight: 3, idealWavePeriod: 7, idealWindSpeed: 8 },
    // Add more board types if needed
  };
  
  /**
   * Calculate enjoyability rating based on the selected board, user's preferences,
   * and current surf conditions.
   * 
   * @param {string} boardType - The type of surfboard selected by the user.
   * @param {number} waveHeight - Current wave height in feet.
   * @param {number} wavePeriod - Current wave period in seconds.
   * @param {number} windSpeed - Current wind speed in knots.
   * @returns {number} Enjoyability rating from 0 to 100.
   */
  const calculateEnjoyabilityRating = (boardType, waveHeight, wavePeriod, windSpeed) => {
    const boardConditions = boardIdealConditions[boardType];
  
    if (!boardConditions) {
      console.warn(`Unknown board type: ${boardType}`);
      return 0; // Return 0 if board type is unknown
    }
  
    // Calculate scores for wave height, wave period, and wind speed
    const waveHeightDiff = Math.abs(boardConditions.idealWaveHeight - waveHeight);
    const waveHeightScore = Math.max(0, 100 - waveHeightDiff * 15); // Adjust sensitivity
  
    const wavePeriodDiff = Math.abs(boardConditions.idealWavePeriod - wavePeriod);
    const wavePeriodScore = Math.max(0, 100 - wavePeriodDiff * 10);
  
    const windSpeedDiff = Math.abs(boardConditions.idealWindSpeed - windSpeed);
    const windSpeedScore = Math.max(0, 100 - windSpeedDiff * 5);
  
    // Average the scores to get the final enjoyability rating
    const enjoyabilityRating = ((waveHeightScore + wavePeriodScore + windSpeedScore) / 3).toFixed(2);
    return enjoyabilityRating;
  };
  
  export default calculateEnjoyabilityRating;
  