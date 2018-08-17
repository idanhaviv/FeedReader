import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import axios from "axios";
import FeedItem from "./components/FeedItem";

const apiService = axios.create({
  baseURL: "http://localhost:8080/api/"
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
    this.state = { data: [], searchTerm: "@linabeau" };
  }

  search(searchTerm) {
    console.log("searchTerm: ", searchTerm);
    apiService
      .get(searchTerm)
      .then(res =>
        this.setState({
          data: res.data
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
          onChange={e => this.setState({ searchTerm: e.target.value })}
          margin="normal"
          defaultValue="@linabeau"
          InputLabelProps={{ required: true }}
        />
        <Button
          variant="contained"
          color="primary"
          className={"classes.button"}
          onClick={() => this.search(this.state.searchTerm)}
        >
          Primary
        </Button>
        {this.state.data.map(item => (
          <FeedItem title={item.title[0]} />
        ))}
      </div>
    );
  }
}

export default App;
