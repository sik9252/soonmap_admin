import { useState } from 'react';
import {
  Container,
  PageTitle,
  InfoSection,
  InfoListSection,
  InfoPreviewSection,
  PreviewTitle,
  PreviewInfo,
} from './style';
import CardUI from '../../../components/CardUI';
import TextViewer from '../../../components/TextViewer';
import Pagination from '../../../components/Pagination';
import { SimpleGrid } from '@chakra-ui/react';

interface InfoProps {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  writer: string;
}

function InfoManagePage() {
  const [infoList, setInfoList] = useState([
    {
      id: 1,
      title: '정보 1',
      content: '정보 1 내용',
      createdAt: '2023.08.01',
      writer: '관리자',
    },
    {
      id: 2,
      title: '정보 2',
      content: '정보 2 내용',
      createdAt: '2023.08.01',
      writer: '관리자',
    },
    {
      id: 3,
      title: '정보 3',
      content: '정보 3 내용',
      createdAt: '2023.08.01',
      writer: '관리자',
    },
    {
      id: 4,
      title: '정보 1',
      content: '정보 1 내용',
      createdAt: '2023.08.01',
      writer: '관리자',
    },
    {
      id: 5,
      title: '정보 2',
      content: '정보 2 내용',
      createdAt: '2023.08.01',
      writer: '관리자',
    },
    {
      id: 6,
      title: '정보 3',
      content: '정보 3 내용',
      createdAt: '2023.08.01',
      writer: '관리자',
    },
    {
      id: 7,
      title: '정보 1',
      content: '정보 1 내용',
      createdAt: '2023.08.01',
      writer: '관리자',
    },
    {
      id: 8,
      title: '정보 2',
      content: '정보 2 내용',
      createdAt: '2023.08.01',
      writer: '관리자',
    },
    {
      id: 9,
      title: '정보 3',
      content: '정보 3 내용',
      createdAt: '2023.08.01',
      writer: '관리자',
    },
  ]);
  const [previewInfo, setPreviewInfo] = useState(infoList[0]);

  const handleInfoPreview = (Info: InfoProps) => {
    setPreviewInfo(Info);
  };

  // 테스트용 총 페이지 수
  const totalPosts = 56;
  const postPerPages = 9;

  return (
    <Container>
      <PageTitle>정보 게시판 글 관리</PageTitle>
      <InfoSection>
        <InfoListSection>
          <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
            {infoList &&
              infoList.map((Info) => (
                <CardUI
                  key={Info.id}
                  title={Info.title}
                  createdAt={Info.createdAt}
                  writer={Info.writer}
                  onClick={() => handleInfoPreview(Info)}
                />
              ))}
          </SimpleGrid>
          <Pagination totalPosts={totalPosts} postPerPages={postPerPages} />
        </InfoListSection>
        <InfoPreviewSection>
          <PreviewTitle>{previewInfo.title}</PreviewTitle>
          <PreviewInfo>
            <span>작성자: {previewInfo.writer}</span>
            <span>작성일: {previewInfo.createdAt}</span>
          </PreviewInfo>
          <TextViewer content={previewInfo.content} />
        </InfoPreviewSection>
      </InfoSection>
    </Container>
  );
}

export default InfoManagePage;
