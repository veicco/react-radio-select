# React Radio Select

An accessible dropdown widget for React. Visually the widget is like html `<select>`, but with customizable
option components. For screen readers however it functions as a native radio button group.

The problem with the native `<select>` is its limitation in terms of customization. If we needed to present 
the `<option>` contents on multiple rows, for example, we could not use `<select>`, but we would have to use
a customized component. For screen reader users however customized select widgets are usually difficult, as 
the screen readers do not recognize them as form inputs. Although careful use of aria-attributes could solve 
the problem, it seems difficult to create a solution that functions correctly for all user groups with all 
browsers.

`<RadioSelect>` solves the problem by using radio inputs. As these are native form elements, screen readers
can communicate with them without problems.


## Demo
http://radio-select.veikko.it/

## Installation
``` 
npm install react-radio-select  
```

## How to use
### Basic example

#### Step 1: Define the options list
```js
const Option = ({title, price}) => (
  <div className="coffee-option">
    <div>{title}</div>
    <div>{price}</div>
  </div>
)

const coffees = [
  {id: "1001", title: "Espresso", price: "1.50 €"},
  {id: "1002", title: "Cappuccino", price: "2.00 €"},
  {id: "1003", title: "Flat white", price: "2.20 €"},
  {id: "1004", title: "Americano", price: "1.80 €"},
];

// The options must be an array of objects with at least keys "value" (string) 
// and "component" (node). "inputAttrs" (object) and "labelAttrs" (object) may 
// be included to add additional attributes to the input and label tags.
const options = coffees.map(item => ({
    value: item.id,
    component: <Option title={item.title} price={item.price}/>,
    labelAttrs: {"aria-label": item.title + " " + item.price}
}));
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