import React from 'react';

class MyComponent extends React.Component {
  render() {
    if(this.props.asPageHeader) {
      return (
        <div className='pageHeader'>
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

MyComponent.propTypes = {
  asPageHeader: React.PropTypes.bool,
  message: React.PropTypes.string.isRequired
};

export default MyComponent;
