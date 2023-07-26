import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CreateCampusPage from '../pages/CampusPage/CreateCampusPage';
import CampusManagePage from '../pages/CampusPage/CampusManagePage';
import CreateNoticePage from '../pages/NoticePage/CreateNoticePage';
import NoticeManagePage from '../pages/NoticePage/NoticeManagePage';
import CreateInfoPage from '../pages/InfoPage/CreateInfoPage';
import InfoManagePage from '../pages/InfoPage/InfoManagePage';
import AccountManagePage from '../pages/AccountManagePage';
import NotFoundPage from '../pages/NotFoundPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/campus" element={<Navigate replace to="/campus/create" />} />
          <Route path="/campus/create" element={<CreateCampusPage />} />
          <Route path="/campus/manage" element={<CampusManagePage />} />
          <Route path="/notice" element={<Navigate replace to="/notice/create" />} />
          <Route path="/notice/create" element={<CreateNoticePage />} />
          <Route path="/notice/manage" element={<NoticeManagePage />} />
          <Route path="/info" element={<Navigate replace to="/info/create" />} />
          <Route path="/info/create" element={<CreateInfoPage />} />
          <Route path="/info/manage" element={<InfoManagePage />} />
          <Route path="/account" element={<Navigate replace to="/account/manage" />} />
          <Route path="/account/manage" element={<AccountManagePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
