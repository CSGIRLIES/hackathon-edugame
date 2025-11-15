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
      image: './chiot_muffin.png',
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
export const getFoodItemsForAnimal = (animalType) => {
  return FOOD_ITEMS[animalType] || {};
};

export const getFoodItem = (animalType, foodType) => {
  const animalFoods = getFoodItemsForAnimal(animalType);
  return animalFoods[foodType] || null;
};

export const getAllFoodItems = () => {
  return FOOD_ITEMS;
};

// Check if an animal has access to special food items based on level
export const canAccessSpecialFood = (animalLevel) => {
  return animalLevel === 'adolescent' || animalLevel === 'adult';
};
