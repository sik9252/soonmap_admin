import { useState, useEffect } from 'react';
import { MyNoticeDataType, useGetMyNoticeRequest } from '../../../api/Mypage';
import {
  MyArticleSection,
  MyArticleListSection,
  MyArticlePreviewSection,
  PreviewTitle,
  PreviewMyArticle,
} from './style';
import { SimpleGrid } from '@chakra-ui/react';
import CardUI from '../../../components/ui/CardUI';
import TextViewer from '../../../components/features/TextViewer';
import Pagination from '../../../components/features/Pagination';
import toast from 'react-hot-toast';
import { useSelectedArticleAtom } from '../../../store/articleAtom';

function Notice() {
  const { selectedArticle, setSelectedArticle } = useSelectedArticleAtom();
  const [myNoticeList, setMyNoticeList] = useState<MyNoticeDataType[] | null>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(1);

  const {
    data: myNoticeResult,
    isError: myNoticeError,
    refetch: myNoticeRefetch,
  } = useGetMyNoticeRequest(
    {
      page: currentPage - 1,
    },
    false,
  );

  useEffect(() => {
    void myNoticeRefetch();
  }, []);

  useEffect(() => {
    if (myNoticeResult) {
      setMyNoticeList(myNoticeResult.data.noticeList);
      setTotalPosts(myNoticeResult.data.totalPage);
    } else if (myNoticeError) {
      toast.error('내 공지사항 목록을 불러오는데 실패했습니다..');
    }
  }, [myNoticeResult, myNoticeError]);

  const handleInfoPreview = (article: MyNoticeDataType) => {
    setSelectedArticle(article);
  };

  return (
    <MyArticleSection>
      <MyArticleListSection>
        {myNoticeList && myNoticeList.length > 0 ? (
          <>
            <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
              {myNoticeList &&
                myNoticeList.map((notice) => (
                  <CardUI
                    key={notice.id}
                    noticeData={notice}
                    onClick={() => handleInfoPreview(notice)}
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
      </MyArticleListSection>
      <MyArticlePreviewSection>
        {selectedArticle.title ? (
          <>
            <PreviewTitle>{selectedArticle.title}</PreviewTitle>
            <PreviewMyArticle>
              <span>작성자: {selectedArticle.writer}</span>
              <span>작성일: {selectedArticle.createAt?.slice(0, 10)}</span>
            </PreviewMyArticle>
            <TextViewer content={selectedArticle.content} />
          </>
        ) : (
          <PreviewTitle>선택된 게시글이 없습니다.</PreviewTitle>
        )}
      </MyArticlePreviewSection>
    </MyArticleSection>
  );
}

export default Notice;
