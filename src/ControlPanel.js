import React, { Component } from "react";
import { Form, Select } from "react-form";

class ControlPanel extends Component {
  constructor() {
    super();
    this.algorithmOptions = [
      {
        label: "BFS",
        value: "bfs"
      },
      {
        label: "DFS",
        value: "dfs"
      }
    ];
  }
  render() {
    return (
      <div>
        <h1>Choose a starting node and traversing algorithm</h1>
        <Form
          onSubmit={submittedValues =>
            this.executeTraverse({ submittedValues })
          }
        >
          {formApi => (
            <form onSubmit={formApi.submitForm} id="text-input-form">
              <div className="subject">
                <label htmlFor="algorithm" />
                <Select
                  field="algorithm"
                  id="select-input-algorithm"
                  options={this.algorithmOptions}
                />
              </div>
              <div className="submit">
                <input type="submit" value="Execute" id="form_button" />
              </div>
            </form>
          )}
        </Form>
      </div>
    );
  }

  executeTraverse = submittedValues => {
    this.props.startTraverse(submittedValues.submittedValues.algorithm);
  };
}

export default ControlPanel;
