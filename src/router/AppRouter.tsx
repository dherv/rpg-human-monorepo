import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import { SessionGraph } from '../components/base/SessionGraph';
import { SessionLogs } from '../components/base/SessionLogs';
import { NotFound } from '../components/pages/NotFound';

// Not exported as default need the promise default setup
const Character = React.lazy(() =>
  import("../components/base/Character").then(({ Character }) => ({
    default: Character,
  }))
);
const ActivityContainer = React.lazy(() =>
  import("../components/base/ActivityContainer").then(
    ({ ActivityContainer }) => ({
      default: ActivityContainer,
    })
  )
);
const SessionAddPage = React.lazy(() =>
  import("../components/pages/SessionAddPage").then(({ SessionAddPage }) => ({
    default: SessionAddPage,
  }))
);
export const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="sessions">
            <Route index element={<SessionLogs />}></Route>
            <Route path="graph" element={<SessionGraph />}></Route>
          </Route>
          <Route
            path="activities"
            element={
              <React.Suspense fallback={<>...</>}>
                <ActivityContainer />
              </React.Suspense>
            }
          />
          <Route
            path="character"
            element={
              <React.Suspense fallback={<>...</>}>
                <Character />
              </React.Suspense>
            }
          />
          <Route
            path="new-session"
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
  );
};
