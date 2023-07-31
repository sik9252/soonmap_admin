import { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import AlertDialogModal from '../../features/AlertDialogModal';
import ArticleModifyModal from '../../features/ArticleModifyModal';

interface CardProps {
  title: string;
  createdAt: string;
  writer: string;
  onClick?: () => void;
}

function CardUI({ title, createdAt, writer, onClick }: CardProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAlertDialog = () => {
    setIsAlertOpen(true);
  };

  const handleArticleModifyModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <AlertDialogModal isAlertOpen={isAlertOpen} setIsAlertOpen={setIsAlertOpen} />
      <ArticleModifyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Card
        cursor={'pointer'}
        _hover={{
          bg: '#eee',
        }}
        onClick={onClick}
      >
        <CardHeader>
          <Heading size="md">{title}</Heading>
        </CardHeader>
        <CardBody>
          <Text fontSize={14}>작성자: {writer}</Text>
          <Text fontSize={14}>작성일: {createdAt}</Text>
        </CardBody>
        <CardFooter>
          <EditIcon cursor={'pointer'} mr={'10px'} onClick={() => handleArticleModifyModal()} />
          <DeleteIcon cursor={'pointer'} onClick={() => handleAlertDialog()} />
        </CardFooter>
      </Card>
    </>
  );
}

export default CardUI;
