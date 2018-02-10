

export const EXPAND = "@RadioSelectRedux/EXPAND";
export const COLLAPSE = "@RadioSelectRedux/COLLAPSE";
export const TOGGLE = "@RadioSelectRedux/TOGGLE";
export const FOCUS = "@RadioSelectRedux/FOCUS";
export const BLUR = "@RadioSelectRedux/BLUR";
export const HIGHLIGHT_OPTION = "@RadioSelectRedux/HIGHLIGHT_OPTION";
export const SELECT_OPTION = "@RadioSelectRedux/SELECT_OPTION";
export const SELECT_NEXT_OPTION = "@RadioSelectRedux/SELECT_NEXT_OPTION";


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