import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { UnkownErrorBoundary } from '@components/error/ErrorBoundary';
import { GlobalLayout } from '@components/layout';

import { HomePage, QuizPage, ResultsPage, WrongNotePage } from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <GlobalLayout>
          <ErrorBoundary FallbackComponent={UnkownErrorBoundary}>
            <Outlet />
          </ErrorBoundary>
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
