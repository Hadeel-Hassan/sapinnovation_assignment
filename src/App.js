import { ListGroup } from "react-bootstrap";
import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import firebase from "./firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { render } from "@testing-library/react";
<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
  integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
  crossorigin="anonymous"
></link>;

export default class App extends Component {
  state = {
    data: [],
    select_list: [],
  };
  async getInitialCollection() {
    var options_array = [];
    const db = firebase.firestore();
    var options, initial_options;
    initial_options = await db
      .collection("categories")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          options = doc.data();
        });
      })
      .then(() => {
        return Object.entries(options)
          .sort()
          .map(([key, value]) => {
            options_array.push(value);
          });
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    return options_array;
  }

  async getCollection(collection) {
    const db = firebase.firestore();
    var options_array = [];
    var options = [];
    var get_options = await db
      .collection(collection)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.size == 0) {
          return -1;
        } else {
          querySnapshot.forEach(function (doc) {
            options = doc.data();
          });
        }
      })
      .then(() => {
        if (options != []) {
          return Object.entries(options)
            .sort()
            .map(([key, value]) => {
              options_array.push(value);
            });
        } else return -1;
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    if (get_options.length == 0) {
      return -1
    }
    else {
      return options_array;
    }
  }

  async getDocument(document) {
    var options_array = [];
    const db = firebase.firestore();
    const collectionRef = await db.collection("new_categories").doc(document).get().then((snapshot) => {
      Object.values(snapshot.data())
        .sort()
        .map((value) => {
          options_array.push(value);
        });
    }).catch(function (error) {
      console.log("Error getting document:", error);
      return -1;
    });

    return options_array
  }

  async addCollection(collection) {
    const db = firebase.firestore();
    const data = {
      1: collection + "-1",
      2: collection + "-2",
    };
    var new_collection = await db
      .collection("new_categories")
      .doc(collection)
      .set(data);
    new_collection = await this.getDocument(collection);
    return new_collection;
  }

  _handleSelect = (event) => {
    this.handleSelect(event.target.value);
  };
  async handleSelect(value) {
    var selected = value;
    var options = await this.getCollection(selected.toLowerCase());
    if (options == -1) {
      options = await this.getDocument(selected.toLowerCase());
      if (options.length == 0) {
        options = await this.addCollection(selected.toLowerCase());
      }
    }
    var new_list = this.state.select_list;
    new_list.push({ options: options });
    this.setState({ select_list: new_list });
  }

  renderNewOption = function (option) {
    return <option>{option}</option>;
  };

  async componentDidMount() {
    // if (this.state.data.length == 0) {
    this.setState({ data: await this.getInitialCollection() });
    // }

  }

  render() {
    return (
      <Fragment>
        <div
          style={{
            display: "flex",
            margin: "auto",
            width: "60%",
            height: window.innerHeight,
            backgroundColor: "#7bdcb5",
          }}
        >

          <ListGroup
            style={{
              display: "flex",
              margin: "auto",
              width: "100%"
            }}
          >
            <ListGroup.Item style={{ backgroundColor: "inherit", border: "0px" }}><select
              className="form-control"
              onChange={this._handleSelect}
            >
              <option disabled selected>Select...</option>
              {this.state.data.map(this.renderNewOption)}
            </select>
            </ListGroup.Item>
            {this.state.select_list.map((index) => {
              return (
                <ListGroup.Item style={{ backgroundColor: "#7bdcb5", border: "0px" }}>
                  <select

                    className="form-control"
                    onChange={this._handleSelect}
                  >
                    <option disabled selected>Select...</option>
                    <option>{index.options[0]}</option>
                    <option>{index.options[1]}</option>
                  </select>
                </ListGroup.Item>)
            })}
          </ListGroup>
        </div>
      </Fragment>
    );
  }
}
