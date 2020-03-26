import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./ResultCell.css";

export default class ResultCell extends PureComponent {
  static propTypes = {
    unicodeName: PropTypes.string,
    character: PropTypes.string,
    codePoint: PropTypes.string,
  };

  render() {
    return (
      <div
        className="component-emoji-result-row copy-to-clipboard"
        data-clipboard-text={this.props.character}
      >
        <div className="emoji">{this.props.character}
        <p className="title">{this.props.unicodeName}</p>
        <span className="tooltip-text-copy">Click to copy!</span>
        <span className="tooltip-text-copied">Copied!</span>
        </div>
      </div>
    );
  }
}