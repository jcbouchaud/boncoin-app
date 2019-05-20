import React from "react";
import Header from "./components/Header/Header";
import Home from "./containers/Home/Home";
import Item from "./containers/Item/Item";
import SignUp from "./containers/SignUp/SignUp";
import SignIn from "./containers/SignIn/SignIn";
import Cookies from "js-cookie";
import Post from "./containers/Post/Post";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

class App extends React.Component {
  state = {
    user: {
      token: Cookies.get("token") || "",
      username: Cookies.get("username") || "",
      _id: Cookies.get("_id") || ""
    }
  };

  setUser = user => {
    Cookies.set("token", user.token);
    Cookies.set("username", user.username);
    Cookies.set("_id", user._id);
    this.setState({ user: user });
    console.log(this.state.user);
  };

  logOut = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("_id");
    this.setState({ user: "" });
  };

  render() {
    return (
      <div>
        {" "}
        <Router>
          <Header user={this.state.user} logOut={this.logOut} />
          <div className="container">
            <div>
              {" "}
              <Switch>
                <Route path="/" exact={true} render={() => <Home page={0} />} />
                <Route
                  path="/page/:pagenum"
                  exact={true}
                  render={props => {
                    const page = parseInt(props.match.params.pagenum, 10);
                    // On utilise la key pour indiquer Ã  React que si la page change
                    // il faut supprimer l'ancien OffersPage et en crÃ©er un nouveau
                    // et donc exÃ©cuter le componentDidMount !
                    return <Home key={page} page={page} />;
                  }}
                />
                <Route path="/item/:itemId" component={Item} />
                <Route
                  path="/signup"
                  render={() => {
                    if (this.state.user.token) {
                      return <Redirect to="/" />;
                    }
                    return <SignUp setUser={this.setUser} />;
                  }}
                />
                <Route
                  path="/signin"
                  render={() => {
                    if (this.state.user.token) {
                      return <Redirect to="/" />;
                    }
                    return <SignIn setUser={this.setUser} />;
                  }}
                />{" "}
                <Route
                  path="/post"
                  render={props => {
                    if (!this.state.user.token) {
                      return <Redirect to="/signin" />;
                    }
                    return <Post {...props} user={this.state.user} />;
                  }}
                />
              </Switch>
            </div>
          </div>{" "}
        </Router>
      </div>
    );
  }
}

export default App;
