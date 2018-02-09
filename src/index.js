import React from "react";
import {createStore, applyMiddleware} from "redux";
import {createLogger} from "redux-logger";
import {Provider} from "react-redux"
import RadioSelect from "./RadioSelect";
import reducer from "./reducers";

let middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = createLogger({collapsed: true});
  middlewares = [...middlewares, loggerMiddleware];
}

const store = createStore(
  reducer,
  applyMiddleware(...middlewares)
);

const component = (props) => (
  <Provider store={store}>
    <RadioSelect {...props}/>
  </Provider>
);

export default component;