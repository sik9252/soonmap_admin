import { useState, useEffect, useMemo } from 'react';
import {
  useGetMyInfoRequest,
  useMyEmailChangeRequest,
  useMyEmailChangeValidateRequest,
} from '../../../api-hooks/Account';
import { checkEmailValidate } from '../../../utils/checkEmailValidate';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import RightContainer from '../../../components/layout/RightContainer';
import { toast } from 'react-hot-toast';
import Timer from '../../../utils/timer';
import { IMyInfoResponse } from '../../../@types/Account';

function MyInfoPage() {
  const { data: myInfoData, error: myInfoError, refetch: myInfoRefetch } = useGetMyInfoRequest();

  const {
    mutate: myEmailChangeRequest,
    data: myEmailChangeData,
    error: myEmailChangeError,
    isLoading: myEmailChangeLoading,
  } = useMyEmailChangeRequest();

  const {
    mutate: myEmailChangeValidateRequest,
    data: myEmailChangeValidateData,
    error: myEmailChangeValidateError,
    isLoading: myEmailChangeValidateLoading,
  } = useMyEmailChangeValidateRequest();

  const [myInfo, setMyInfo] = useState<IMyInfoResponse>({});
  const [emailChangeBtnClicked, setEmailChangeBtnClicked] = useState(false);
  const [isEmailCheckSuccess, setIsEmailCheckSuccess] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [code, setCode] = useState('');
  const [isTimeUp, setTimeUp] = useState<boolean>(false);

  const handleNewEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  useEffect(() => {
    if (myInfoData) {
      setMyInfo(myInfoData.data);
    } else if (myInfoError) {
      toast.error((myInfoError as Error).message);
    }
  }, [myInfoData, myInfoError]);

  const handleEmailModifyBtn = () => {
    setEmailChangeBtnClicked((prevState) => !prevState);
  };

  const handleEmailChangeBtn = () => {
    const data = {
      newEmail: newEmail,
    };

    if (!newEmail || !checkEmailValidate(newEmail)) {
      toast.error('올바른 이메일 주소를 입력해주세요.');
    } else {
      myEmailChangeRequest({ ...data });
    }
  };

  const handleEmailChangeValidateBtn = () => {
    const data = {
      newEmail: newEmail,
      code: code,
    };

    if (!newEmail || !checkEmailValidate(newEmail)) {
      toast.error('올바른 이메일 주소를 입력해주세요.');
    } else if (!code) {
      toast.error('올바른 인증번호를 입력해주세요.');
    } else {
      myEmailChangeValidateRequest({ ...data });
    }
  };

  useEffect(() => {
    if (myEmailChangeData) {
      toast.success('인증번호가 전송되었습니다.');
      setIsEmailCheckSuccess(true);
    } else if (myEmailChangeError) {
      toast.error((myEmailChangeError as Error).message);
    }
  }, [myEmailChangeData, myEmailChangeError]);

  useEffect(() => {
    if (myEmailChangeValidateData) {
      toast.success('이메일 변경이 완료되었습니다.');
      setEmailChangeBtnClicked(false);
      void myInfoRefetch();
    } else if (myEmailChangeValidateError) {
      toast.error((myEmailChangeValidateError as Error).message);
    }
  }, [myEmailChangeValidateData, myEmailChangeValidateError]);

  const timerComponent = useMemo(() => {
    return <Timer isStart={isEmailCheckSuccess} setTimeUp={setTimeUp} />;
  }, [isEmailCheckSuccess]);

  useEffect(() => {
    if (isTimeUp) {
      toast.error('인증번호가 만료되었습니다. 다시 받아주세요.');
      setIsEmailCheckSuccess(false);
    }

    setTimeout(() => {
      setTimeUp(false);
    }, 500);
  }, [isTimeUp]);

  return (
    <RightContainer title={'내 정보 관리'}>
      <Flex py="5px" alignItems="center">
        <Text fontSize="18px" fontWeight="700" mr="8px" w="80px">
          아이디:
        </Text>
        <Text>{myInfo.name}</Text>
      </Flex>
      <Flex py="5px" alignItems="center">
        <Text fontSize="18px" fontWeight="700" mr="8px" w="80px">
          이메일:
        </Text>
        {emailChangeBtnClicked ? (
          <Input
            placeholder="새로운 이메일을 입력해주세요."
            defaultValue={myInfo.email}
            w="400px"
            mr="10px"
            border="0.8px solid #818080"
            onChange={handleNewEmailInput}
          />
        ) : (
          <Text mr="10px">{myInfo.email}</Text>
        )}
        {emailChangeBtnClicked ? (
          <>
            <Button onClick={() => handleEmailModifyBtn()} mr="5px">
              취소하기
            </Button>
            <Button
              backgroundColor="#25549c"
              color="#FFFFFF"
              _hover={{
                bg: '#1a478a',
              }}
              onClick={() => handleEmailChangeBtn()}
              isLoading={myEmailChangeLoading}
              loadingText="인증번호 발급중"
            >
              인증번호 받기
            </Button>
          </>
        ) : (
          <Button
            backgroundColor="#25549c"
            color="#FFFFFF"
            _hover={{
              bg: '#1a478a',
            }}
            onClick={() => handleEmailModifyBtn()}
          >
            이메일 수정하기
          </Button>
        )}
      </Flex>
      {emailChangeBtnClicked && myEmailChangeData ? (
        <Flex py="5px" alignItems="center">
          <Text fontSize="18px" fontWeight="700" mr="8px" w="80px">
            인증번호:
          </Text>
          <Input
            placeholder="인증번호를 입력해주세요."
            w="400px"
            mr="10px"
            border="0.8px solid #818080"
            onChange={handleCodeInput}
          />
          <Button
            backgroundColor="#25549c"
            color="#FFFFFF"
            _hover={{
              bg: '#1a478a',
            }}
            onClick={() => handleEmailChangeValidateBtn()}
            isLoading={myEmailChangeValidateLoading}
            loadingText="이메일 변경중"
          >
            인증 및 이메일 변경하기
          </Button>
          <Box w="60px" ml="10px">
            {timerComponent}
          </Box>
        </Flex>
      ) : (
        ''
      )}
      <Flex py="5px" alignItems="center">
        <Text fontSize="18px" fontWeight="700" mr="8px" w="80px">
          계정 권한:
        </Text>
        <Text>{myInfo.admin ? 'Admin' : myInfo.manager ? 'Manager' : myInfo.staff ? 'Staff' : ''}</Text>
      </Flex>
    </RightContainer>
  );
}

export default MyInfoPage;
