import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './helpers/axios/gaurd';
import Page404 from './pages/404';
import LoginPage from './pages/LoginInPage';
import Profiles from './pages/Profiles';
import SignUpPage from './pages/SignUpPage';
import UserInfoPage from './pages/UserInfoPage';

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserInfoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<PrivateRoute > <Profiles /></PrivateRoute>} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;