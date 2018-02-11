# React Radio Select

Accessible dropdown widget for React. Visually the component functions as a native html select with customizable option elements. Screen readers however treat it as a radio button group in order to persist native form events for the screen readers.


## Installation
``` 
npm install react-radio-select  
```

## How to use
### Basic example

#### Step 1: Define the options list
```js
const Option = ({title, price}) => (
  <div>
    <div>{title}</div>
    <div>{price}</div>
  </div>
)

// the options must be an array of objects with keys 
// "value" (string) and "component" (node)
const options = [
  {
    value: "1001",
    component: <Option title="Espresso" price="1.50 €"/>
  },
  {
    value: "1002",
    component: <Option title="Cappuccino" price="2.00 €"/>
  },
  {
    value: "1003",
    component: <Option title="Flat white" price="2.20 €"/>
  }
]

```

#### Step 2: Use `<RadioSelect>` in your app

```js
import { RadioSelect } from 'react-radio-select'

...

<form>
  <fieldset>
    <legend>Choose coffee</legend>
    <RadioSelect id="coffee-selection" name="coffee" options={options} />
  </fieldset>
</form>
```

#### Step 3: Define styles for the widget

```scss
#coffee-selection {
  .value {
    border: 1px solid #dddddd;
  }
  
  &.focused .value {
    border-color: #0ca3ff;
  }
  
  .option-list {
    border: 1px solid #dddddd;
  }
  
  .option {
    border-bottom: 1px solid #dddddd;
    background-color: #ffffff;
    
    &.highlight {
      background-color: #0ca3ff;
      color: #ffffff;
    }
  }
}
```


### Connecting to Redux
If you prefer to store the widget's state in Redux `store`, there is another version of the component 
named `<RadioSelectRedux>`.

```js
import { RadioSelectRedux, createReducer } from 'react-radio-select'

...

const radioSelectReducer = createReducer({as: ['coffee-1', 'coffee-2']});

const reducer = combineReducers({
  ...otherReducers,
  radioSelect: radioSelectReducer // the key must be "radioSelect"
})

...

<form>
  <fieldset>
    <legend>Choose first coffee</legend>
    <RadioSelectRedux id="coffee-selection-1" name="coffee-1" options={options} />
  </fieldset>
  <fieldset>
    <legend>Choose second coffee</legend>
    <RadioSelectRedux id="coffee-selection-2" name="coffee-2" options={options} />
  </fieldset>
</form>
```

## API

### `<RadioSelect>`

#### Props
##### Required props
- name (string): The name attribute of the generated radio inputs.
- options (array of objects): The options in the select widget. Each object shall include properties "value" (string) and "component" (node).

##### Optional props
- required (bool): Adds the "required" attribute to the generated radio inputs. 
- defaultOption (number): Index of the preselected option. 0 by default.
- onChange (func): Callback when the value changes.
- onFocus (func): Callback when the widget receives focus.
- onBlur (func): Callback when the widget looses focus.

### `<RadioSelectRedux>`

#### Props
Same rules apply than with `<RadioSelect>`, and additionally:

##### Required props
- as (string): will be used as the key in the application's state

### `createReducer()`
#### Arguments
- as (array of strings): list of 'as'-props, the same as given to the instances of `<RadioSelectRedux>`