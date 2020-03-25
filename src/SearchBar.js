import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import "./SearchBar.css";

export default class SearchBar extends PureComponent {
  static propTypes = {
    textChange: PropTypes.func
  };

  handleChange = event => {
    this.props.textChange(event);
  };

  render() {
    return (
      <div className="component-search-input">
        <div>
          <input onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}