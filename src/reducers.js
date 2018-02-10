import {combineReducers} from "redux";
import multireducer from "multireducer";

import {
  EXPAND,
  COLLAPSE,
  TOGGLE,
  FOCUS,
  BLUR,
  HIGHLIGHT_OPTION,
  SELECT_OPTION,
  SELECT_NEXT_OPTION
} from "./actions";

const radioSelectReducer = (state = {
  collapsed: true,
  selectedOption: 0,
  highlightedOption: 0,
  focused: false,
  nextOption: -1
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
        selectedOption: action.index,
        highlightedOption: action.index,
        nextOption: -1
      }
    case SELECT_NEXT_OPTION:
      return {
        ...state,
        nextOption: action.index
      }
    default:
      return state;
  }
}


const createReducer = ({as}) => {
  let combined = {};
  as.map(as => combined[as] = multireducer(radioSelectReducer, as));
  return combineReducers(combined);
}

export default createReducer;
