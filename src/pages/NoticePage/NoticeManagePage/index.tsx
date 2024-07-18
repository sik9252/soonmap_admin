import RightContainer from '../../../components/layout/RightContainer';
import {
  NoticeSection,
  SearchSection,
  NoticeListSection,
  NoticePreviewSection,
  PreviewTitle,
  PreviewInfo,
  TopNotice,
} from './style';
import CardUI from '../../../components/ui/CardUI';
import SearchUI from '../../../components/ui/SearchUI';
import { DatePickerUI } from '../../../components/ui/DatePickerUI';
import TextViewer from '../../../components/features/TextViewer';
import Pagination from '../../../components/features/Pagination';
import { SimpleGrid } from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { DefaultButton } from '../../../components/ui/ButtonUI';
import useNoticeManage from './useNoticeManage';

function NoticeManagePage() {
  const {
    selectedArticle,
    currentPage,
    setCurrentPage,
    setDateRange,
    startDate,
    endDate,
    keyword,
    handleSearchKeyword,
    noticeList,
    totalPosts,
    handleDateSearchButton,
    handleOnEnterKeyDown,
    handleNoticePreview,
    handleSearchRefreshButton,
  } = useNoticeManage();

  return (
    <RightContainer title={'공지사항 글 관리'}>
      <NoticeSection>
        <NoticeListSection>
          <SearchSection>
            <SearchUI
              placeholder="검색어 입력 혹은 기간을 설정한 후 검색 버튼을 눌러주세요."
              onChange={handleSearchKeyword}
              onKeyDown={handleOnEnterKeyDown}
              value={keyword}
            />
            <DatePickerUI setDateRange={setDateRange} startDate={startDate} endDate={endDate} />
            <DefaultButton onClick={() => handleDateSearchButton()}>검색</DefaultButton>
            <RepeatIcon w={6} h={6} ml="5px" cursor={'pointer'} onClick={() => handleSearchRefreshButton()} />
          </SearchSection>
          {noticeList && noticeList.length > 0 ? (
            <>
              <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
                {noticeList &&
                  noticeList.map((notice) => (
                    <CardUI
                      key={notice.id}
                      noticeData={notice}
                      onClick={() => handleNoticePreview(notice)}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
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
              <PreviewTitle>
                {selectedArticle.top ? <TopNotice>[주요 공지]</TopNotice> : ''}
                {selectedArticle.title}
              </PreviewTitle>
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
