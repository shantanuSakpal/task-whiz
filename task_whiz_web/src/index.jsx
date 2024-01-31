import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App.jsx";
import { ContextProvider } from "./contexts/ContextProvider";
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCf0x0QHxbf1x0ZFREal9YTnRdUj0eQnxTdEZiW31YcXZWT2JfVExwVg=="
);
ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
