import React, { Component, PropTypes } from 'react';

class LoaderStatus extends Component {
  static propType = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    percent: PropTypes.number.isRequired,
  }
  style = {
    container: {
      position: 'absolute',
      overflow: 'hiddden',
      width: `${this.props.width}vw`,
      height: `${this.props.height}vw`,
      left: `${this.props.x}%`,
      top: `${this.props.y}%`,
      backgroundColor: this.props.secondaryColor || 'gray',
      MsTransform: 'translate(-50%, -50%)',
      WebkitTransform: 'translate(-50%, -50%)',
      Transform: 'translate(-50%, -50%)',
      MsTransformOrigin: '50% 50%',
      WebkitTransformOrigin: '50% 50%',
      TransformOrigin: '50% 50%',
      MsBorderRadius: `${this.props.height}vw`,
      WebkitBorderRadius: `${this.props.height}vw`,
      BorderRadius: `${this.props.height}vw`,
    },
    bar: {
      height: `${this.props.height}vw`,
      backgroundColor: this.props.color,
      MsBorderRadius: `${this.props.height}vw`,
      WebkitBorderRadius: `${this.props.height}vw`,
      BorderRadius: `${this.props.height}vw`,
    }
  }
  progress = () => ({width: `${(this.props.percent === 0 ? 0 : this.props.percent / 100) * this.props.width}vw`})
  render() {
    return (
      <div style={this.style.container}>
        <div style={Object.assign({}, this.style.bar, this.progress())}></div>
      </div>
    );
  }
}

export default LoaderStatus;