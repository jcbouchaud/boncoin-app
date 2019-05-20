import React from "react";
import axios from "axios";
import ReactFileReader from "react-file-reader";

class Post extends React.Component {
  state = {
    title: "",
    description: "",
    price: "",
    files: []
  };

  handleFiles = files => {
    const newFiles = [...this.state.files, ...files.base64];
    this.setState({
      files: newFiles
    });
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
    // console.log(this.state.title, this.state.description, this.state.price);
  };

  handleSubmit = event => {
    axios
      .post(
        "https://leboncoin-api.herokuapp.com/api/offer/publish",
        {
          title: this.state.title,
          description: this.state.description,
          files: this.state.files,
          price: Number(this.state.price)
        },
        {
          headers: {
            authorization: "Bearer " + this.props.user.token
          }
        }
      )
      .then(response => {
        console.log(response.data);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
    event.preventDefault();
  };

  render() {
    const filesArray = [];
    for (let i = 0; i < this.state.files.length; i++) {
      filesArray.push(
        <img
          key={i}
          onClick={() => {
            const newFiles = [...this.state.files];
            newFiles.splice(i, 1);
            this.setState({ files: newFiles });
          }}
          src={this.state.files[i]}
          alt="Annonce"
        />
      );
    }

    return (
      <section className="post">
        <form onSubmit={this.handleSubmit}>
          <div>
            <div className="top-banner">Votre annonce</div>
            <div className="content">
              <h3>Titre de l'annonce</h3>
              <input
                required
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleInput}
              />{" "}
              <h3>Texte de l'annonce</h3>
              <textarea
                className="description"
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleInput}
              />{" "}
              <h3>Prix</h3>
              <input
                required
                type="text"
                name="price"
                value={this.state.price}
                onChange={this.handleInput}
              />
              <div className="images">
                <ReactFileReader
                  fileTypes={[".png", ".jpg"]}
                  base64={true}
                  multipleFiles={true} // `false si une seule image`
                  handleFiles={this.handleFiles}
                >
                  <div className="add-pic">
                    <i className="fas fa-camera" />
                  </div>
                </ReactFileReader>
                {filesArray.map((x, index) => (
                  <div className="pic" key={index}>
                    {x}
                  </div>
                ))}
              </div>
            </div>
            <button type="submit"> Soumettre </button>
          </div>
        </form>{" "}
      </section>
    );
  }
}

export default Post;
