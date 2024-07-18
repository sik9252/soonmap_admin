import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from '../components/layout/MainLayout';
import Spinner from '../components/layout/Spinner';

const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const CreateCampusPage = lazy(() => import('../pages/CampusPage/CreateCampusPage'));
const CampusManagePage = lazy(() => import('../pages/CampusPage/CampusManagePage'));
const CreateNoticePage = lazy(() => import('../pages/NoticePage/CreateNoticePage'));
const NoticeManagePage = lazy(() => import('../pages/NoticePage/NoticeManagePage'));
const CreateInfoPage = lazy(() => import('../pages/InfoPage/CreateInfoPage'));
const InfoManagePage = lazy(() => import('../pages/InfoPage/InfoManagePage'));
const InfoCategoryManage = lazy(() => import('../pages/InfoPage/InfoCategoryManage'));
const AdminAccountPage = lazy(() => import('../pages/AccountManagePage/AdminAccountPage'));
const UserAccountPage = lazy(() => import('../pages/AccountManagePage/UserAccountPage'));
const MyArticlePage = lazy(() => import('../pages/MyPage/MyArticlePage'));
const MyInfoPage = lazy(() => import('../pages/MyPage/MyInfo'));
const FindAccountPage = lazy(() => import('../pages/FindAccountPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

function Router() {
  const token = localStorage.getItem('accessToken');

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={token ? <Navigate replace to="/home" /> : <Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/find-account" element={<FindAccountPage />} />
          <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/campus/*">
              <Route path="" element={<Navigate replace to="/campus/create" />} />
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
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
