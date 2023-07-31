import { useState } from 'react';
import {
  Container,
  PageTitle,
  NoticeSection,
  NoticeListSection,
  NoticePreviewSection,
  PreviewTitle,
  PreviewInfo,
} from './style';
import CardUI from '../../../components/CardUI';
import TextViewer from '../../../components/TextViewer';
import Pagination from '../../../components/Pagination';
import { SimpleGrid } from '@chakra-ui/react';

interface NoticeProps {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  writer: string;
}

function NoticeManagePage() {
  const [noticeList, setNoticeList] = useState([
    {
      id: 1,
      title: '공지 1',
      content: '공지 1 내용',
      createdAt: '2023.08.01',
      writer: '관리자',
    },
    {
      id: 2,
      title: '공지 2',
      content: '공지 2 내용',
      createdAt: '2023.08.01',
      writer: '관리자',
    },
    {
      id: 3,
      title: '공지 3',
      content: '공지 3 내용',
      createdAt: '2023.08.01',
      writer: '관리자',
    },
    {
      id: 4,
      title: '공지 1',
      content: '공지 1 내용',
      createdAt: '2023.08.01',
      writer: '관리자',
    },
    {
      id: 5,
      title: '공지 2',
      content: '공지 2 내용',
      createdAt: '2023.08.01',
      writer: '관리자',
    },
    {
      id: 6,
      title: '공지 3',
      content: '공지 3 내용',
      createdAt: '2023.08.01',
      writer: '관리자',
    },
    {
      id: 7,
      title: '공지 1',
      content: '공지 1 내용',
      createdAt: '2023.08.01',
      writer: '관리자',
    },
    {
      id: 8,
      title: '공지 2',
      content: '공지 2 내용',
      createdAt: '2023.08.01',
      writer: '관리자',
    },
    {
      id: 9,
      title: '공지 3',
      content: '공지 3 내용',
      createdAt: '2023.08.01',
      writer: '관리자',
    },
  ]);
  const [previewNotice, setPreviewNotice] = useState(noticeList[0]);

  const handleNoticePreview = (notice: NoticeProps) => {
    setPreviewNotice(notice);
  };

  // 테스트용 총 페이지 수
  const totalPosts = 56;
  const postPerPages = 9;

  return (
    <Container>
      <PageTitle>공지사항 글 관리</PageTitle>
      <NoticeSection>
        <NoticeListSection>
          <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
            {noticeList &&
              noticeList.map((notice) => (
                <CardUI
                  key={notice.id}
                  title={notice.title}
                  createdAt={notice.createdAt}
                  writer={notice.writer}
                  onClick={() => handleNoticePreview(notice)}
                />
              ))}
          </SimpleGrid>
          <Pagination totalPosts={totalPosts} postPerPages={postPerPages} />
        </NoticeListSection>
        <NoticePreviewSection>
          <PreviewTitle>{previewNotice.title}</PreviewTitle>
          <PreviewInfo>
            <span>작성자: {previewNotice.writer}</span>
            <span>작성일: {previewNotice.createdAt}</span>
          </PreviewInfo>
          <TextViewer content={previewNotice.content} />
        </NoticePreviewSection>
      </NoticeSection>
    </Container>
  );
}

export default NoticeManagePage;
