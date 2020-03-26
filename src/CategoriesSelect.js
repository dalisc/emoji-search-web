import React, { PureComponent } from "react";
import Select from 'react-select';
import PropTypes from "prop-types";
import API from "./utils/API";

export default class CategoriesSelect extends PureComponent {
  constructor(props) {
      super(props);
      this.state = {
        categories: [
          { label: "All", value: 1 },
          { label: "travel-places", value: 2 },
          { label: "Netflix", value: 3 },
          { label: "Tesla", value: 4 },
          { label: "Amazon", value: 5 },
          { label: "Alphabet", value: 6 },
        ]
      };
    }

    async componentDidMount() {
      console.log("Fecting all categories...\n");
  
      // Load all emojis.
      let response = await API.get('/categories?access_key=8d6cba56a989eb11e1fb6817896069881cdf6711');
      
      console.log(response);
  
      let mappedResponseDadta = response.data.map((category) => {
        return {
          label: category.slug
        }
      })

      const categories = mappedResponseDadta;
  
      this.setState({
        ...this.state, ...{
          categories
        }
      });
    }

    static propTypes = {
      categoryChange: PropTypes.func
    };
  
    handleChange = selected => {
      this.props.categoryChange(selected);
    };

  render() {
    return (
      <div className="container">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <Select 
          options={ this.state.categories } 
          onChange={this.handleChange}/>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
    );
  }
}