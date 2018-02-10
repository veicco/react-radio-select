import React from "react";
import PropTypes from "prop-types";
import RadioSelectContainer from "./RadioSelectContainer";
import {initialState} from "./initialState"


class RadioSelect extends RadioSelectContainer {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  // override state actions
  expand() {
    this.setState({collapsed: false});
  }
  collapse() {
    this.setState({collapsed: true});
  }
  toggle() {
    this.setState({collapsed: !this.state.collapsed});
  }
  focus() {
    this.setState({focused: true});
  }
  blur() {
    this.setState({focused: false});
  }
  highlightOption(index) {
    this.setState({highlightedOption: index});
  }
  selectOption(index) {
    this.setState({
      selectedOption: index,
      highlightedOption: index,
      nextOption: -1
    });
  }
  selectNextOption(index) {
    this.setState({
      nextOption: index
    });
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
      component: PropTypes.node.isRequired,
      text: PropTypes.string,
    })
  ).isRequired,
  required: PropTypes.bool.isRequired,
  defaultOption: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
}

RadioSelect.defaultProps = {
  required: false,
  defaultOption: 0
};

export default RadioSelect;