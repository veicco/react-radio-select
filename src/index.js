import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./style.scss";

class RadioSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      selectedOption: 0,
      focused: false
    }
  }

  // actions
  collapse() {
    this.setState({collapsed: true});
  }

  expand() {
    this.setState({collapsed: false});
  }

  toggle() {
    this.state.collapsed ? this.expand() : this.collapse();
  }

  // event handlers
  handleBlur(e) {
    if (e.relatedTarget) {
      if (e.relatedTarget.name && e.relatedTarget.name === this.props.name) return;
      this.setState({focused: false});
      this.collapse();
      if (this.props.onBlur) this.props.onBlur();
    }
  }

  handleChange(index) {
    this.setState({selectedOption: index});
  }

  handleClick() {
    this.collapse();
  }

  handleClickDocument(e) {
    if (!this.radioSelect.contains(e.target)) {
      this.collapse();
      this.setState({focused: false});
    }
  }

  handleClickValue() {
    this[this.props.name + this.state.selectedOption].focus();
    this.toggle();
  }

  handleFocus() {
    this.setState({focused: true});
    if (this.props.onFocus) this.props.onFocus();
  }

  handleKeyDown(e) {
    const key = e.keyCode;
    const { selectedOption } = this.state;
    switch (key) {
      case 13: // enter
        this.toggle();
        break;
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

  componentDidMount() {
    document.addEventListener("click", e => this.handleClickDocument(e));
  }

  render() {
    const { options, name } = this.props;
    const { collapsed, selectedOption, focused } = this.state;
    return (
      <div ref={node => this.radioSelect = node} className={`radio-select ${focused ? 'focused' : ''}`}>
        <div onClick={() => this.handleClickValue()} className="value">{options[selectedOption].component}</div>
        <div className={`option-list ${collapsed ? 'collapsed' : ''}`}>
          {options.map((option, key) => (
            <Fragment key={key}>
              <input
                ref={radio => this[name + key] = radio}
                type="radio"
                name={name}
                id={name + key}
                value={option.value}
                onBlur={e => this.handleBlur(e)}
                onChange={() => this.handleChange(key)}
                onFocus={() => this.handleFocus()}
                onKeyDown={e => this.handleKeyDown(e)}
              />
              <label htmlFor={name + key} onClick={() => this.handleClick()}>
                <div className="option">
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
  required: PropTypes.bool,
  defaultIndex: PropTypes.number, // index of the default option
  /* optional event handlers, called after internal handlers */
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};


export default RadioSelect;
