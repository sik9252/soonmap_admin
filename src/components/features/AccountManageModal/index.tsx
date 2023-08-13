import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import DefaultInfoSection from './DefaultInfoSection';
import MyArticleSection from './MyArticleSection';
import { useSelectedAccountAtom } from '../../../store/accountAtom';

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AccountManageModal({ isModalOpen, setIsModalOpen }: ModalProps) {
  const { selectedAccount } = useSelectedAccountAtom();

  const ACCOUNT_MENU = [
    {
      id: 1,
      tabName: '기본 정보',
    },
    {
      id: 2,
      tabName: '작성한 글',
    },
  ];

  const ACCOUNT_SCREEN = [
    {
      id: 1,
      screen: <DefaultInfoSection selectedAccount={selectedAccount} setIsModalOpen={setIsModalOpen} />,
    },
    {
      id: 2,
      screen: <MyArticleSection />,
    },
  ];

  const handleAccountManageModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal onClose={() => handleAccountManageModal()} isOpen={isModalOpen} isCentered size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>계정 상세정보</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs variant="enclosed">
            <TabList>
              {ACCOUNT_MENU.map((menu) => (
                <Tab key={menu.id}>{menu.tabName}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {ACCOUNT_SCREEN.map((screen) => (
                <TabPanel key={screen.id}>{screen.screen}</TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AccountManageModal;
