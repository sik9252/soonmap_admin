import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/MainLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CreateCampusPage from '../pages/CampusPage/CreateCampusPage';
import CampusManagePage from '../pages/CampusPage/CampusManagePage';
import CreateNoticePage from '../pages/NoticePage/CreateNoticePage';
import NoticeManagePage from '../pages/NoticePage/NoticeManagePage';
import CreateInfoPage from '../pages/InfoPage/CreateInfoPage';
import InfoManagePage from '../pages/InfoPage/InfoManagePage';
import InfoCategoryManage from '../pages/InfoPage/InfoCategoryManage';
import AdminAccountPage from '../pages/AccountManagePage/AdminAccountPage';
import UserAccountPage from '../pages/AccountManagePage/UserAccountPage';
import MyArticlePage from '../pages/MyPage/MyArticlePage';
import MyInfoPage from '../pages/MyPage/MyInfo';
import FindAccountPage from '../pages/FindAccountPage';
import NotFoundPage from '../pages/NotFoundPage';

function Router() {
  const token = localStorage.getItem('accessToken');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={token ? <Navigate replace to="/home" /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/find-account" element={<FindAccountPage />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/campus/*">
            <Route path="" element={<Navigate replace to="/notice/create" />} />
            <Route path="create" element={<CreateCampusPage />} />
            <Route path="manage" element={<CampusManagePage />} />
          </Route>
          <Route path="/notice/*">
            <Route path="" element={<Navigate replace to="/notice/create" />} />
            <Route path="create" element={<CreateNoticePage />} />
            <Route path="manage" element={<NoticeManagePage />} />
          </Route>
          <Route path="/info/*">
            <Route path="" element={<Navigate replace to="/info/create" />} />
            <Route path="create" element={<CreateInfoPage />} />
            <Route path="manage" element={<InfoManagePage />} />
            <Route path="category" element={<InfoCategoryManage />} />
          </Route>
          <Route path="/account/*">
            <Route path="" element={<Navigate replace to="/account/admin-manage" />} />
            <Route path="admin-manage" element={<AdminAccountPage />} />
            <Route path="user-manage" element={<UserAccountPage />} />
          </Route>
          <Route path="/my/*">
            <Route path="" element={<Navigate replace to="/my/info" />} />
            <Route path="info" element={<MyInfoPage />} />
            <Route path="article" element={<MyArticlePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
