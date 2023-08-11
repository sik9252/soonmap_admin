import { useState, useEffect } from 'react';
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
import { SimpleGrid } from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { useGetInfoRequest } from '../../../api/Info';
import { CategoryDataType, useGetAllCategoryRequest } from '../../../api/InfoCategory';
import toast from 'react-hot-toast';
import { changeDateFormat } from '../../../utils/changeDateFormat';
import { InfoDataType } from '../../../api/Info';
import { useSelectedArticleAtom } from '../../../store/articleAtom';
import { DefaultButton } from '../../../components/ui/ButtonUI';

function InfoManagePage() {
  const [infoList, setInfoList] = useState<InfoDataType[] | null>([]);
  const { selectedArticle, setSelectedArticle } = useSelectedArticleAtom();
  const [options, setOptions] = useState<CategoryDataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(1);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [keyword, setKeyword] = useState('');
  //const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const { data: categoryGetAllResult, isError: categoryGetAllError } = useGetAllCategoryRequest();

  const {
    data: infoResult,
    isError: infoError,
    refetch: infoRefetch,
  } = useGetInfoRequest(
    {
      page: currentPage - 1,
      startDate: startDate ? changeDateFormat(startDate, 'YYYY-MM-DDT00:00:00') : '',
      endDate: endDate ? changeDateFormat(endDate, 'YYYY-MM-DDT23:59:59') : '',
      title: keyword ? encodeURIComponent(keyword) : '',
      typeName: selectedCategory ? encodeURIComponent(selectedCategory) : '',
    },
    false,
  );

  useEffect(() => {
    void infoRefetch();
  }, [currentPage]);

  const handleDateSearchButton = () => {
    void infoRefetch();
  };

  const handleOnEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void infoRefetch();
    }
  };

  useEffect(() => {
    if (categoryGetAllResult) {
      setOptions(categoryGetAllResult.data);
    } else if (categoryGetAllError) {
      toast.error('카테고리 목록을 불러오는데 실패했습니다.');
    }
  }, [categoryGetAllResult, categoryGetAllError]);

  useEffect(() => {
    if (infoResult) {
      setInfoList(infoResult?.data.articleList);
      setTotalPosts(infoResult?.data.totalPage);
    } else if (infoError) {
      toast.error('정보 글 목록을 불러오는데 실패했습니다.');
    }
  }, [infoResult, infoError]);

  const handleInfoPreview = (info: InfoDataType) => {
    setSelectedArticle(info);
  };

  const handleFilteredCategory = (typeName: string) => {
    //setSelectedCategory([...selectedCategory, typeName]);
    if (selectedCategory === typeName) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(typeName);
    }
  };

  useEffect(() => {
    if (selectedCategory) void infoRefetch();
  }, [selectedCategory]);

  const handleSearchRefreshButton = () => {
    setDateRange([null, null]);
    setKeyword('');
    setSelectedCategory('');
  };

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
                    <CardUI key={info.id} infoData={info} onClick={() => handleInfoPreview(info)} />
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
                [{selectedArticle.articleTypeName}] {selectedArticle.title}
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
