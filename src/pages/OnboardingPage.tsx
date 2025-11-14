import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [animalType, setAnimalType] = useState('');
  const [animalColor, setAnimalColor] = useState('');
  const [animalName, setAnimalName] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const animalOptions = ['cat', 'dragon', 'otter', 'penguin'];
  const colorOptions = ['blue', 'green', 'purple', 'red'];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Finish onboarding
      const newUser = {
        id: Date.now().toString(),
        name: userName,
        animalType,
        animalName,
        animalColor,
        xp: 0,
        level: 'baby' as const,
      };
      setUser(newUser);
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to CSGIRLIES!</h1>
      {step === 0 && (
        <>
          <h2>What is your name?</h2>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </>
      )}
      {step === 1 && (
        <>
          <h2>Choose your animal companion</h2>
          {animalOptions.map((animal) => (
            <button key={animal} onClick={() => setAnimalType(animal)}>
              {animal}
            </button>
          ))}
        </>
      )}
      {step === 2 && (
        <>
          <h2>Choose a color for your animal</h2>
          {colorOptions.map((color) => (
            <button key={color} onClick={() => setAnimalColor(color)}>
              {color}
            </button>
          ))}
        </>
      )}
      {step === 3 && (
        <>
          <h2>Name your companion:</h2>
          <input
            type="text"
            value={animalName}
            onChange={(e) => setAnimalName(e.target.value)}
            placeholder="Enter animal name"
            required
          />
        </>
      )}
      <div>
        {step > 0 && <button onClick={handleBack}>Back</button>}
        <button onClick={handleNext} disabled={
          (step === 0 && !userName) ||
          (step === 1 && !animalType) ||
          (step === 2 && !animalColor) ||
          (step === 3 && !animalName)
        }>
          {step === 3 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default OnboardingPage;
