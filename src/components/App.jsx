import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { refreshUser } from 'redux/auth/authOperations';
import { selectToken } from 'redux/auth/authSelectors';
import Lib from './Lib/Lib';
import { ToastContainer } from 'react-toastify';
import { useAuth } from 'hooks/useAuth';
import Loader from './Loader/Loader';
import Layout from './Layout/Layout';

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
              <RestrictedRoute
                redirectTo="/recommended"
                component={<Register />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/recommended"
                component={<Login />}
              />
            }
          />
          <Route
            path="/recommended"
            element={
              <PrivateRoute
                redirectTo="/recommended"
                component={<Recommended />}
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
              <PrivateRoute redirectTo="/library" component={<Reading />} />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={1500} />
    </div>
  );
};
