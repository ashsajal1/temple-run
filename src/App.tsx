import React from 'react';

export default function App() {
  return (
    <div style={{ 
      backgroundImage: `url(/ground.png)`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <img style={{ position: 'absolute', left: '40px', width: '120px', height: '130px', bottom: '80px' }} src={`/man.gif`} alt="man running" />
    </div>
  );
}
