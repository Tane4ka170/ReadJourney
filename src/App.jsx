import { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { refreshUser } from './redux/auth/authOperations';
import { selectToken } from './redux/auth/authSelectors';
import { ToastContainer } from 'react-toastify';
import { useAuth } from 'hooks/useAuth';
import Loader from './components/Loader/Loader';
import Layout from './components/Layout/Layout';
import { AuthRoute } from 'hoc/AuthRoute';
import { PrivateRoute } from 'hoc/PrivateRoute';

const Register = lazy(() => import('./pages/RegisterPage'));
const Login = lazy(() => import('./pages/LoginPage'));
const Recommended = lazy(() => import('./pages/RecomendedPage'));
const Library = lazy(() => import('./pages/LibPage'));
const Reading = lazy(() => import('./pages/ReadingPage'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch, token]);

  return (
    <Suspense fallback={<Loader />}>
      {isRefreshing ? (
        <Loader />
      ) : (
        <div>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate replace to="/register" />} />
              <Route
                path="/register"
                element={
                  <AuthRoute
                    redirectTo="/recommended"
                    component={<Register />}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <AuthRoute redirectTo="/recommended" component={<Login />} />
                }
              />
              <Route
                path="/recommended"
                element={
                  <PrivateRoute
                    redirectTo="/login"
                    component={<Recommended />}
                  />
                }
              />
              <Route
                path="/library"
                element={
                  <PrivateRoute redirectTo="/login" component={<Library />} />
                }
              />
              <Route
                path="/reading/:bookId"
                element={
                  <PrivateRoute redirectTo="/login" component={<Reading />} />
                }
              />
            </Route>
          </Routes>
          <ToastContainer autoClose={1500} />
        </div>
      )}
    </Suspense>
  );
};
