import React from 'react';

class HelloComponent extends React.Component {
  render() {
    if(this.props.asPageHeader) {
      return (
        <div className='page-header'>
          <h1>{this.props.message}</h1>
        </div>
      );

    } else {
      return (
        <h1>{this.props.message}</h1>
      );
    }
  }
}

HelloComponent.propTypes = {
  asPageHeader: React.PropTypes.bool,
  message: React.PropTypes.string.isRequired
};

export default HelloComponent;
