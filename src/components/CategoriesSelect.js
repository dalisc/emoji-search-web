import React, { PureComponent } from "react";
import Select from 'react-select';
import PropTypes from "prop-types";
import API from "../utils/API";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: 'black',
    backgroundColor: 'none',
    '&:hover': {
    backgroundColor: 'lightgray',
    }
  }),
  control: (base, state) => ({
    ...base,
    boxShadow: state.isFocused ? 0 : 0,
    color: state.isSelected? 0:0,
    borderColor: state.isFocused
      ? 'black'
      : 'lightgray',
    '&:hover': {
      borderColor: state.isFocused
        ? 'black'
        : 'lightgray',
    }
  })
};

export default class CategoriesSelect extends PureComponent {
  constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        categories: [
          { label: "All"}
        ]
      };
    }

    async componentDidMount() {
      console.log("Fecting all categories...\n");
  
      // Load all emojis.
      let response = await API.get('/categories?access_key=8d6cba56a989eb11e1fb6817896069881cdf6711');
      
      console.log(response);
  
      let categoriesList = response.data.map((category) => {
        return {
          label: category.slug
        }
      })

      categoriesList = categoriesList.sort((c1, c2) => {
        return c1.label < c2.label
          ? -1
          : c1. label > c2.label
            ? 1
            : 0;
      })

      var Allcategories = this.state.categories.concat(categoriesList); 
      const categories = Allcategories;
  
      this.setState({
        ...this.state, ...{
          categories: Allcategories,
          isLoading: false
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
          styles={customStyles}
          options={ this.state.categories } 
          onChange={this.handleChange}
          placeholder="Category"
          isClearable={true}
          isLoading={this.state.isLoading}
          isSearchable={false}/>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
    );
  }
}