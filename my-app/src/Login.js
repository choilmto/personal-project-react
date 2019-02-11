import React, { Component } from 'react';
import { fetchUsernameThunk } from 'Thunks';

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
        <label>{this.props.user.error ||
           'Please enter your Github username'}</label>
        <input type="text" onChange={this.handleTyping}/>
        <input type="button" onClick={() =>
          this.props.dispatch(fetchUsernameThunk(this.state.uncheckedUsername))} value="Submit"/>
      </div>
    );
  }
}

export {Login};
