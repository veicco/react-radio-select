

export const EXPAND = "@RadioSelect/EXPAND";
export const COLLAPSE = "@RadioSelect/COLLAPSE";
export const TOGGLE = "@RadioSelect/TOGGLE";
export const FOCUS = "@RadioSelect/FOCUS";
export const BLUR = "@RadioSelect/BLUR";
export const HIGHLIGHT_OPTION = "@RadioSelect/HIGHLIGHT_OPTION";
export const SELECT_OPTION = "@RadioSelect/SELECT_OPTION";


export const expand = () => ({
  type: EXPAND
});

export const collapse = () => ({
  type: COLLAPSE
});

export const toggle = () => ({
  type: TOGGLE
})

export const focus = () => ({
  type: FOCUS
});

export const blur = () => ({
  type: BLUR
});

export const highlightOption = (index) => ({
  type: HIGHLIGHT_OPTION,
  index
});

export const selectOption = (index) => ({
  type: SELECT_OPTION,
  index
});