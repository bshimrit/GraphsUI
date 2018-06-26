import React, { Component } from "react";
import { RadioGroup, RadioButton } from "react-radio-buttons";

class ControlPanel extends Component {
  render() {
    return (
      <div className="control-panel">
        <RadioGroup onChange={this.executeTraverse} horizontal>
          <RadioButton rootColor="#000" value="bfs">
            BFS
          </RadioButton>
          <RadioButton rootColor="#000" value="dfs">
            DFS
          </RadioButton>
        </RadioGroup>
      </div>
    );
  }

  executeTraverse = value => {
    this.props.startTraverse(value);
  };
}

export default ControlPanel;
