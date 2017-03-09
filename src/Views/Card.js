import React, { Component, PropTypes } from 'react';
import FaceOff from '../assets/FaceOff.png';

class Card extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    deg: PropTypes.number.isRequired,
    owner: PropTypes.string.isRequired,
    faceOn: PropTypes.bool.isRequired,
    order: PropTypes.number.isRequired,
    players: PropTypes.array.isRequired,
    image: PropTypes.string.isRequired,
  }
  style(deg, plus = {}) {
    const { owner, players, order } = this.props;
    if (owner === 'Player') plus = { top: '100%', left: '50%' };
    else if (owner === 'Comp2') plus = { top: 0, left: '50%' };
    else if (owner === 'Comp3') plus = { top: '50%', left: '100%' };
    else if (owner === 'Comp1') plus = { top: '50%', left: 0 };
    else plus = { top: '50%', left: `${((order % players.length) * 15) + 28}%`, zIndex: order };
    return Object.assign({
      WebkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
      MsTransform: `rotate(${deg}deg)`,
      WebkitTransform: `rotate(${deg}deg)`,
      transform: `rotate(${deg}deg)`,
      position: 'absolute',
      width: '6vw',
      height: '9vw',
      marginLeft: '-3vw',
      marginTop: '-5vw' }, plus);
  }
  render() {
    const { id, deg, faceOn, image } = this.props;
    return (
      <img id={id} alt={id} src={faceOn ? image : FaceOff} className='Transition' style={this.style(deg)} />
    );
  }
}

export default Card;