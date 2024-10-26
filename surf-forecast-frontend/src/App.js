import React from 'react';
import SurfSpot from './SurfSpot';

function App() {
  // Maroubra Beach coordinates
  const lat = '-33.9509';
  const lon = '151.2593';

  return (
    <div className="App">
      <h1>Surf Forecast App</h1>
      <SurfSpot lat={lat} lon={lon} />
    </div>
  );
}

export default App;
