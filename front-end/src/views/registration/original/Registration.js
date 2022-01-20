import React from "react";


class Registration extends React.Component {

  constructor() {

    super();

    this.state =
    {
      username: "",
      displayname: "",
      password: "",
      password2: "",
      usernameError: "",
      displaynameError: "",
      passwordError: "",
      password2Error: "",
      isSubmitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.usernameValidation = this.usernameValidation.bind(this);
    this.displaynameValidation = this.displaynameValidation.bind(this);
    this.passwordValidation = this.passwordValidation.bind(this);
    this.matchPassword = this.matchPassword.bind(this);
    this.isField = this.isField.bind(this);
  }


  handleChange(e) {

    const { name, value } = e.target;
    this.setState({ [name]: value });
    return;
  }


  handleSubmit(e) {

    e.preventDefault();

    let isValid = true;
    let fieldsList = ["username", "displayname", "password", "password2"];

    for (let field in fieldsList) {
      isValid = this.isField(fieldsList[field]) && isValid;
    }

    if (isValid) {
      this.setState({ isSubmitted: true });
    } else {
      this.setState({ isSubmitted: false });
    }

    return this.state.isSubmitted;
  }


  isField(field) {

    let isValid = false;

    switch (field) {
      case "username":
        isValid = this.usernameValidation();
        break;
      case "displayname":
        isValid = this.displaynameValidation();
        break;
      case "password":
        isValid = this.passwordValidation();
        break;
      case "password2":
        isValid = this.matchPassword();
        break;
    }

    return isValid;
  }


  usernameValidation() {

    let usernameError = "";

    const usernameRegex = /^[A-Za-z][\w]{2,14}[A-Za-z0-9]$/;

    if (this.state.username.trim() === "") {
      usernameError = "Username required";
    } else if (!usernameRegex.test(this.state.username)) {
      usernameError = "Username must be 4-16 characters with no space character";
    }

    this.setState({ usernameError });

    return usernameError === "";
  }


  displaynameValidation() {

    let displaynameError = "";

    const displaynameRegex = /^[A-Za-z][\w]{2,64}[A-Za-z0-9]$/; // need modification

    if (this.state.displayname.trim() === "") {
      displaynameError = "Displayname required";
    } else if (!displaynameRegex.test(this.state.displayname)) {
      displaynameError = "Displayname must be 0-64 characters with no space character";
    };


    this.setState({ displaynameError });

    return displaynameError === "";
  }


  passwordValidation() {

    let passwordError = "";
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,30}$/;

    if (this.state.password.trim === "") {
      passwordError = "Password required";
    } else if (!passwordRegex.test(this.state.password)) {
      passwordError = "Password needs to be 8-30 characters including at least 1 digit, 1 upper and 1 lowercase";
    }

    this.setState({ passwordError });
    return passwordError === "";
  }


  matchPassword() {

    let password2Error = "";

    if (this.state.password !== this.state.password2)
      password2Error = "Passwords do not match";

    this.setState({ password2Error });
    return password2Error === "";
  }





  render() {
    return (
      <div className="registration">

        <br />
        <br />

        {this.state.isSubmitted

          ?

          <div style={{ textAlign: "center" }} className="complete">
            <h3>Complete registration!</h3>
            <div>Username: {this.state.username}</div>
            <div>Displayname: {this.state.displayname}</div>
          </div>

          :

          <div className="registration-form" style={{ textAlign: "center" }}>

            <input
              readOnly
              type="text"
              placeholder="Token"
              name="token"
              //value={ get value from backend }
              onChange={this.handleChange}
            />

            <br />
            <br />

            <form onSubmit={this.handleSubmit} >

              <input
                type="text"
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />

              {this.state.usernameError &&
                (<div className="error">{this.state.usernameError}</div>)}

              <br />
              <br />

              <input
                type="text"
                placeholder="Displayname"
                name="displayname"
                value={this.state.displayname}
                onChange={this.handleChange}
              />

              {this.state.displaynameError &&
                (<div className="error">{this.state.displaynameError}</div>)}

              <br />
              <br />

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />

              {this.state.passwordError &&
                (<div className="error">{this.state.passwordError}</div>)}

              <br />
              <br />

              <input
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={this.state.password2}
                onChange={this.handleChange}
              />

              {this.state.password2Error &&
                (<div className="error">{this.state.password2Error}</div>)}

              <br />
              <br />

              <button type="submit" >Register</button>

            </form>
          </div>
        }
      </div>
    );
  }
}


export default Registration;