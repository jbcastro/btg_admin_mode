import React, { Component } from "react";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  
  handleLogin = (e) => {
    e.preventDefault();
    this.props.setLogIn(this.state.email, this.state.password);
  };
   openPage=()=>{
    var wnd = window.open("https://rn-admin-back.herokuapp.com/");
    setTimeout(function() {
      wnd.close();
    }, 1);
    return false;
  };
  
  both=(e)=>{
    {this.handleLogin(e)}
    {this.openPage(e)}
  }
  
  render() {
    return (
      <form className="container" name="login" onSubmit={this.both}>
        <p>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            onChange={(e) =>
              this.setState({
                email: e.target.value,
              })
            }
          />
        </p>
        <p>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            onChange={(e) =>
              this.setState({
                password: e.target.value,
              })
            }
          />
        </p>
        <p>
          <button
            type="submit"
            disabled={!this.state.emai && !this.state.password}
          >
            Login
          </button>
        </p>
      </form>
    );
  }
}