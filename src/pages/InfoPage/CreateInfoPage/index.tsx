import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RightContainer from '../../../components/layout/RightContainer';
import { Editor } from '@toast-ui/react-editor';
import TextEditor from '../../../components/features/TextEditor';
import { TitleInputSection, ButtonContainer } from './style';
import SelectUI from '../../../components/ui/SelectUI';
import InputUI from '../../../components/ui/InputUI';
import { DefaultButton } from '../../../components/ui/ButtonUI';
import { ThumbnailUploadUI } from '../../../components/ui/ThumbnailUploadUI';
import { CategoryDataType, useGetAllCategoryRequest } from '../../../api/InfoCategory';
import { useCreateInfoRequest } from '../../../api/Info';
import toast from 'react-hot-toast';
import { Flex } from '@chakra-ui/react';
import { useUploadImageRequest } from '../../../api/TextEditor';

type EditorInstance = Editor | null;

function CreateInfoPage() {
  const navigate = useNavigate();
  const editorRef = useRef<EditorInstance>(null);

  const [options, setOptions] = useState<CategoryDataType[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState<string | undefined>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>('');

  const { data: categoryGetAllResult, isError: categoryGetAllError } = useGetAllCategoryRequest();
  const { mutate: uploadThumbnailRequest, data: thumbnailData, error: uploadThumbnailError } = useUploadImageRequest();

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContent = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    setContent(editorRef.current?.getInstance().getHTML());
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);

      uploadThumbnailRequest({
        image: e.target.files[0],
      });
    }
  };

  useEffect(() => {
    if (thumbnailData) {
      setThumbnailUrl(thumbnailData.data);
    } else if (uploadThumbnailError) {
      toast.error('썸네일 등록에 실패했습니다.');
    }
  }, [thumbnailData, uploadThumbnailError]);

  const {
    mutate: createInfoRequest,
    data: createInfoAllData,
    error: createInfoAllError,
    isLoading: createInfoLoading,
  } = useCreateInfoRequest();

  useEffect(() => {
    if (categoryGetAllResult) {
      setOptions(categoryGetAllResult.data);
    } else if (categoryGetAllError) {
      toast.error('카테고리 목록을 불러오는데 실패했습니다.');
    }
  }, [categoryGetAllResult, categoryGetAllError]);

  const clickSubmitting = () => {
    const data = {
      title: title,
      content: content,
      articleTypeName: category,
      thumbnail: thumbnail && thumbnailUrl ? thumbnailUrl : '',
    };

    if (!title || !content || !category) {
      toast.error('제목, 내용, 카테고리는 필수 항목 입니다.');
    } else {
      createInfoRequest({ ...data });
    }
  };

  useEffect(() => {
    if (createInfoAllData) {
      toast.success('게시글 등록이 완료되었습니다.');
      navigate('/info/manage');
    } else if (createInfoAllError) {
      toast.error((createInfoAllError as Error).message);
    }
  }, [createInfoAllData, createInfoAllError]);

  return (
    <RightContainer title={'정보 글 업로드'}>
      <TitleInputSection>
        <SelectUI options={options} handleCategory={handleCategory} />
        <InputUI placeholder={'제목을 입력해주세요.'} onChange={handleTitle} maxLength={100} />
      </TitleInputSection>
      <Flex>
        <TextEditor editorRef={editorRef} content={'여기에 내용을 입력해주세요.'} onChange={handleContent} />
        <Flex m="0 auto">
          <ThumbnailUploadUI
            ThumbnailImage={thumbnail}
            handleThumbnailChange={handleThumbnailChange}
            setThumbnail={setThumbnail}
            setThumbnailUrl={setThumbnailUrl}
          />
        </Flex>
      </Flex>
      <ButtonContainer>
        <div>{/* <FileUploaderUI /> */}</div>
        <DefaultButton isLoading={createInfoLoading} loadingText="등록 중" onClick={() => clickSubmitting()}>
          정보 글 등록
        </DefaultButton>
      </ButtonContainer>
    </RightContainer>
  );
}

export default CreateInfoPage;
