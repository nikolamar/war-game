import React, { Component, PropTypes } from 'react';

class Score extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
  }
  render() {
    const { newWar, loading, players } = this.props;
    this.players = players;
    if (!newWar || loading) return null;

    return (
      <div>
        { 
          players.map(player => <img key={player.name} src={require(`../assets/${player.score}Off.png`)} alt={player.name} className={`Score ${player.name}`} />) 
        }
      </div>
    );
  }
}

export default Score;