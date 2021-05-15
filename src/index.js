import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import "./css/owl.carousel.css";
import "./css/signup.css";
import "./css/style.css";
import "./css/profile.css";
import "./css/edit.profile.css";
import "./css/blog.css";

import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "./reducers/index";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
const comboseEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  comboseEnhancers(applyMiddleware(thunk))
);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
