import React, { Component, PropTypes } from 'react';
import Table2PlayersPNG from '../assets/TableTwoPlayers.png';
import Table3PlayersPNG from '../assets/TableThreePlayers.png';
import Table4PlayersPNG from '../assets/TableFourPlayers.png';
import AboutCreditPNG from '../assets/AboutCredit.png';
import CleanTablePNG from '../assets/CleanTable.png';

class Table extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
    about: PropTypes.bool.isRequired,
    congrats: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
  }
  getImage() {
    const { players, about, congrats, error } = this.props;
    if (about) return AboutCreditPNG;
    else if (congrats || error) return CleanTablePNG;
    else if (players.length === 2) return Table2PlayersPNG;
    else if (players.length === 3) return Table3PlayersPNG;
    else return Table4PlayersPNG;
  }
  render() {
    return (
      <img src={this.getImage()} alt='Table' className='Table Transition' />
    );
  }
};

export default Table;