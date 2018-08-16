import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import axios from "axios";

const apiService = axios.create({
  baseURL: "http://localhost:8080/api"
});

// apiService
//   .get()
//   .then(res => console.log("res: ", res.data))
//   .catch(e => console.log("e: ", e));

// const getFeed = async path => {
//   const res = await apiService.get();
//   if (!res || !res.data) {
//     throw new Error("unexpected result for fetch question");
//   }
//   return res.data;
// };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: "" };
  }

  componentDidMount() {
    apiService
      .get()
      .then(res =>
        this.setState({
          data: res.data.map(item => item.title[0])
        })
      )
      .catch(e => console.log("e: ", e));
  }

  render() {
    return (
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <TextField
          id="name"
          label="Feed Name"
          className={"abc"}
          value={this.state.name}
          onChange={() => console.log("ads")}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          className={"classes.button"}
        >
          Primary
        </Button>
        <p className="App-intro">{this.state.data}</p>
      </div>
    );
  }
}

export default App;
