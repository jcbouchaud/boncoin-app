import React from "react";
import axios from "axios";

class SignUp extends React.Component {
  state = { username: "", email: "", password: "", password2: "" };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    if (this.state.password === this.state.password2) {
      axios
        .post("https://leboncoin-api.herokuapp.com/api/user/sign_up", {
          email: this.state.email,
          password: this.state.password,
          username: this.state.username
        })
        .then(response => {
          //   console.log(response.data);
          if (response.data && response.data.token) {
            this.props.setUser({
              username: response.data.account.username,
              token: response.data.token,
              _id: response.data._id
            });
          }
        });
    } else {
      alert("Password is different");
    }
    event.preventDefault();
  };

  render() {
    return (
      <section className="sign-up">
        <div>
          <h2>Pourquoi créer un compte</h2>
          <div className="why">
            <i className="far fa-clock" />
            <div className="why-content">
              <div className="why-title">Gagnez du temps</div>
              <div className="why-content">
                Publiez vos annonces rapidement, avec vos informations
                pré-remplies chaque fois que vous souhaitez déposer une nouvelle
                annonce.
              </div>
            </div>
          </div>
          <div className="why">
            <i className="fas fa-bell" />
            <div className="why-content">
              <div className="why-title">Soyez les premiers informés</div>
              <div className="why-content">
                Créez des alertes Immo ou Emploi et ne manquez jamais l’annonce
                qui vous intéresse.
              </div>
            </div>
          </div>{" "}
          <div className="why">
            <i className="fas fa-eye" />
            <div className="why-content">
              <div className="why-title">Visibilité</div>
              <div className="why-content">
                Suivez les statistiques de vos annonces (nombre de fois où votre
                annonce a été vue, nombre de contacts reçus).
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="create">Créez un compte</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="username">
              <div className="input-title">Pseudo</div>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInput}
              />
            </div>
            <div className="email">
              <div className="input-title">Adresse e-mail</div>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInput}
              />
            </div>
            <div>
              <div className="password">
                <div className="input-title">Mot de passe</div>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInput}
                />
              </div>
              <div className="password">
                <div className="input-title">Confirmer le mot de passe</div>
                <input
                  className={
                    this.state.password === this.state.password2 &&
                    this.state.password !== ""
                      ? "green"
                      : ""
                  }
                  type="password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.handleInput}
                />
              </div>
            </div>
            <button type="submit">Créer mon Compte Personnel</button>
          </form>
        </div>
      </section>
    );
  }
}

export default SignUp;
