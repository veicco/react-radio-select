import React from "react";
import PropTypes from "prop-types";


const RadioSelectView = ({
                       name,
                       options,
                       required,
                       className,
                       collapsed,
                       selectedOption,
                       highlightedOption,
                       focused,
                       inputRef,
                       handleMouseDownValue,
                       handleClickValue,
                       handleBlurInput,
                       handleChangeInput,
                       handleFocusInput,
                       handleKeyDownInput,
                       handleMouseDownLabel,
                       handleClickLabel,
                       handleMouseEnterLabel,
                       otherProps
}) => {
  return (
    <div {...otherProps}
         className={`radio-select ${focused ? 'focused ' : ' '}${className ? className : ''}`}
    >
      <div className="value"
           onMouseDown={e => handleMouseDownValue(e)}
           onClick={e => handleClickValue(e)}
      >
        {options[selectedOption].component}
      </div>
      <div className={`option-list ${collapsed ? 'collapsed' : ''}`}>
        {options.map((option, key) => (
          <div key={key}>
            <input
              ref={radio => inputRef(radio, key)}
              type="radio"
              required={required}
              checked={selectedOption === key}
              name={name}
              id={name + key}
              value={option.value}
              onBlur={e => handleBlurInput(e, key)}
              onChange={e => handleChangeInput(e, key)}
              onFocus={e => handleFocusInput(e, key)}
              onKeyDown={e => handleKeyDownInput(e)}
            />
            <label htmlFor={name + key}
                   onMouseDown={e => handleMouseDownLabel(e, key)}
                   onClick={e => handleClickLabel(e, key)}
                   onMouseEnter={e => handleMouseEnterLabel(e, key)}>
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

RadioSelectView.propTypes = {
  // state to props
  collapsed: PropTypes.bool.isRequired,
  focused: PropTypes.bool.isRequired,
  selectedOption: PropTypes.number.isRequired,
  highlightedOption: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      component: PropTypes.node.isRequired,
      text: PropTypes.string,
    })
  ).isRequired,
  required: PropTypes.bool.isRequired,
  inputRef: PropTypes.func.isRequired,
  handleMouseDownValue: PropTypes.func.isRequired,
  handleClickValue: PropTypes.func.isRequired,
  handleBlurInput: PropTypes.func.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handleFocusInput: PropTypes.func.isRequired,
  handleKeyDownInput: PropTypes.func.isRequired,
  handleMouseDownLabel: PropTypes.func.isRequired,
  handleClickLabel: PropTypes.func.isRequired,
  handleMouseEnterLabel: PropTypes.func.isRequired,
  otherProps: PropTypes.object
};

RadioSelectView.defaultProps = {
  required: false
};

export default RadioSelectView;