import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Clipboard from "clipboard";

import ResultCell from "./ResultCell";
import "./Results.css";

export default class Results extends PureComponent {
  static propTypes = {
    emojiData: PropTypes.array
  };

  componentDidMount() {
    this.clipboard = new Clipboard(".copy-to-clipboard");
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    return (
      <div class="grid-container">
        {this.props.emojiData.map(emojiData => (
            <div class="grid-item">
          <ResultCell
            key={emojiData.unicodeName}
            character={emojiData.character}
            unicodeName={emojiData.unicodeName}
            codePoint={emojiData.codePoint}
          />
          
          </div>
        ))}
      </div>
    );
  }
}