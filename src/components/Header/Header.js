import React from "react";
import logo from "../../assets/img/logo-boncoin.png";
import { Link } from "react-router-dom";

const Header = props => {
  return (
    <header>
      <div className="container">
        <div className="left-nav">
          {/* Logo redirects to offers page */}
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
          {/* Publish a new item */}
          <Link to="/post">
            <div className="post">
              <div>
                <i className="far fa-plus-square" />
              </div>
              <div>Déposer une annonce</div>
            </div>
          </Link>
        </div>
        <div className="right-nav">
          {/* Log Out */}
          <div onClick={props.logOut}>
            {props.user.token ? (
              <div className="logout">
                <div>
                  <i className="far fa-times-circle" />
                </div>
                <div>Se déconnecter</div>
              </div>
            ) : null}
          </div>

          {/* Log In */}
          <Link to="/signin">
            <div className="login user">
              <div>
                <i className="far fa-user" />
              </div>
              <div>
                {props.user.token ? props.user.username : "Se connecter"}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
