import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../../helpers/gaurd/gaurd';
import Page404 from '../../pages/404';
import LoginPage from '../../pages/LoginInPage';
import SignUpPage from '../../pages/SignUpPage';
import UserInfoPage from '../../pages/UserInfoPage';

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<PrivateRoute > <UserInfoPage /></PrivateRoute>} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;