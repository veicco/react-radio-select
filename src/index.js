import React, { Fragment } from "react";
import PropTypes from "prop-types";

/* helper that compares two string arrays. returns true, if they are equal. */
const isEqual = (array1, array2) => array1.join('') === array2.join('');

class RadioSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      selectedOption: props.defaultOption,
      highlightedOption: props.defaultOption,
      focused: false
    }
  }

  // actions
  collapse() {
    this.setState({collapsed: true, highlightedOption: this.state.selectedOption});
  }

  dispatchChangeEvent(index) {
    const event = document.createEvent("HTMLEvents");
    event.initEvent("change", true, true);
    this[this.props.name + index].dispatchEvent(event);
    if (this.props.onChange) this.props.onChange(event, {index});
  }

  expand() {
    this.setState({collapsed: false});
  }

  toggle() {
    this.state.collapsed ? this.expand() : this.collapse();
  }

  // event handlers
  handleBlur(e) {
    this.setState({focused: false});
    if (this.props.onBlur) this.props.onBlur(e);
  }

  handleChange(e, index) {
    this.setState({selectedOption: index, highlightedOption: index});
    if (this.props.onChange) this.props.onChange(e, {index});
  }

  handleClick() {
    this.collapse();
  }

  handleClickDocument(e) {
    if (this.radioSelect && !this.radioSelect.contains(e.target)) {
      this.collapse();
    }
  }

  handleClickValue() {
    if (!this.state.focused) {
      this[this.props.name + this.state.selectedOption].focus();
    }
    this.toggle();
  }

  handleFocus(e) {
    this.setState({focused: true});
    if (this.props.onFocus) this.props.onFocus(e);
  }

  handleKeyDown(e) {
    const key = e.keyCode;
    const { selectedOption } = this.state;
    switch (key) {
      case 9: // tab
        this.collapse();
        break;
      case 13: { // enter
        e.preventDefault();
        this.toggle();
        break;
      }
      case 27: // esc
        this.collapse();
        break;
      case 32: // space
        this.expand();
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
    this.setState({highlightedOption: index});
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
      document.querySelectorAll(`input[name=${this.props.name}]`).forEach((input, index) => {
        if (input.checked) {
          this.setState({selectedOption: index});
          this.dispatchChangeEvent(index);
        }
      });
    }
  }

  render() {
    const { name, options, required, defaultOption, onChange, onFocus, onBlur, className, ...otherProps } = this.props;
    const { collapsed, selectedOption, highlightedOption, focused } = this.state;
    return (
      <div {...otherProps} ref={node => this.radioSelect = node} className={`radio-select ${focused ? 'focused ' : ' '}${className ? className : ''}`}>
        <div onClick={() => this.handleClickValue()} className="value">{options[selectedOption].component}</div>
        <div className={`option-list ${collapsed ? 'collapsed' : ''}`}>
          {options.map((option, key) => (
            <Fragment key={key}>
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
            </Fragment>
          ))}
        </div>
      </div>
    )
  }

}

RadioSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      component: PropTypes.node.isRequired
    })
  ).isRequired,
  required: PropTypes.bool.isRequired,
  defaultOption: PropTypes.number.isRequired,

  /* optional event handlers, called after internal handlers */
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

RadioSelect.defaultProps = {
  required: false,
  defaultOption: 0
};

export default RadioSelect;