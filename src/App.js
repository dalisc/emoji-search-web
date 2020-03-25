import React, { Component } from "react";
import Header from './Header';
import SearchBar from './SearchBar';
import Results from './Results';
import API from "./utils/API";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      searchWords: "",
      filteredEmoji: []
    };
  }

  async componentDidMount() {
    // Load all emojis.
    let response = await API.get('/emojis?&access_key=8d6cba56a989eb11e1fb6817896069881cdf6711');

    console.log("Executed API filter\n");
    console.log(response);

    const filteredEmoji = response.data;

    this.setState({
      ...this.state, ...{
        isLoading: false,
        filteredEmoji
      }
    });
  }

  handleSearchChange = event => {
    // this.setState({
    //   searchWords: event.target.value,
    // });

    console.log("event target value is " + event.target.value);
    
    API.get('/emojis?search=' + event.target.value + '&access_key=8d6cba56a989eb11e1fb6817896069881cdf6711')
      .then(response => {
        if (response.data == null) {
          this.setState({ 
            isLoading: false,
            filteredEmoji: []}, () => 
            console.log(response))
        } else {
          this.setState({ 
            isLoading: false,
            filteredEmoji: response.data}, () => 
            console.log(response))
          }
        }
      )
  };


  // searchEmojis = () => {
  //   try {
  //     return axios.get('/emojis?search=' + this.state.searchWords + '&access_key=8d6cba56a989eb11e1fb6817896069881cdf6711')
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  

  render() {

    const { isLoading, filteredEmoji } = this.state;

    return (
      <div className="App">
        <Header />
        <SearchBar textChange={this.handleSearchChange} />
        <Results emojiData={filteredEmoji} />
      </div>
    );  
  }
}

export default App;