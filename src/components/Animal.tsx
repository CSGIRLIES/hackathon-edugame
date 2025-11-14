import React from 'react';

interface AnimalProps {
  type: string;
  color: string;
  level: string;
}

const Animal: React.FC<AnimalProps> = ({ type, color, level }) => {
  // Simple representation, can be replaced with images or animations later
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Your {level} {type}</h2>
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: color,
          borderRadius: level === 'baby' ? '50%' : level === 'adolescent' ? '30%' : '20%',
          margin: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px',
        }}
      >
        {type === 'cat' ? '🐱' : type === 'dragon' ? '🐉' : type === 'otter' ? '🦦' : '🐧'}
      </div>
    </div>
  );
};

export default Animal;
