import RightContainer from '../../../components/layout/RightContainer';
import {
  InfoSection,
  InfoListSection,
  SearchSection,
  CategoryFilterSection,
  InfoPreviewSection,
  PreviewTitle,
  PreviewInfo,
} from './style';
import CardUI from '../../../components/ui/CardUI';
import SearchUI from '../../../components/ui/SearchUI';
import { DatePickerUI } from '../../../components/ui/DatePickerUI';
import BadgeUI from '../../../components/ui/BadgeUI';
import TextViewer from '../../../components/features/TextViewer';
import Pagination from '../../../components/features/Pagination';
import { SimpleGrid, Image, Flex } from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { DefaultButton } from '../../../components/ui/ButtonUI';
import useInfoManage from './useInfoManage';

function InfoManagePage() {
  const {
    selectedArticle,
    currentPage,
    setCurrentPage,
    startDate,
    endDate,
    setDateRange,
    keyword,
    selectedCategory,
    handleSearchKeyword,
    options,
    infoList,
    totalPosts,
    handleDateSearchButton,
    handleOnEnterKeyDown,
    handleInfoPreview,
    handleFilteredCategory,
    handleSearchRefreshButton,
  } = useInfoManage();

  return (
    <RightContainer title={'정보 게시판 글 관리'}>
      <InfoSection>
        <InfoListSection>
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
          <CategoryFilterSection>
            <BadgeUI key={0} isSelected={'전체' === selectedCategory} onClick={() => handleFilteredCategory('전체')}>
              전체
            </BadgeUI>
            {options &&
              options.map((option) => (
                <BadgeUI
                  key={option.id}
                  isSelected={option.typeName === selectedCategory}
                  onClick={() => handleFilteredCategory(option.typeName!)}
                >
                  {option.typeName}
                </BadgeUI>
              ))}
          </CategoryFilterSection>
          {infoList && infoList.length > 0 ? (
            <>
              <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
                {infoList &&
                  infoList.map((info) => (
                    <CardUI
                      key={info.id}
                      infoData={info}
                      onClick={() => handleInfoPreview(info)}
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
        </InfoListSection>
        <InfoPreviewSection>
          {selectedArticle.title ? (
            <>
              <PreviewTitle>
                {selectedArticle.thumbnail ? (
                  <Flex alignItems="center">
                    <Image src={selectedArticle.thumbnail} alt="" w="50px" mr="10px" />[
                    {selectedArticle.articleTypeName}] {selectedArticle.title}
                  </Flex>
                ) : (
                  <>
                    [{selectedArticle.articleTypeName}] {selectedArticle.title}
                  </>
                )}
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
        </InfoPreviewSection>
      </InfoSection>
    </RightContainer>
  );
}

export default InfoManagePage;
