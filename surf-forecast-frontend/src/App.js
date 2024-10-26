// App.js
import React from 'react';
import SurfForecastPage from './surfForecastPage';

function App() {
  // Maroubra Beach coordinates
  const lat = '-33.9509';
  const lon = '151.2593';

  return (
    <div className="App">
      <h1>Surf Forecast App</h1>
      <SurfForecastPage lat={lat} lon={lon} />
    </div>
  );
}

export default App;
