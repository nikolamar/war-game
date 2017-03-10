import React, { Component, PropTypes } from 'react';
import Text from './Text';
import LoaderStatus from './LoaderStatus';

class Loader extends Component {
  static propType = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    show: PropTypes.bool.isRequired,
    percent: PropTypes.number.isRequired,
  }
  style = {
    position: 'absolute',
    left: `${this.props.x}%`,
    top: `${this.props.y}%`,
    width: `${this.props.width}vw`,
    height: `${this.props.height}vw`,
    MsTransform: 'translate(-50%, -50%)',
    WebkitTransform: 'translate(-50%, -50%)',
    Transform: 'translate(-50%, -50%)',
    MsTransformOrigin: '50% 50%',
    WebkitTransformOrigin: '50% 50%',
    TransformOrigin: '50% 50%',
    WebkitTransition: 'all ease-in-out 500ms',
    MozTransition: 'all ease-in-out 500ms',
    OTransition: 'all ease-in-out 500ms',
    transition: 'all ease-in-out 500ms',
    backgroundColor: this.props.debug ? 'red' : null,
  }
  render() {
    if (!this.props.show) return null;
    return (
      <div style={this.style}>
        <Text x={50} y={30} text='Loading...' color='white' size={10}/>
        <LoaderStatus percent={this.props.percent} secondaryColor='gray' width={80} height={2} x={50} y={70} color='white' />
      </div>
    );
  }
}

export default Loader;