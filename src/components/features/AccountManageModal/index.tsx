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
import DefaultInfoSection from './DefaultInfoModal';
import { useSelectedAccountAtom } from '../../../store/accountAtom';

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function AccountManageModal({ isModalOpen, setIsModalOpen, currentPage, setCurrentPage }: ModalProps) {
  const { selectedAccount } = useSelectedAccountAtom();

  const ACCOUNT_MENU = [
    {
      id: 1,
      tabName: '기본 정보',
    },
  ];

  const ACCOUNT_SCREEN = [
    {
      id: 1,
      screen: (
        <DefaultInfoSection
          selectedAccount={selectedAccount}
          setIsModalOpen={setIsModalOpen}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ),
    },
  ];

  return (
    <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} isCentered size="full">
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
