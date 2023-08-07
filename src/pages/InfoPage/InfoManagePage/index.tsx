import { useState, useEffect } from 'react';
import RightContainer from '../../../components/layout/RightContainer';
import { InfoSection, InfoListSection, SearchSection, InfoPreviewSection, PreviewTitle, PreviewInfo } from './style';
import CardUI from '../../../components/ui/CardUI';
import SearchUI from '../../../components/ui/SearchUI';
import { DatePickerUI } from '../../../components/ui/DatePickerUI';
import TextViewer from '../../../components/features/TextViewer';
import Pagination from '../../../components/features/Pagination';
import { SimpleGrid } from '@chakra-ui/react';
import { useGetInfoRequest } from '../../../api/Info';
import toast from 'react-hot-toast';
import { InfoDataType } from '../../../api/Info';
import { useSelectedArticleAtom } from '../../../store/articleAtom';

function InfoManagePage() {
  const [infoList, setInfoList] = useState<InfoDataType[] | null>([]);
  const { selectedArticle, setSelectedArticle } = useSelectedArticleAtom();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(1);

  const { data: infoResult, isError: infoError } = useGetInfoRequest({
    page: currentPage - 1,
  });

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

  return (
    <RightContainer title={'정보 게시판 글 관리'}>
      <InfoSection>
        <InfoListSection>
          <SearchSection>
            <SearchUI placeholder="검색어를 입력해주세요." />
            <DatePickerUI />
          </SearchSection>
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
