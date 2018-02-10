

export const EXPAND = "@RadioSelectContainer/EXPAND";
export const COLLAPSE = "@RadioSelectContainer/COLLAPSE";
export const TOGGLE = "@RadioSelectContainer/TOGGLE";
export const FOCUS = "@RadioSelectContainer/FOCUS";
export const BLUR = "@RadioSelectContainer/BLUR";
export const HIGHLIGHT_OPTION = "@RadioSelectContainer/HIGHLIGHT_OPTION";
export const SELECT_OPTION = "@RadioSelectContainer/SELECT_OPTION";
export const SELECT_NEXT_OPTION = "@RadioSelectContainer/SELECT_NEXT_OPTION";


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

/*
This action stores a temporary state variable allowing to check if blur
needs to be prevented from the following events. This is the case if the
focus will keep within the widget (i.e. in any of the radio inputs).
*/
export const selectNextOption = (index) => ({
  type: SELECT_NEXT_OPTION,
  index
});