import React, { Component, PropTypes } from 'react';

class Menu extends Component {
  static propTypes = {
    newWar: PropTypes.bool.isRequired,
    congrats: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    players: PropTypes.array.isRequired,
    offline: PropTypes.bool.isRequired,
  }
  playersClass() {
    const { players } = this.props; 
    if (players.length === 2) return 'TwoPlayers';
    else if (players.length === 3) return 'ThreePlayers';
    else return 'FourPlayers';
  }
  offlineClass() {
    const { offline } = this.props; 
    if (offline) return 'Offline';
    else return 'Online';
  }
  render() {
    const { newWar, congrats, error, loading, about, handleMenu, players } = this.props;
    let menu = null;
    if (!newWar) {
      menu = <div className='Menu Transition'>
        <div 
          id='New War' 
          className='NewWar Background Transition' 
          onClick={handleMenu} 
        />
        <div 
          id='Players' 
          className={`${this.playersClass()} Background Transition`} 
          onClick={handleMenu} 
        />
        <div 
          id='Offline' 
          className={`${this.offlineClass()} Background Transition`} 
          onClick={handleMenu} 
        />
        <div 
          id='About'
          className='About Background Transition' 
          onClick={handleMenu} 
        />
      </div>
    }
    if (about) {
      menu = <div className='Menu Transition'>
        <div 
          id='Back To Menu'
          className='BackToMenu Background Transition' 
          onClick={handleMenu} 
        />
      </div>
    }
    if (congrats) {
      let wp = players[0];
      let wpList = [];
      players.map(p => wp = wp.score > p.score ? wp : p);
      players.map(p => {
        if (wp.score === p.score) wpList.push(p);
        return null; 
      });
      const congrats = wpList.map((p, i) => <div
        key={p.name}
        id={p.name}
        className={`${p.name}Won Background`}
      />);
      menu = <div className='Menu Transition'>
        { congrats }
        <div className='Menu Transition'>
          <div 
            id='Back To Menu'
            className='BackToMenu Background Transition' 
            onClick={handleMenu} 
          />
        </div>
      </div>
    }
    if (loading) {
      menu = <div className='Menu Transition'>
        <div 
          id='Loading'
          className='Loading Background Transition'
        />
      </div>
    }
    if (error) {
      menu = <div className='Menu Transition'>
        <div 
          id='Fucked'
          className='Fucked Background Transition'
        />
        <div className='Menu Transition'>
          <div 
            id='Back To Menu'
            className='BackToMenu Background Transition' 
            onClick={handleMenu} 
          />
        </div>
      </div>
    }
    return menu;
  }
}

export default Menu;