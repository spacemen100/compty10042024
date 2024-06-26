import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Progress,
  Text,
  VStack,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Select,
  Radio,
  RadioGroup,
  Stack
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

const FileUploadModal = ({ onClose }) => {
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();
  const [step, setStep] = useState(1);
  const [transactionChoice, setTransactionChoice] = useState('stock');

  useEffect(() => {
    onOpen();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png, application/pdf',
    maxSize: 10485760,
  });

  const handleNextStep = () => {
    if (step === 3) {
      // Logique pour soumettre ou traiter les informations saisies par l'utilisateur
      // Par exemple, attacher le justificatif à une transaction ou le créer manuellement
      closeModal();
    } else {
      setStep(step + 1);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Center w="full" {...getRootProps()} p={10} border="2px dashed gray">
            <input {...getInputProps()} />
            <Text align="center">Déposez ici le justificatif que vous souhaitez ajouter<br />
            Formats autorisés: PNG / JPG / PDF<br />
            Taille max: 10Mo</Text>
          </Center>
        );
      case 2:
        return (
            <VStack spacing={4}>
              <FormControl id="companyName" isRequired>
                <FormLabel>Libellé</FormLabel>
                <Input placeholder="GENERALI" />
              </FormControl>
              <FormControl id="date" isRequired>
                <FormLabel>Date</FormLabel>
                <Input placeholder="27/02/2023" type="date" />
              </FormControl>
              <FormControl id="amount" isRequired>
                <FormLabel>Total (TTC)</FormLabel>
                <Input placeholder="194,24" type="number" />
              </FormControl>
              <FormControl id="paymentMethod">
                <FormLabel>Moyen de paiement</FormLabel>
                <Select placeholder="Sélectionner le moyen de paiement">
                  <option value="card">Carte</option>
                  <option value="check">Chèque</option>
                  <option value="transfer">Virement</option>
                </Select>
              </FormControl>
            </VStack>
          );
      case 3:
        return (
          <VStack spacing={4} align="start">
            <Text fontWeight="bold">Nous n'avons pas trouvé de transaction pouvant correspondre au justificatif</Text>
            <Text>Que souhaitez-vous faire ?</Text>
            <RadioGroup onChange={setTransactionChoice} value={transactionChoice}>
              <Stack direction="column">
                <Radio value="stock">Stocker le justificatif en attendant</Radio>
                <Radio value="create">Créer la transaction manuellement</Radio>
              </Stack>
            </RadioGroup>
          </VStack>
        );
      default:
        return <Text>Autres contenus de l'étape ici...</Text>;
    }
  };

  // ...

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ajouter un justificatif</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Progress value={(step / 3) * 100} size="sm" colorScheme="pink" mb={4} />
          <VStack spacing={4}>
            <Center w="full">
              <Text fontSize="lg" fontWeight="bold">
                Etape {step}
              </Text>
              <Text mx={2}>➜</Text>
              <Text fontSize="lg">{step < 3 ? 'Vérifier les données' : 'Valider'}</Text>
            </Center>
            <Divider />
            {renderStepContent()}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleNextStep}>
            {step === 3 ? 'Valider' : 'Suivant'}
          </Button>
          <Button colorScheme="blue" mr={3} onClick={closeModal}>
            Fermer
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Annuler
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FileUploadModal;
