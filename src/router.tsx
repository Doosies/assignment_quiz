import { Outlet, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { GlobalLayout } from '@components/layout';

import { HomePage, QuizPage, ResultsPage, WrongNotePage } from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <GlobalLayout>
          <Outlet />
        </GlobalLayout>
      }
    >
      <Route
        path="/"
        element={<HomePage />}
      />
      <Route
        path="/quiz"
        element={<QuizPage />}
      />
      <Route
        path="/result"
        element={<ResultsPage />}
      />
      <Route
        path="/wrong-note"
        element={<WrongNotePage />}
      />
    </Route>,
  ),
);

export default router;
