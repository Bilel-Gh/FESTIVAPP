import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import store from "./store/ReduxStore";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </HashRouter>
  </Provider>,
  document.getElementById("root")
);
