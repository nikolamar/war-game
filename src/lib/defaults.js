import CardsJSON from './cards.json';

export const allCards = () => CardsJSON.map(card => ({ 
  id: card,
  image: require(`../assets/${card}.png`), 
}));

export const allPlayers = () => ([
  { name: 'Player', image: require('../assets/PlayerOff.png'), score: 0 },
  { name: 'Comp1', image: require('../assets/Comp1Off.png'), score: 0 },
  { name: 'Comp2', image: require('../assets/Comp2Off.png'), score: 0 },
  { name: 'Comp3', image: require('../assets/Comp3Off.png'), score: 0 },
]);
