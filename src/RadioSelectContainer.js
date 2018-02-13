import React from "react";
import RadioSelect from "./RadioSelectView";
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
    console.log("handleMouseDownLabel", index);
    this.selectNextOption(index);
  }

  handleClickLabel(e, index) {
    console.log("handleClickLabel", index);
    this.focusInput(index);
    this.selectOption(index);
    this.collapse();
  }

  handleBlurInput(e, index) {
    console.log("handleBlurInput", index);
    if (this.getState().nextOption === -1) {
      this.blur();
      if (this.props.onBlur) this.props.onBlur(e);
      this.collapse();
    }
  }

  handleFocusInput(e, index) {
    console.log("handleFocusInput", index);
    if (!this.props.focused) {
      this.focus();
      this.expand();
      if (this.props.onFocus) this.props.onFocus(e);
    }
  }

  handleChangeInput(e, index) {
    console.log("handleChangeInput", index);
    if (this.props.onChange) this.props.onChange(e, {index});
    setTimeout(() => { // change is fired before blur on IE
      this.selectOption(index);
    }, 20);
  }

  handleMouseDownValue(e) {
    console.log("handleMouseDownValue");
    this.selectNextOption(this.getState().selectedOption); // prevents blur
  }

  handleClickValue(e) {
    console.log("handleClickValue");
    if (!this.props.focused) this.focusInput(this.getState().selectedOption);
    this.selectOption(this.getState().selectedOption); // resets nextOption to allow blur again
    this.focusInput(this.getState().selectedOption);
    //this.toggle();

  }

  handleKeyDownInput(e) {
    console.log("handleKeyDownInput");
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
                        className={className}
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