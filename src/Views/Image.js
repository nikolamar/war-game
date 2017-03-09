import React, { Component, PropTypes } from 'react';

class Image extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }
  state = {
    loaded: false,
  }
  onImageLoad = () => {
    this.setState({loaded: true});
  }
  componentDidMount() {
    let img = new window.Image();
    img.onload = this.onImageLoad;
    img.src = this.ref.getAttribute('src');
  }
  render() {
    const { loaded } = this.state;
    return( 
      <img ref={ref => this.ref=ref} {...this.props} className={`Transition ${loaded ? 'ImageLoaded' : 'ImageDefault'}`} />
    );
  }
}

export default Image;