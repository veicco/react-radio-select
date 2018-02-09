

export const EXPAND = "@RadioSelect/EXPAND";
export const COLLAPSE = "@RadioSelect/COLLAPSE";
export const TOGGLE = "@RadioSelect/TOGGLE";
export const FOCUS = "@RadioSelect/FOCUS";
export const BLUR = "@RadioSelect/BLUR";
export const HIGHLIGHT_OPTION = "@RadioSelect/HIGHLIGHT_OPTION";
export const SELECT_OPTION = "@RadioSelect/SELECT_OPTION";
export const SELECT_NEXT_OPTION = "@RadioSelect/SELECT_NEXT_OPTION";


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