import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "./actions";


/* helper that compares two string arrays. returns true, if they are equal. */
const isEqual = (array1, array2) => array1.join('') === array2.join('');

class RadioSelect extends React.Component {

  dispatchChangeEvent(index) {
    const event = document.createEvent("HTMLEvents");
    event.initEvent("change", true, true);
    this[this.props.name + index].dispatchEvent(event);
    if (this.props.onChange) this.props.onChange(event, {index});
  }

  // event handlers
  handleBlur(e) {
    this.props.actions.blur();
    if (this.props.onBlur) this.props.onBlur(e);
  }

  handleChange(e, index) {
    this.props.actions.selectOption(index);
    this.props.actions.highlightOption(index);
    if (this.props.onChange) this.props.onChange(e, {index});
  }

  handleClick() {
    this.props.actions.collapse();
  }

  handleClickDocument(e) {
    if (this.radioSelect && !this.radioSelect.contains(e.target)) {
      this.props.actions.collapse();
    }
  }

  handleClickValue() {
    if (!this.props.focused) {
      this[this.props.name + this.props.selectedOption].focus();
    }
    this.props.actions.toggle();
  }

  handleFocus(e) {
    this.props.actions.focus();
    if (this.props.onFocus) this.props.onFocus(e);
  }

  handleKeyDown(e) {
    const key = e.keyCode;
    const { selectedOption } = this.props;
    switch (key) {
      case 9: // tab
        this.props.actions.collapse();
        break;
      case 13: { // enter
        e.preventDefault();
        this.props.actions.toggle();
        break;
      }
      case 27: // esc
        this.props.actions.collapse();
        break;
      case 32: // space
        this.props.actions.expand();
        break;
      case 38: // up
        if (selectedOption === 0) e.preventDefault();
        break;
      case 40: // down
        if (selectedOption === this.props.options.length - 1) e.preventDefault();
        break;
      default:
        return;
    }
  }

  handleMouseDown(e) {
    // prevent blur
    e.preventDefault();
    e.stopPropagation();
  }

  handleMouseEnter(index) {
    this.props.actions.highlightOption(index);
  }

  componentDidMount() {
    document.addEventListener("click", e => this.handleClickDocument(e));
  }

  componentWillUnmount() {
    document.removeEventListener("click", e => this.handleClickDocument(e));
  }

  componentDidUpdate(prevProps) {
    /* dispatch change event when option list changes */
    if (!isEqual(this.props.options.map(option => option.value), prevProps.options.map(option => option.value))) {
      document.querySelectorAll(`input[name=${this.props.name}]`).forEach((input, index) => { // todo: forEach => for loop
        if (input.checked) {
          this.props.actions.selectOption(index);
          this.dispatchChangeEvent(index);
        }
      });
    }
  }

  render() {
    const { name, options, required, defaultOption, onChange, onFocus, onBlur, className, ...otherProps } = this.props.ownProps;
    const { collapsed, selectedOption, highlightedOption, focused } = this.props;
    return (
      <div {...otherProps} ref={node => this.radioSelect = node} className={`radio-select ${focused ? 'focused ' : ' '}${className ? className : ''}`}>
        <div onClick={() => this.handleClickValue()} className="value">{options[selectedOption].component}</div>
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
                onBlur={e => this.handleBlur(e)}
                onChange={(e) => this.handleChange(e, key)}
                onFocus={(e) => this.handleFocus(e)}
                onKeyDown={e => this.handleKeyDown(e)}
              />
              <label htmlFor={name + key}
                     onClick={() => this.handleClick()}
                     onMouseDown={e => this.handleMouseDown(e)}
                     onMouseEnter={() => this.handleMouseEnter(key)}>
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
  collapsed: state.collapsed,
  focused: state.focused,
  selectedOption: state.selectedOption,
  highlightedOption: state.highlightedOption,
  ownProps
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

RadioSelect.propTypes = {
  // state to props
  collapsed: PropTypes.bool.isRequired,
  selectedOption: PropTypes.number.isRequired,
  highlightedOption: PropTypes.number.isRequired,
  focused: PropTypes.bool.isRequired,

  // map dispatch to props
  actions: PropTypes.shape({
    expand: PropTypes.func.isRequired,
    collapse: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    focus: PropTypes.func.isRequired,
    blur: PropTypes.func.isRequired,
    highlightOption: PropTypes.func.isRequired,
    selectOption: PropTypes.func.isRequired
  }).isRequired,

  // own props
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