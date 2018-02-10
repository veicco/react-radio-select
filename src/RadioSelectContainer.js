import React from "react";
import RadioSelect from "./RadioSelect";
import {isEqual} from "./utils"


class RadioSelectContainer extends React.Component {

  // state actions
  expand() {}
  collapse() {}
  toggle() {}
  focus() {}
  blur() {}
  highlightOption(index) {}
  selectOption(index) {}
  selectNextOption(index) {}

  // getters
  getProps() {}
  getState() {}

  // internal actions
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
    this.selectNextOption(index);
  }

  handleClickLabel(e, index) {
    this.collapse();
  }

  handleBlurInput(e, index) {
    if (this.getState().nextOption === -1) {
      this.blur();
      if (this.props.onBlur) this.props.onBlur(e);
      this.collapse();
    }
  }

  handleFocusInput(e, index) {
    if (!this.props.focused) {
      this.focus();
      if (this.props.onFocus) this.props.onFocus(e);
    }
  }

  handleChangeInput(e, index) {
    this.selectOption(index);
    if (this.props.onChange) this.props.onChange(e, {index});
  }

  handleMouseDownValue(e) {
    this.selectNextOption(this.getState().selectedOption); // prevents blur
  }

  handleClickValue(e) {
    if (!this.props.focused) this.focusInput(this.getState().selectedOption);
    this.selectOption(this.getState().selectedOption); // resets nextOption to allow blur again
    this.focusInput(this.getState().selectedOption);
    this.toggle();
  }

  handleKeyDownInput(e) {
    const key = e.keyCode;
    const {selectedOption} = this.getState();
    switch (key) {
      case 13: { // enter
        e.preventDefault(); // prevent submitting form
        this.toggle();
        break;
      }
      case 27: // esc
        this.collapse();
        break;
      case 32: // space
        this.expand();
        break;
      case 38: { // up
        if (selectedOption === 0) {
          e.preventDefault()
        } else {
          this.selectNextOption(selectedOption - 1);
        }
        break;
      }
      case 40: { // down
        if (selectedOption === this.props.options.length - 1) {
          e.preventDefault();
        } else {
          this.selectNextOption(selectedOption + 1);
        }
        break;
      }
      default:
        return;
    }
  }

  handleMouseEnterLabel(e, index) {
    this.highlightOption(index);
  }

  componentDidMount() {
    this.selectOption(this.props.defaultOption);
  }

  componentDidUpdate(prevProps) {
    /* dispatch change event when option list changes */
    if (!isEqual(this.props.options.map(option => option.value), prevProps.options.map(option => option.value))) {
      const inputs = document.querySelectorAll(`input[name=${this.props.name}]`);
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
          this.selectOption(i);
          this.dispatchChangeEvent(i);
        }
      }
    }
  }

  render() {
    const { name, options, required, defaultOption, onChange, onFocus, onBlur, className, ...otherProps } = this.getProps();
    const { collapsed, selectedOption, highlightedOption, focused } = this.getState();

    return <RadioSelect inputRef={(radio, key) => this[name + key] = radio}
                        name={name}
                        selectedOption={selectedOption}
                        collapsed={collapsed}
                        focused={focused}
                        required={required}
                        highlightedOption={highlightedOption}
                        options={options}
                        handleBlurInput={(e, key) => this.handleBlurInput(e, key)}
                        handleChangeInput={(e, key) => this.handleChangeInput(e, key)}
                        handleClickLabel={(e, key) => this.handleClickLabel(e, key)}
                        handleClickValue={(e) => this.handleClickValue(e)}
                        handleFocusInput={(e, key) => this.handleFocusInput(e, key)}
                        handleKeyDownInput={(e) => this.handleKeyDownInput(e)}
                        handleMouseDownLabel={(e) => this.handleMouseDownLabel(e)}
                        handleMouseDownValue={(e) => this.handleMouseDownValue(e)}
                        handleMouseEnterLabel={(e, key) => this.handleMouseEnterLabel(e, key)}
                        otherProps={otherProps}/>
  }

}

export default RadioSelectContainer;