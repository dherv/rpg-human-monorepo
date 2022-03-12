import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import { ActivityContainer } from './components/base/ActivityContainer';
import { NotFound } from './components/NotFound';
import { worker } from './mocks/browser';

// Not exported as default need the promise default setup
const Character = React.lazy(() =>
  import("./components/Character").then(({ Character }) => ({
    default: Character,
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
            <Route index element={<ActivityContainer />} />
            <Route
              path="/character"
              element={
                <React.Suspense fallback={<>...</>}>
                  <Character />
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
