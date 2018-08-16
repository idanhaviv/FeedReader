import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

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
      .then(res => this.setState({ data: JSON.stringify(res.data) }))
      .catch(e => console.log("e: ", e));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.data}</p>
      </div>
    );
  }
}

export default App;
