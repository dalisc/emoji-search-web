import React, { Component } from "react";
import Header from './Header';
import SearchBar from './SearchBar';
import Results from './Results';
import API from "./utils/API";
import ClipLoader from "react-spinners/BeatLoader";
import './App.css';
import CategoriesSelect from "./CategoriesSelect";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      category: 'All',
      isLoading: true,
      filteredEmoji: []
    };
  }

  async componentDidMount() {
    console.log("Fecting all emojis...\n");

    // Load all emojis.
    let response = await API.get('/emojis?&access_key=8d6cba56a989eb11e1fb6817896069881cdf6711');
    
    console.log(response);

    const filteredEmoji = response.data;

    this.setState({
      ...this.state, ...{
        isLoading: false,
        filteredEmoji
      }
    });
  }

  setCategory = selected => {
    var category;
    if (selected == null) {
      category = 'All';
    } else {
      category = selected.label;
    }
    this.setState({category: category});
    this.handleSearchChange();
  }

  handleSearchChange = event => {
    // Start the loading spinner
    this.setState({
      isLoading: true,
    })

    if (event != undefined) {
      this.setState({
        query: event.target.value
      })
    }
    
    console.log("Searching for emojis...\n");
    API.get('/emojis?search=' + this.state.query + '&access_key=8d6cba56a989eb11e1fb6817896069881cdf6711')
      .then(response => {
        if (response.data == null) {
          this.setState({ 
            isLoading: false,
            filteredEmoji: []}, () => 
            console.log(response))
        } else {
          this.setState({ 
            isLoading: false,
            filteredEmoji: this.state.category == 'All'? response.data : response.data.filter((data) => data.group.includes(this.state.category))}, () => 
            console.log(response))
          }
        }
      )
  };

  render() {

    const { isLoading, filteredEmoji } = this.state;
    return (
      <div className="App">
        <div className="header">
        <Header />
        </div>
        <div className="search">
        <div className="searchbox">
        <SearchBar 
          textChange={this.handleSearchChange}/>
        </div>
        <div className="category">
        <CategoriesSelect 
          categoryChange={this.setCategory}/>
        </div>
        </div>
        <div className="results">
          {isLoading ? <div className="loader"><ClipLoader /></div> : <Results emojiData={filteredEmoji} />}
        </div>
      </div>
    );  
  }
}

export default App;