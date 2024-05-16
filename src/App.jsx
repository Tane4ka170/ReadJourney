import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { refreshUser } from 'redux/auth/authOperations';
import { selectToken } from 'redux/auth/authSelectors';
import Lib from './components/Lib/Lib';
import { ToastContainer } from 'react-toastify';
import { useAuth } from 'hooks/useAuth';
import Loader from './components/Loader/Loader';
import Layout from './components/Layout/Layout';
import { AuthRoute } from 'hoc/AuthRoute';
import { PrivateRoute } from 'hoc/PrivateRoute';
import RegisterPage from 'pages/RegisterPage';
import LoginPage from 'pages/LoginPage';
import RecomendedPage from 'pages/RecomendedPage';
import ReadingPage from 'pages/ReadingPage';

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch, token]);

  return isRefreshing ? (
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
                component={<RegisterPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <AuthRoute redirectTo="/recommended" component={<LoginPage />} />
            }
          />
          <Route
            path="/recommended"
            element={
              <PrivateRoute
                redirectTo="/recommended"
                component={<RecomendedPage />}
              />
            }
          />
          <Route
            path="/library"
            element={<PrivateRoute redirectTo="/library" component={<Lib />} />}
          />
          <Route
            path="/reading/:bookId"
            element={
              <PrivateRoute redirectTo="/library" component={<ReadingPage />} />
            }
          />
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Routes>
      <ToastContainer autoClose={1500} />
    </div>
  );
};
