import React, { PureComponent } from "react";
import Header from './Header';
import SearchBar from './SearchBar';
import Results from './Results';
import filter from "./filter";
import './App.css';

export default class App extends PureComponent {
    constructor(props) {
    super(props);
    this.state = {
      filteredEmoji: filter("", 20)
    };
  }

  handleSearchChange = event => {
    this.setState({
      filteredEmoji: filter(event.target.value, 20)
    });
  };

  render() {
    return (
    <div className="App">
      <Header />
      <SearchBar textChange={this.handleSearchChange} />
      <Results emojiData={this.state.filteredEmoji} />
    </div>
  );
    }
}

