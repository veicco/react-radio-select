import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux"
import {bindActionCreators} from "multireducer"
import RadioSelectContainer from "../RadioSelectContainer";
import * as actions from "./actions"


class RadioSelectContainerRedux extends RadioSelectContainer {

  // override state actions
  expand() {
    this.props.actions.expand();
  }
  collapse() {
    this.props.actions.collapse();
  }
  toggle() {
    this.props.actions.toggle();
  }
  focus() {
    this.props.actions.focus();
  }
  blur() {
    this.props.actions.blur();
  }
  highlightOption(index) {
    this.props.actions.highlightOption(index);
  }
  selectOption(index) {
    this.props.actions.selectOption(index);
  }
  selectNextOption(index) {
    this.props.actions.selectNextOption(index);
  }

  // override state getters
  getProps() {
    return this.props.ownProps;
  }
  getState() {
    return this.props;
  }
}

const mapStateToProps = (state, ownProps) => ({
  collapsed: state.radioSelect[ownProps.as].collapsed,
  focused: state.radioSelect[ownProps.as].focused,
  selectedOption: state.radioSelect[ownProps.as].selectedOption,
  highlightedOption: state.radioSelect[ownProps.as].highlightedOption,
  nextOption: state.radioSelect[ownProps.as].nextOption,
  ownProps
});


const mapDispatchToProps = (dispatch, {as}) => ({
  actions: bindActionCreators(actions, dispatch, as)
});

RadioSelectContainerRedux.propTypes = {
  // state to props
  collapsed: PropTypes.bool.isRequired,
  focused: PropTypes.bool.isRequired,
  selectedOption: PropTypes.number.isRequired,
  highlightedOption: PropTypes.number.isRequired,
  nextOption: PropTypes.number,

  // dispatch to props
  actions: PropTypes.shape({
    expand: PropTypes.func.isRequired,
    collapse: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    focus: PropTypes.func.isRequired,
    blur: PropTypes.func.isRequired,
    highlightOption: PropTypes.func.isRequired,
    selectOption: PropTypes.func.isRequired,
    selectNextOption: PropTypes.func.isRequired
  }).isRequired,

  // own props
  as: PropTypes.string.isRequired,
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
};

RadioSelectContainerRedux.defaultProps = {
  required: false,
  defaultOption: 0
};

export default connect(mapStateToProps, mapDispatchToProps)(RadioSelectContainerRedux);