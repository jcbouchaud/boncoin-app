import React from "react";
import axios from "axios";
import user from "../../assets/img/user.svg";

class Item extends React.Component {
  state = { item: null };
  render() {
    return (
      <section className="item">
        <div className="offer-container">
          <div className="offer-content">
            <div className="offer-picture">
              <div className="pic">
                {this.state.item && this.state.item.pictures.length > 0 ? (
                  <img src={this.state.item.pictures[0].url} alt="main" />
                ) : null}
              </div>
            </div>
            <div className="offer-title">
              <h3>{this.state.item && this.state.item.title}</h3>
              <h4>{this.state.item && this.state.item.price}€</h4>
            </div>
            <div className="offer-desc">
              <p>{this.state.item && this.state.item.description}</p>
            </div>
          </div>
          <div className="offer-creator">
            <div className="offer-creator-name">
              <img src={user} alt="user-icon" />
              {this.state.item && this.state.item.creator.account.username}
            </div>
            <div className="offer-number">
              <button>Voir le numéro</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  async componentDidMount() {
    console.log(this.props.match.params);
    const response = await axios.get(
      `https://leboncoin-api.herokuapp.com/api/offer/` +
        this.props.match.params.itemId
    );
    this.setState({ item: response.data });
  }
}

export default Item;
