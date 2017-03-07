import React, { Component, PropTypes } from 'react';
import Card from './Card';

class Cards extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    newWar: PropTypes.bool.isRequired,
    players: PropTypes.array.isRequired,
  }
  render() {
    const { newWar, cards, players } = this.props;
    if (!newWar) return null;

    return ( 
      <div className='TableField'>
        { cards.map(card => <Card key={card.id} {...card} players={players} />) }
      </div>
    );
  }
}

export default Cards;