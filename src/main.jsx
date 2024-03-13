import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nProvider } from "./context/i18n-context.jsx";
import store from "./store/index.js";
import { Provider } from "react-redux";
// import "antd/dist/antd.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <I18nProvider>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </I18nProvider>
);
