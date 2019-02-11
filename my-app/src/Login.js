import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uncheckedUsername: ""
    };
  }

  componentWillUnmount () {
    //is this useful?
    this.setState({uncheckedUsername: ""});
  }

  handleTyping = (e) => {
    this.setState({uncheckedUsername: e.target.value});
  }

  render() {
    return (
      <div>
        <label>{this.props.error ||
           'Please enter your Github username'}</label>
        <input type="text" onChange={this.handleTyping}/>
        <input type="button" onClick={() =>
          this.props.handleButton(this.state.uncheckedUsername)} value="Submit"/>
      </div>
    );
  }
}

export {Login};
