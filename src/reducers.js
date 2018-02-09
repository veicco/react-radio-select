import {
  EXPAND,
  COLLAPSE,
  TOGGLE,
  FOCUS,
  BLUR,
  HIGHLIGHT_OPTION,
  SELECT_OPTION
} from "./actions";

const reducer = (state = {
  collapsed: true,
  selectedOption: 0,
  highlightedOption: 0,
  focused: false
}, action) => {
  switch (action.type) {
    case EXPAND:
      return {
        ...state,
        collapsed: false
      }
    case COLLAPSE:
      return {
        ...state,
        collapsed: true
      }
    case TOGGLE:
      return {
        ...state,
        collapsed: !state.collapsed
      }
    case FOCUS:
      return {
        ...state,
        focused: true
      }
    case BLUR:
      return {
        ...state,
        focused: false
      }
    case HIGHLIGHT_OPTION:
      return {
        ...state,
        highlightedOption: action.index
      }
    case SELECT_OPTION:
      return {
        ...state,
        selectedOption: action.index
      }
    default:
      return state;
  }
}

export default reducer;
