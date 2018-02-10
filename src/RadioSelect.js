import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "multireducer";
import * as actions from "./actions";
import {isEqual} from "./utils";


class RadioSelect extends React.Component {

  dispatchChangeEvent(index) {
    const event = document.createEvent("HTMLEvents");
    event.initEvent("change", true, true);
    this[this.props.name + index].dispatchEvent(event);
    if (this.props.onChange) this.props.onChange(event, {index});
  }

  focusInput(index) {
    this[this.props.name + index].focus();
  }

  // event handlers
  handleMouseDownLabel(e, index) {
    this.props.actions.selectNextOption(index);
  }

  handleClickLabel(e, index) {
    this.props.actions.collapse();
  }

  handleBlurInput(e, index) {
    if (this.props.nextOption === -1) {
      this.props.actions.blur();
      if (this.props.onBlur) this.props.onBlur(e);
      this.props.actions.collapse();
    }
  }

  handleFocusInput(e, index) {
    if (!this.props.focused) {
      this.props.actions.focus();
      if (this.props.onFocus) this.props.onFocus(e);
    }
  }

  handleChangeInput(e, index) {
    this.props.actions.selectOption(index);
    if (this.props.onChange) this.props.onChange(e, {index});
  }

  handleMouseDownValue(e) {
    this.props.actions.selectNextOption(this.props.selectedOption); // prevents blur
  }

  handleClickValue(e) {
    if (!this.props.focused) this.focusInput(this.props.selectedOption);
    this.props.actions.selectOption(this.props.selectedOption); // resets nextOption to allow blur again
    this.focusInput(this.props.selectedOption);
    this.props.actions.toggle();
  }

  handleKeyDownInput(e) {
    const key = e.keyCode;
    const {selectedOption} = this.props;
    switch (key) {
      case 13: { // enter
        e.preventDefault(); // prevent submitting form
        this.props.actions.toggle();
        break;
      }
      case 27: // esc
        this.props.actions.collapse();
        break;
      case 32: // space
        this.props.actions.expand();
        break;
      case 38: { // up
        if (selectedOption === 0) {
          e.preventDefault()
        } else {
          this.props.actions.selectNextOption(this.props.selectedOption - 1);
        }
        break;
      }
      case 40: { // down
        if (selectedOption === this.props.options.length - 1) {
          e.preventDefault();
        } else {
        this.props.actions.selectNextOption(this.props.selectedOption + 1);
        }
        break;
      }
      default:
        return;
    }
  }

  handleMouseEnterLabel(e, index) {
    this.props.actions.highlightOption(index);
  }

  componentDidMount() {
    this.props.actions.selectOption(this.props.defaultOption);
  }

  componentDidUpdate(prevProps) {
    /* dispatch change event when option list changes */
    if (!isEqual(this.props.options.map(option => option.value), prevProps.options.map(option => option.value))) {
      const inputs = document.querySelectorAll(`input[name=${this.props.name}]`);
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
          this.props.actions.selectOption(i);
          this.dispatchChangeEvent(i);
        }
      }
    }
  }

  render() {
    const { name, options, required, defaultOption, onChange, onFocus, onBlur, className, ...otherProps } = this.props.ownProps;
    const { collapsed, selectedOption, highlightedOption, focused } = this.props;
    return (
      <div {...otherProps}
           className={`radio-select ${focused ? 'focused ' : ' '}${className ? className : ''}`}
        >
        <div className="value"
             onMouseDown={e => this.handleMouseDownValue(e)}
             onClick={e => this.handleClickValue(e)}
        >
          {options[selectedOption].component}
        </div>
        <div className={`option-list ${collapsed ? 'collapsed' : ''}`}>
          {options.map((option, key) => (
            <div key={key}>
              <input
                ref={radio => this[name + key] = radio}
                type="radio"
                required={required}
                checked={selectedOption === key}
                name={name}
                id={name + key}
                value={option.value}
                onBlur={e => this.handleBlurInput(e, key)}
                onChange={e => this.handleChangeInput(e, key)}
                onFocus={e => this.handleFocusInput(e, key)}
                onKeyDown={e => this.handleKeyDownInput(e)}
              />
              <label htmlFor={name + key}
                     onMouseDown={e => this.handleMouseDownLabel(e, key)}
                     onClick={e => this.handleClickLabel(e, key)}
                     onMouseEnter={e => this.handleMouseEnterLabel(e, key)}>
                <div className={`option${highlightedOption === key ? ' highlight' : ''}${selectedOption === key ? ' selected' : ''}`}>
                  {option.component}
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => ({
  collapsed: state.radioSelect[ownProps.name].collapsed,
  focused: state.radioSelect[ownProps.name].focused,
  selectedOption: state.radioSelect[ownProps.name].selectedOption,
  highlightedOption: state.radioSelect[ownProps.name].highlightedOption,
  nextOption: state.radioSelect[ownProps.name].nextOption,
  ownProps
});

const mapDispatchToProps = (dispatch, {as}) => ({
  actions: bindActionCreators(actions, dispatch, as)
});

RadioSelect.propTypes = {
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

RadioSelect.defaultProps = {
  required: false,
  defaultOption: 0
};

export default connect(mapStateToProps, mapDispatchToProps)(RadioSelect);