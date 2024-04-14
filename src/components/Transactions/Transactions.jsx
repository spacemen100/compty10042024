import React from 'react';
import {
  Box,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';
import TransactionsHeader from './components/TransactionsHeader';
import TransactionItem from './components/TransactionItem';
import TransactionDetail from './components/TransactionDetail';
import TransactionDetailHeader from './components/transactiondetail/TransactionDetailHeader';

function Transactions() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex>
      <Box flex="1" p={4}>
        <TransactionsHeader onToggleFilter={onOpen} /> {/* Assuming you want the filter to also open the modal */}
        <Box maxWidth="1000px" textAlign="center" mx="auto">
          {/* Wrap TransactionItem with a div or another element for the onClick event */}
          <div onClick={onOpen}>
            <TransactionItem />
          </div>
        </Box>
      </Box>
      
      {/* Modal that will contain the TransactionDetail */}
      <Modal isOpen={isOpen} onClose={onClose} size="full" overflow="auto">
        <ModalOverlay />
        <ModalContent m={0} maxW="100vw">
          <TransactionDetailHeader onClose={onClose} />
          <TransactionDetail />
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default Transactions;
