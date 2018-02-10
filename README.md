# React Radio Select

Accessible dropdown widget for React. Visually the component functions as a native html select with customizable option elements. Screen readers however treat it as a radio button group in order to persist native form events for the screen readers.


## Installation
``` 
npm install react-radio-select  
```

## Example
### Basic usage
#### React
```js
import { RadioSelect } from 'react-radio-select'

...

const options = [
  {
    value: "1201",
    component: <MyComponent showText="Orange"/>
  },
  {
    value: "1207",
    component: <MyComponent showText="Apple"/>
  },
  {
    value: "1104",
    component: <MyComponent showText="Banana"/>
  }
]

<RadioSelect name='my-select' options={options} />
```

#### CSS
##### Import as sass module
```sass
@import '~react-radio-select/react-radio-select.scss';
```
##### Or use the compiled css
```html
<link rel="stylesheet" href="node_modules/react-radio-select/react-radio-select.css">
```

### Connected to Redux
If you prefer to store the widget's state in Redux `store`, there is another version of the component 
named `<RadioSelectRedux>`.

```js
import { RadioSelectRedux, createReducer } from 'react-radio-select'

...

const radioSelectReducer = createReducer({as: ['my-select-1', 'my-select-2']});

const reducer = combineReducers({
  ...otherReducers,
  radioSelect: radioSelectReducer // the key must be "radioSelect"
})

...

const MyForm = () => (
  <form>
    <RadioSelectRedux as='my-select-1' name='my-select-1' options={options} />
    <RadioSelectRedux as='my-select-2' name='my-select-2' options={options} />
  </form>
)





```

## API

### `<RadioSelect>`

#### Props
##### Required props
- name (string): The name attribute of the generated radio inputs.
- options (array of objects): The options in the select widget. Each object shall include properties "value" (string) and "component" (node).

##### Optional props
- required (bool): Adds the required attribute to the generated radio inputs. 
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