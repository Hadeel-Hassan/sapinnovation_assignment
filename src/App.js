import { Button } from "react-bootstrap";
import React, { Component, Fragment } from "react";
import Select from "react-select";
import firebase from "./firebase";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {
  state = {
    section: "",
    collection: "",
    options: [],
    options_2: [],
    o2_disabled: true,
    options_3: [],
    o3_disabled: true,
    options_4: [],
    o4_disabled: true,
    options_5: [],
    o5_disabled: true,
    reset: false,
  };

  // ================================= Fetch Options Method ================================= 
  async fetchOptions(options_no) {
    const db = firebase.firestore();
    var result, get_options;
    get_options = await db
      .collection(this.state.collection)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          result = doc.data();
        });
      })
      .then(() => {
        return result;
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    let counter = 0;
    switch (options_no) {
      case 1:
        var options = Object.entries(get_options)
          .sort()
          .map(([key, value]) => {
            this.setState({
              options_2: this.state.options_2.concat({
                value: counter,
                label: value,
              }),
            });
            counter = counter + 1;
          });
        break;
      case 2:
        var options = Object.entries(get_options)
          .sort()
          .map(([key, value]) => {
            this.setState({
              options_3: this.state.options_3.concat({
                value: counter,
                label: value,
              }),
            });
            counter = counter + 1;
          });
        break;
      case 3:
        var options = Object.entries(get_options)
          .sort()
          .map(([key, value]) => {
            this.setState({
              options_4: this.state.options_4.concat({
                value: counter,
                label: value,
              }),
            });
            counter = counter + 1;
          });
        break;
      case 4:
        var options = Object.entries(get_options)
          .sort()
          .map(([key, value]) => {
            this.setState({
              options_5: this.state.options_5.concat({
                value: counter,
                label: value,
              }),
            });
            counter = counter + 1;
          });
        break;
    }
  }

  // ================================= Chooese Which Options to Render Method ================================= 
  async whichOptions(value, n) {
    var options;
    var selected = value.value;
    switch (n) {
      case "1":
        {
          this.setState({ o2_disabled: false });
          if (selected == 0) {
            await this.setState({ collection: "sub-a", section: "a" });
          } else {
            await this.setState({ collection: "sub-b", section: "b" });
          }
          this.fetchOptions(1);
        }
        break;
      case "2":
        {
          this.setState({ o3_disabled: false });
          if (this.state.section == "a") {
            if (selected == 0) {
              await this.setState({ collection: "sub-a1" });
            } else if (selected == 1) {
              await this.setState({ collection: "sub-a2" });
            }
          }
          if (this.state.section == "b") {
            if (selected == 0) {
              await this.setState({ collection: "sub-b1" });
            } else if (selected == 1) {
              await this.setState({ collection: "sub-b2" });
            }
          }
          this.fetchOptions(2);
        }
        break;
      case "3":
        {
          this.setState({ o4_disabled: false });
          if (this.state.section == "a") {
            if (value.label.includes("A1")) {
              if (selected == 0) {
                await this.setState({ collection: "a1-1" });
              } else if (selected == 1) {
                await this.setState({ collection: "a1-2" });
              }
            } else if (value.label.includes("A2")) {
              if (selected == 0) {
                await this.setState({ collection: "a2-1" });
              } else if (selected == 1) {
                await this.setState({ collection: "a2-2" });
              }
            }
          }
          if (this.state.section == "b") {
            if (value.label.includes("B1")) {
              if (selected == 0) {
                await this.setState({ collection: "b1-1" });
              } else if (selected == 1) {
                await this.setState({ collection: "b1-2" });
              }
            } else if (value.label.includes("B2")) {
              if (selected == 0) {
                await this.setState({ collection: "b2-1" });
              } else if (selected == 1) {
                await this.setState({ collection: "b2-2" });
              }
            }
          }
          this.fetchOptions(3);
        }
        break;
      case "4":
        {
          this.setState({ o5_disabled: false });
          if (this.state.section == "a") {
            if (value.label.includes("A1-1")) {
              if (selected == 0) {
                await this.setState({ collection: "a1-1-1" });
              } else if (selected == 1) {
                await this.setState({ collection: "a1-1-2" });
              }
            } else if (value.label.includes("A1-2")) {
              if (selected == 0) {
                await this.setState({ collection: "a1-2-1" });
              } else if (selected == 1) {
                await this.setState({ collection: "a1-2-2" });
              }
            } else if (value.label.includes("A2-1")) {
              if (selected == 0) {
                await this.setState({ collection: "a2-1-1" });
              } else if (selected == 1) {
                await this.setState({ collection: "a2-1-2" });
              }
            } else if (value.label.includes("A2-2")) {
              if (selected == 0) {
                await this.setState({ collection: "a2-2-1" });
              } else if (selected == 1) {
                await this.setState({ collection: "a2-2-2" });
              }
            }
          } else if (this.state.section == "b") {
            if (value.label.includes("B1-1")) {
              if (selected == 0) {
                await this.setState({ collection: "b1-1-1" });
              } else if (selected == 1) {
                await this.setState({ collection: "b1-1-2" });
              }
            } else if (value.label.includes("B1-2")) {
              if (selected == 0) {
                await this.setState({ collection: "b1-2-1" });
              } else if (selected == 1) {
                await this.setState({ collection: "b1-2-2" });
              }
            } else if (value.label.includes("B2-1")) {
              if (selected == 0) {
                await this.setState({ collection: "b2-1-1" });
              } else if (selected == 1) {
                await this.setState({ collection: "b2-1-2" });
              }
            } else if (value.label.includes("B2-2")) {
              if (selected == 0) {
                await this.setState({ collection: "b2-2-1" });
              } else if (selected == 1) {
                await this.setState({ collection: "b2-2-2" });
              }
            }
          }
          this.fetchOptions(4);
        }
        break;
      case "5":
        this.setState({ reset: true });
    }
  }


  // ================================= Fetch Initial Select Data Method ================================= 
  async fetchData() {
    const db = firebase.firestore();
    var options, initial_options;
    options = await db
      .collection("categories")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          initial_options = doc.data();
        });
      })
      .then(() => {
        return initial_options;
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    return options;
  }
  async componentDidMount() {
    var result = await this.fetchData();

    let counter = 0;
    var options = Object.entries(result)
      .sort()
      .map(([key, value]) => {
        this.setState({
          options: this.state.options.concat({
            value: counter,
            label: value,
          }),
        });
        counter = counter + 1;
      });
  }


  // ================================= Handle Reset Method ================================= 
  handleReset = () => {
    this.setState({
      section: "",
      collection: "",
      options_2: [],
      o2_disabled: true,
      options_3: [],
      o3_disabled: true,
      options_4: [],
      o4_disabled: true,
      options_5: [],
      o5_disabled: true,
      reset: false,
    })
  }


  // ================================= Render Method ================================= 
  render() {
    return (
      <Fragment>
        <div style={{ margin: "20px" }}>
          <Select
            value={this.state.options.value}
            options={this.state.options}
            onChange={(value) => this.whichOptions(value, "1")}
          />
        </div>
        {this.state.o2_disabled ? null : (
          <div style={{ margin: "20px" }}>
            <Select
              value={this.state.options_2.value}
              options={this.state.options_2}
              isDisabled={this.state.o2_disabled}
              onChange={(value) => this.whichOptions(value, "2")}
            />
          </div>
        )}
        {this.state.o3_disabled ? null : (
          <div style={{ margin: "20px" }}>
            <Select
              value={this.state.options_3.value}
              options={this.state.options_3}
              isDisabled={this.state.o3_disabled}
              onChange={(value) => this.whichOptions(value, "3")}
            />
          </div>
        )}
        {this.state.o4_disabled ? null : (
          <div style={{ margin: "20px" }}>
            <Select
              value={this.state.options_4.value}
              options={this.state.options_4}
              isDisabled={this.state.o4_disabled}
              onChange={(value) => this.whichOptions(value, "4")}
            />
          </div>
        )}
        {this.state.o5_disabled ? null : (
          <div style={{ margin: "20px" }}>
            <Select
              value={this.state.options_5.value}
              options={this.state.options_5}
              isDisabled={this.state.o5_disabled}
              onChange={(value) => this.whichOptions(value, "5")}
            />
          </div>
        )}

        {this.state.reset ? (
          <Button
            variant="danger"
            style={{ display: "flex", margin: "auto" }}
            onClick={this.handleReset}
          >
            Reset
          </Button>
        ) : null}
      </Fragment>
    );
  }
}
