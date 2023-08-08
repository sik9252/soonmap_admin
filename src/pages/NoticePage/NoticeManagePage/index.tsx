import { useState, useEffect } from 'react';
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
import { useGetNoticeRequest } from '../../../api/Notice';
import toast from 'react-hot-toast';
import { NoticeDataType } from '../../../api/Notice';
import { useSelectedArticleAtom } from '../../../store/articleAtom';
import { changeDateFormat } from '../../../utils/changeDateFormat';
import { DefaultButton } from '../../../components/ui/ButtonUI';

function NoticeManagePage() {
  const [noticeList, setNoticeList] = useState<NoticeDataType[] | null>([]);
  const { selectedArticle, setSelectedArticle } = useSelectedArticleAtom();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(1);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [keyword, setKeyword] = useState('');

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const {
    data: noticeResult,
    isError: noticeError,
    refetch: noticeRefetch,
  } = useGetNoticeRequest(
    {
      page: currentPage - 1,
      startDate: startDate ? changeDateFormat(startDate, 'YYYY-MM-DDThh:mm:ss') : '',
      endDate: endDate ? changeDateFormat(endDate, 'YYYY-MM-DDThh:mm:ss') : '',
      title: keyword ? keyword : '',
    },
    false,
  );

  useEffect(() => {
    void noticeRefetch();
  }, [currentPage]);

  const handleDateSearchButton = () => {
    void noticeRefetch();
  };

  const handleOnEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void noticeRefetch();
    }
  };

  useEffect(() => {
    if (noticeResult) {
      setNoticeList(noticeResult?.data.noticeList);
      setTotalPosts(noticeResult?.data.totalPage);
    } else if (noticeError) {
      toast.error('정보 글 목록을 불러오는데 실패했습니다.');
    }
  }, [noticeResult, noticeError]);

  const handleNoticePreview = (notice: NoticeDataType) => {
    setSelectedArticle(notice);
  };

  return (
    <RightContainer title={'공지사항 글 관리'}>
      <NoticeSection>
        <NoticeListSection>
          <SearchSection>
            <SearchUI
              placeholder="검색어를 입력하거나 날짜 필터링을 설정한 후 검색 버튼을 눌러주세요."
              onChange={handleSearchKeyword}
              onKeyDown={handleOnEnterKeyDown}
            />
            <DatePickerUI setDateRange={setDateRange} startDate={startDate} endDate={endDate} />
            <DefaultButton onClick={() => handleDateSearchButton()}>검색</DefaultButton>
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
          {selectedArticle.title ? (
            <>
              <PreviewTitle>{selectedArticle.title}</PreviewTitle>
              <PreviewInfo>
                <span>작성자: {selectedArticle.writer}</span>
                <span>작성일: {selectedArticle.createAt?.slice(0, 10)}</span>
              </PreviewInfo>
              <TextViewer content={selectedArticle.content} />
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
