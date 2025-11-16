// Food items configuration for pet feeding system
export const FOOD_ITEMS = {
  // Chiot (Puppy) food items
  chiot: {
    croquette: {
      id: 'chiot-croquette',
      name: 'Croquette',
      type: 'regular',
      image: '/chiot_croquette.png',
      bowlFullImage: '/chiot_croquette_bowl1.png',
      bowlEmptyImage: '/chiot_croquette_bowl2.png',
      cost: 5, // XP cost or currency
      xpReward: 2,
      description: 'Une croquette nourrissante pour votre chiot'
    },
    muffin: {
      id: 'chiot-muffin',
      name: 'Muffin Spécial',
      type: 'special',
      image: '/chiot_muffin.png',
      cost: 10,
      xpReward: 5,
      description: 'Nourriture spéciale pour récompenses occasionnelles'
    }
  },

  // AF (Fantastic Animal) food items
  af: {
    dango: {
      id: 'af-dango',
      name: 'Dango',
      type: 'regular',
      image: '/af_food.png',
      bowlFullImage: '/af_food_bowl1.png',
      bowlEmptyImage: '/af_food_bowl2.png',
      cost: 5,
      xpReward: 2,
      description: 'Délicieux dango pour votre compagnon fantastique'
    },
    bao: {
      id: 'af-bao',
      name: 'Bao Spécial',
      type: 'special',
      image: '/af_foodspecial.png',
      cost: 10,
      xpReward: 5,
      description: 'Bao délicieux et nourrissant pour récompenses spéciales'
    }
  }
};

// Utility functions
const normalizeAnimalType = (animalType) => {
  if (!animalType) return null;
  const key = String(animalType).toLowerCase();

  // Direct match
  if (FOOD_ITEMS[key]) return key;

  // Common aliases / typos mapping
  if (['fox', 'renard', 'fantastic', 'fantastique'].includes(key)) return 'af';
  if (['puppy', 'dog', 'chien', 'chiot'].includes(key)) return 'chiot';

  return null;
};

export const getFoodItemsForAnimal = (animalType) => {
  const normalized = normalizeAnimalType(animalType);
  if (!normalized) return {};
  return FOOD_ITEMS[normalized] || {};
};

export const getFoodItem = (animalType, foodType) => {
  const normalized = normalizeAnimalType(animalType);
  if (!normalized) return null;
  const animalFoods = FOOD_ITEMS[normalized] || {};
  return animalFoods[foodType] || null;
};

export const getAllFoodItems = () => {
  return FOOD_ITEMS;
};

// Check if an animal has access to special food items based on level
export const canAccessSpecialFood = (animalLevel) => {
  return animalLevel === 'adolescent' || animalLevel === 'adult';
};
