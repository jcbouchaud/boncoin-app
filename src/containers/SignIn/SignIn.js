import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class SignIn extends React.Component {
  state = { email: "", password: "" };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
    // console.log(this.state.email, this.state.password);
  };

  handleSubmit = event => {
    axios
      .post("https://leboncoin-api.herokuapp.com/api/user/log_in", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        // console.log(response.data);
        if (response.data && response.data.token) {
          this.props.setUser({
            username: response.data.account.username,
            token: response.data.token,
            _id: response.data._id
          });
        }
      });

    event.preventDefault();
  };

  render() {
    return (
      <section className="sign-in">
        <h2>Connexion</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="email">
            <div>Adresse e-mail</div>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInput}
            />
          </div>
          <div className="password">
            <div>Mot de passe</div>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInput}
            />
          </div>
          <button type="submit">Se connecter</button>
        </form>
        <div className="no-account">Vous n'avez pas de compte ?</div>
        <Link className="sign-up-redirect" to="/signup">
          Créer un compte
        </Link>{" "}
      </section>
    );
  }
}

export default SignIn;
