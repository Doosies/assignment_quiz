import { Outlet, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { BottomBar } from '@components/common';
import { GlobalLayout } from '@components/layout';

import { HomePage, QuizPage, WrongNotePage } from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <>
          <GlobalLayout>
            <GlobalLayout.Main>
              <Outlet />
            </GlobalLayout.Main>
            <BottomBar>
              <BottomBar.Item
                to="/quiz"
                label="퀴즈풀기"
              />
              <BottomBar.Item
                to="/"
                label="홈으로"
              />
              <BottomBar.Item
                to="/wrong-note"
                label="오답노트"
              />
            </BottomBar>
          </GlobalLayout>
        </>
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
        path="/wrong-note"
        element={<WrongNotePage />}
      />
    </Route>,
  ),
);

export default router;
