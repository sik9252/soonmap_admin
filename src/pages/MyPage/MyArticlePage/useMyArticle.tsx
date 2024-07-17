import { useEffect } from 'react';
import { useSelectedArticleAtom } from '../../../store/articleAtom';
import { useCurrentLocationAtom } from '../../../store/currentLocationAtom';
import Info from './Info';
import Notice from './Notice';

const useMyArticle = () => {
  const { resetAtom } = useSelectedArticleAtom();
  const { setCurrentLocation } = useCurrentLocationAtom();

  const ACCOUNT_MENU_DEFAULT = [
    {
      id: 1,
      tabName: '작성한 정보',
    },
  ];

  const ACCOUNT_MENU_ADMIN = [
    {
      id: 1,
      tabName: '작성한 정보',
    },
    {
      id: 2,
      tabName: '작성한 공지사항',
    },
  ];

  const ACCOUNT_SCREEN_DEFAULT = [
    {
      id: 1,
      screen: <Info />,
    },
  ];

  const ACCOUNT_SCREEN_ADMIN = [
    {
      id: 1,
      screen: <Info />,
    },
    {
      id: 2,
      screen: <Notice />,
    },
  ];

  useEffect(() => {
    setCurrentLocation('작성한 정보');
  }, []);

  useEffect(() => {
    resetAtom();
  }, []);

  const handleCurrentLocation = (location: string) => {
    setCurrentLocation(location);
    resetAtom();
  };

  return {
    ACCOUNT_MENU_DEFAULT,
    ACCOUNT_MENU_ADMIN,
    ACCOUNT_SCREEN_DEFAULT,
    ACCOUNT_SCREEN_ADMIN,
    handleCurrentLocation,
  };
};

export default useMyArticle;
