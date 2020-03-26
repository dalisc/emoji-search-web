import React, { Component } from "react";
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Results from './Results';
import API from "../utils/API";
import BeatLoader from "react-spinners/BeatLoader";
import './App.css';
import CategoriesSelect from "../components/CategoriesSelect";
import axios from 'axios';
import {Helmet} from "react-helmet";


const API_KEY = process.env.OPEN_EMOJI_API_KEY;
var CancelToken = axios.CancelToken;
let cancel;

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
    document.title = 'Your page title here';

    // Load all emojis
    let response = await API.get('/emojis?&access_key=' + API_KEY);
    console.log(response);

    const filteredEmoji = response.data;

    this.setState({
      ...this.state, ...{
        isLoading: false,
        filteredEmoji
      }
    });
  }

  // Filter emojis when category is changed
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

    if (cancel != undefined) {
      cancel();

    }
    this.setState({
      isLoading: true,
    })

    if (event != undefined) {
      this.setState({
        query: event.target.value
      })
    }
    
    console.log("Searching for emojis...\n");
    API.get('/emojis?search=' + this.state.query + '&access_key=' + API_KEY, {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    })
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
      ). catch(function(thrown) {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message);
        }
      })
  };

  render() {

    const { isLoading, filteredEmoji } = this.state;
    return (
      <div className="App">
                    <Helmet>
                <meta charSet="utf-8" />
                <title>Emoji Search</title>
            </Helmet>
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
        
       {isLoading ? <div className="loader"><BeatLoader /></div> : <div className="results"><Results emojiData={filteredEmoji} /></div>}
        
      </div>
    );  
  }
}

export default App;