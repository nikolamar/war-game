import React, { Component, PropTypes } from 'react';

class Text extends Component {
  static propType = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }
  style = {
    position: 'absolute',
    left: `${this.props.x}%`,
    top: `${this.props.y}%`,
    fontSize: `${this.props.size}vw`,
    color: this.props.color,
    MsTransform: 'translate(-50%, -50%)',
    WebkitTransform: 'translate(-50%, -50%)',
    Transform: 'translate(-50%, -50%)',
    MsTransformOrigin: '50% 50%',
    WebkitTransformOrigin: '50% 50%',
    TransformOrigin: '50% 50%',
  }
  render() {
    return (
      <div style={this.style}>{ this.props.text }</div>
    );
  }
}

export default Text;