// import { SessionAddPage } from "./components/SessionAddPage";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";
import { MenuPage } from "./components/MenuPage";
// import { ActivityContainer } from "./components/base/ActivityContainer";
import { NotFound } from "./components/NotFound";
import "./index.css";
import { worker } from "./mocks/browser";

// Not exported as default need the promise default setup
const Character = React.lazy(() =>
  import("./components/Character").then(({ Character }) => ({
    default: Character,
  }))
);
const ActivityContainer = React.lazy(() =>
  import("./components/base/ActivityContainer").then(
    ({ ActivityContainer }) => ({
      default: ActivityContainer,
    })
  )
);
const SessionAddPage = React.lazy(() =>
  import("./components/SessionAddPage").then(({ SessionAddPage }) => ({
    default: SessionAddPage,
  }))
);

if (process.env.NODE_ENV === "development") {
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<MenuPage />} />
            <Route
              path="/activities"
              element={
                <React.Suspense fallback={<>...</>}>
                  <ActivityContainer />
                </React.Suspense>
              }
            />
            <Route
              path="/character"
              element={
                <React.Suspense fallback={<>...</>}>
                  <Character />
                </React.Suspense>
              }
            />
            <Route
              path="/new-session"
              element={
                <React.Suspense fallback={<>...</>}>
                  <SessionAddPage />
                </React.Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
