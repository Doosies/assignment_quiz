import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { Home } from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Home />}
    />,
  ),
);

export default router;
