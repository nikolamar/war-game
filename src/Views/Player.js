import React, { Component, PropTypes } from 'react';

class Player extends Component {
  static propTypes = {
    newWar: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    clickable: PropTypes.bool.isRequired,
    handleCard: PropTypes.func.isRequired,
  }
  render() {
    const { newWar, loading, clickable, handleCard } = this.props;
    if (!newWar || !clickable || loading) return null;

    return (
      <div className='PlayerField' onClick={handleCard}></div>
    );
  }
}

export default Player;