import { useState } from 'react';
import RightContainer from '../../../components/layout/RightContainer';
import {
  NoticeSection,
  SearchSection,
  NoticeListSection,
  NoticePreviewSection,
  PreviewTitle,
  PreviewInfo,
} from './style';
import CardUI from '../../../components/ui/CardUI';
import SearchUI from '../../../components/ui/SearchUI';
import { DatePickerUI } from '../../../components/ui/DatePickerUI';
import TextViewer from '../../../components/features/TextViewer';
import Pagination from '../../../components/features/Pagination';
import { SimpleGrid } from '@chakra-ui/react';

interface NoticeType {
  id: number;
  title: string;
  content: string;
  createAt: string;
  writer: string;
  isTop: boolean;
  view: number;
}

function NoticeManagePage() {
  const [noticeList, setNoticeList] = useState<NoticeType[] | null>([]);
  const [previewNotice, setPreviewNotice] = useState<NoticeType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(1);

  const handleNoticePreview = (notice: NoticeType) => {
    setPreviewNotice(notice);
  };

  return (
    <RightContainer title={'공지사항 글 관리'}>
      <NoticeSection>
        <NoticeListSection>
          <SearchSection>
            <SearchUI placeholder="검색어를 입력해주세요." />
            <DatePickerUI />
          </SearchSection>
          {noticeList && noticeList.length > 0 ? (
            <>
              <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
                {noticeList &&
                  noticeList.map((notice) => (
                    <CardUI key={notice.id} noticeData={notice} onClick={() => handleNoticePreview(notice)} />
                  ))}
              </SimpleGrid>
              <Pagination
                totalPosts={totalPosts * 9}
                postPerPages={9}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          ) : (
            <div>게시글이 없습니다.</div>
          )}
        </NoticeListSection>
        <NoticePreviewSection>
          {previewNotice ? (
            <>
              <PreviewTitle>{previewNotice.title}</PreviewTitle>
              <PreviewInfo>
                <span>작성자: {previewNotice.writer}</span>
                <span>작성일: {previewNotice.createAt}</span>
              </PreviewInfo>
              <TextViewer content={previewNotice.content} />
            </>
          ) : (
            <PreviewTitle>선택된 게시글이 없습니다.</PreviewTitle>
          )}
        </NoticePreviewSection>
      </NoticeSection>
    </RightContainer>
  );
}

export default NoticeManagePage;
