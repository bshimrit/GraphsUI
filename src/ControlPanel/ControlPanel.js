import React, { Component } from "react";

import "./ControlPanel.css";

import { RadioGroup, RadioButton } from "react-radio-buttons";
import { CSSTransition } from "react-transition-group";

class ControlPanel extends Component {
  constructor() {
    super();
    this.state = {
      curValue: "",
      prevValue: "",
      valueChanged: false
    };
  }
  render() {
    return (
      <div className="control-panel">
        <div className="radio-group">
          <RadioGroup onChange={this.executeAction} vertical="true">
            {this.renderControlList()}
          </RadioGroup>
        </div>
        <CSSTransition
          in={this.state.valueChanged}
          timeout={0}
          classNames="description"
          onEntered={() => {
            this.state.valueChanged = false;
          }}
        >
          <div className="description">{this.renderDescription()}</div>
        </CSSTransition>
      </div>
    );
  }

  renderControlList() {
    var controlValues = Object.keys(this.props.controlList).map(
      controlKey => controlKey
    );
    return controlValues.map(function(controlKey) {
      return (
        <RadioButton key={controlKey} rootColor="#000" value={controlKey}>
          {controlKey.toUpperCase()}
        </RadioButton>
      );
    });
  }

  renderDescription() {
    if (!this.state.valueChanged)
      return this.props.controlList[this.state.curValue];
    else return this.props.controlList[this.state.prevValue];
  }

  executeAction = value => {
    this.state.valueChanged = true;
    this.prevValue = this.state.curValue;
    this.setState({ curValue: value });
    this.props.startAction(value);
  };
}

export default ControlPanel;
