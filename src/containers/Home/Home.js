import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Home extends React.Component {
  state = { items: null };
  render() {
    if (this.state.items === null) {
      return <div>Loading...</div>;
    }

    const pageCount = Math.ceil(this.state.items.count / 25);
    const pages = new Array(pageCount).fill(null);
    return (
      <section className="home">
        {" "}
        <ul>
          {this.state.items &&
            this.state.items.offers.map(x => (
              <Link to={"/item/" + x._id} key={x._id}>
                <li className="thumbnail">
                  <div className="main-picture ">
                    {x.pictures.length > 0 ? (
                      <img
                        className="thumbnail-pic"
                        src={x.pictures[0].url}
                        alt="Annonce"
                      />
                    ) : (
                      <i className="far fa-images" />
                    )}
                  </div>
                  <div className="content">
                    <div className="title">{x.title}</div>
                    <div className="price">{x.price} €</div>
                  </div>
                </li>
              </Link>
            ))}
        </ul>
        <div className="container pagination">
          {pages.map((v, index) => {
            return (
              <Link key={index} to={"/page/" + index}>
                {index + 1}
              </Link>
            );
          })}
        </div>
      </section>
    );
  }

  async componentDidMount() {
    const response = await axios.get(
      `https://leboncoin-api.herokuapp.com/api/offer/with-count?skip=${this
        .props.page * 25}&limit=25`
    );
    this.setState({ items: response.data });
  }
}

export default Home;
