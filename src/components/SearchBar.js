import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './SearchBar.css';

export default class SearchBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
    }

    static propTypes = {
        textChange: PropTypes.func,
    };

    handleChange = (event) => {
        this.props.textChange(event);
    };

    render() {
        return ( <
            div className = "component-search-input" >
            <
            div >
            <
            input placeholder = "Search for your emoji..."
            onChange = {
                (event) => this.handleChange(event) }
            onKeyPress = {
                (event) => {
                    if (event.key === 'Enter') {
                        this.handleChange(event);
                    }
                }
            }
            /> <
            /div> <
            /div>
        );
    }
}