import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Image, Flex } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { TopNotice } from './style';
import AlertDialogModal from '../../features/AlertDialogModal';
import ArticleModifyModal from '../../features/ArticleModifyModal';
import { useSelectedArticleAtom } from '../../../store/articleAtom';
import { IInfoData } from '../../../@types/Info';
import { INoticeData } from '../../../@types/Notice';

interface CardProps {
  infoData?: IInfoData;
  noticeData?: INoticeData;
  onClick?: () => void;
  setPreviewInfo?: React.Dispatch<React.SetStateAction<IInfoData | null>>;
  currentLocation?: string;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function CardUI({ infoData, noticeData, onClick, currentPage, setCurrentPage }: CardProps) {
  const path = useLocation();
  const [location, setLocation] = useState('');
  const { setSelectedArticle } = useSelectedArticleAtom();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAlertDialog = (info: IInfoData) => {
    if (path.pathname === '/info/manage') {
      setLocation('정보');
    } else if (path.pathname === '/notice/manage') {
      setLocation('공지');
    }

    setSelectedArticle(info);
    setIsAlertOpen(true);
  };

  const handleArticleModifyModal = (info: IInfoData) => {
    if (path.pathname === '/info/manage') {
      setLocation('정보');
    } else if (path.pathname === '/notice/manage') {
      setLocation('공지');
    }

    setSelectedArticle(info);
    setIsModalOpen(true);
  };

  return (
    <>
      <AlertDialogModal
        location={location}
        selectedItemIndex={infoData?.id || noticeData?.id}
        isAlertOpen={isAlertOpen}
        setIsAlertOpen={setIsAlertOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ArticleModifyModal
        location={location}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Card
        height="180px"
        cursor={'pointer'}
        _hover={{
          bg: '#eee',
        }}
        onClick={onClick}
      >
        <CardHeader pt="20px" pb="15px">
          {infoData && infoData.thumbnail ? (
            <Heading size="sm" noOfLines={1} textOverflow="ellipsis" whiteSpace="nowrap">
              <Flex alignItems="center">
                <Image src={infoData?.thumbnail} w="30px" h="30px" mr="10px" />
                {infoData?.title}
              </Flex>
            </Heading>
          ) : (
            <Heading size="sm" noOfLines={1} textOverflow="ellipsis" whiteSpace="nowrap">
              {infoData?.title}
            </Heading>
          )}
          {noticeData ? (
            <Heading size="sm" noOfLines={1} textOverflow="ellipsis" whiteSpace="nowrap">
              {noticeData?.top ? <TopNotice>[주요 공지]</TopNotice> : ''}
              {noticeData?.title}
            </Heading>
          ) : (
            ''
          )}
        </CardHeader>
        <CardBody pt="5px" pb="5px" h="auto">
          <Text fontSize={13} mb="3px">
            작성자: {infoData?.writer || noticeData?.writer}
          </Text>
          <Text fontSize={13} mb="3px">
            작성일: {infoData?.createAt?.slice(0, 10) || noticeData?.createAt?.slice(0, 10)}
          </Text>
          {infoData ? <Text fontSize={13}>카테고리: {infoData.articleTypeName}</Text> : ''}
        </CardBody>
        <CardFooter p="3px 20px 15px 20px">
          <EditIcon cursor={'pointer'} mr={'10px'} onClick={() => handleArticleModifyModal(infoData! || noticeData!)} />
          <DeleteIcon cursor={'pointer'} onClick={() => handleAlertDialog(infoData! || noticeData!)} />
        </CardFooter>
      </Card>
    </>
  );
}

export default CardUI;
