import CardsJSON from './cards.json';

export const allCards = () => CardsJSON.map(card => ({ 
  id: card,
  image: `../assets/${card}.png`,
}));

export const allPlayers = () => ([
  { name: 'Player', image: '../assets/PlayerOff.png', score: 0 },
  { name: 'Comp1', image: '../assets/Comp1Off.png', score: 0 },
  { name: 'Comp2', image: '../assets/Comp2Off.png', score: 0 },
  { name: 'Comp3', image: '../assets/Comp3Off.png', score: 0 },
]);
