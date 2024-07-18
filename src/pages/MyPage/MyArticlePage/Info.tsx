import {
  MyArticleSection,
  MyArticleListSection,
  MyArticlePreviewSection,
  PreviewTitle,
  PreviewMyArticle,
} from './style';
import { SimpleGrid, Image, Flex } from '@chakra-ui/react';
import CardUI from '../../../components/ui/CardUI';
import TextViewer from '../../../components/features/TextViewer';
import Pagination from '../../../components/features/Pagination';
import useInfo from './useInfo';

function Info() {
  const { selectedArticle, currentPage, setCurrentPage, myArticleList, totalPosts, handleInfoPreview } = useInfo();

  return (
    <MyArticleSection>
      <MyArticleListSection>
        {myArticleList && myArticleList.length > 0 ? (
          <>
            <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
              {myArticleList &&
                myArticleList.map((article) => (
                  <CardUI
                    key={article.id}
                    infoData={article}
                    onClick={() => handleInfoPreview(article)}
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
            <PreviewTitle>
              {selectedArticle.thumbnail ? (
                <Flex alignItems="center">
                  <Image src={selectedArticle.thumbnail} alt="" w="50px" mr="10px" />[{selectedArticle.articleTypeName}]{' '}
                  {selectedArticle.title}
                </Flex>
              ) : (
                <>
                  [{selectedArticle.articleTypeName}] {selectedArticle.title}
                </>
              )}
            </PreviewTitle>
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

export default Info;
