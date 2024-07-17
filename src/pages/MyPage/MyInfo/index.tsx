import { useMemo } from 'react';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import RightContainer from '../../../components/layout/RightContainer';
import Timer from '../../../utils/timer';
import useMyInfo from './useMyInfo';

function MyInfoPage() {
  const {
    setTimeUp,
    myInfo,
    myEmailChangeData,
    myEmailChangeLoading,
    isEmailCheckSuccess,
    myEmailChangeValidateLoading,
    emailChangeBtnClicked,
    handleNewEmailInput,
    handleCodeInput,
    handleEmailModifyBtn,
    handleEmailChangeBtn,
    handleEmailChangeValidateBtn,
  } = useMyInfo();

  const timerComponent = useMemo(() => {
    return <Timer isStart={isEmailCheckSuccess} setTimeUp={setTimeUp} />;
  }, [isEmailCheckSuccess]);

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
