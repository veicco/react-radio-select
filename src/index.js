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
  handleBlur() {
    this.setState({focused: false});
  }

  handleChange(index) {
    this.setState({selectedOption: index});
  }

  handleClickValue() {
    this[this.props.name + this.state.selectedOption].focus();
    this.toggle();
  }

  handleClickDocument(e) {
    if (this.optionList.contains(e.target)) {
      //this.collapse();
    }
  }

  handleFocus() {
    this.setState({focused: true});
  }

  handleKeyDown(e) {
    const key = e.keyCode;
    switch (key) {
      case 13: // enter
        this.toggle();
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
      <div className={`radio-select ${focused ? 'focused' : ''}`}>
        <div onClick={() => this.handleClickValue()} className="value">{options[selectedOption].component}</div>
        <div ref={node => this.optionList = node} className={`option-list ${collapsed ? 'collapsed' : ''}`}>
          {options.map((option, key) => (
            <Fragment key={key}>
              <input
                ref={radio => this[name + key] = radio}
                type="radio"
                name={name}
                id={name + key}
                value={option.value}
                onBlur={() => this.handleBlur()}
                onChange={() => this.handleChange(key)}
                onFocus={() => this.handleFocus()}
                onKeyDown={e => this.handleKeyDown(e)}
              />
              <label htmlFor={name + key}>
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
