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
import useNotice from './useNotice';

function Notice() {
  const { selectedArticle, currentPage, setCurrentPage, myNoticeList, totalPosts, handleInfoPreview } = useNotice();

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
