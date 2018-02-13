import React from "react";
import PropTypes from "prop-types";
import RadioSelectContainer from "./RadioSelectContainer";
import {initialState} from "./initialState"
import {log} from "./utils";


class RadioSelect extends RadioSelectContainer {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  // override state actions
  expand() {
    this.setState({collapsed: false});
    log("expand", this.state);
  }
  collapse() {
    this.setState({collapsed: true});
    log("collapse", this.state);
  }
  toggle() {
    this.setState({collapsed: !this.state.collapsed});
    log("toggle", this.state);
  }
  focus() {
    this.setState({focused: true});
    log("focus", this.state);
  }
  blur() {
    this.setState({focused: false});
    log("blur", this.state);
  }
  highlightOption(index) {
    this.setState({highlightedOption: index});
    log("highlightOption", this.state);
  }
  selectOption(index) {
    this.setState({
      selectedOption: index,
      highlightedOption: index,
      nextOption: -1
    });
    log("selectOption", this.state);
  }
  selectNextOption(index) {
    this.setState({
      nextOption: index
    });
    log("selectNextOption", this.state);
  }

  // override state getters
  getProps() {
    return this.props;
  }
  getState() {
    return this.state;
  }
}

RadioSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      component: PropTypes.node.isRequired
    })
  ).isRequired,
  required: PropTypes.bool.isRequired,
  defaultOption: PropTypes.number.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
}

RadioSelect.defaultProps = {
  required: false,
  defaultOption: 0
};

export default RadioSelect;